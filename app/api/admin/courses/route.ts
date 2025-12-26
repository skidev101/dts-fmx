import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import slugify from "slugify";
import { requireAdmin } from "@/lib/auth";

const courseSchema = z.object({
  title: z.string().min(3).max(30),
  description: z.string().max(40).optional(),
  code: z.string().min(3).max(7),
  level: z.enum(["L100", "L200", "L300", "L400", "L500"]),
});

export async function POST(req: Request) {
  try {
    const user = await requireAdmin();

    const body = await req.json();

    console.log("received data from client:", body);
    const data = courseSchema.parse(body);
    console.log("parsed data from client:", data);

    const courseExists = await prisma.course.findUnique({
      where: {
        code: data.code,
      },
    });
    console.log("course exists:", courseExists);
    if (courseExists) {
      return NextResponse.json(
        { error: "course already exists" },
        { status: 409 }
      );
    }

    const slug = slugify(data.code, { lower: true, strict: true });

    const course = await prisma.course.create({
      data: {
        title: data.title,
        slug,
        description: data.description,
        code: data.code,
        level: data.level,
        createdById: user.id,
      },
    });

    const activityLog = await prisma.activity.create({
      data: {
        type: "COURSE_CREATED",
        entity: "course",
        entityId: course.id,
        userId: user.id,
      }
    });

    console.log("create course activity logged", activityLog);

    return NextResponse.json(
      { message: "new course created", course },
      { status: 201 }
    );
  } catch (error) {
    console.error("error creating course:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error },
      { status: 500 }
    );
  }
}
