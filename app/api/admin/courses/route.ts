import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";


const courseSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(6),
  code: z.string().min(3),
  level: z.enum(["L100", "L200", "L300", "L400", "L500"]),
});

export async function POST(req: Request) {
  try {
    // const session = await auth();
    // if (!session.userId) {
    //   return NextResponse.json({ error: "unauthorized" }, { status: 403 });
    // }
    // const userId = session.userId;
    const userId = "user_35Zu0UUQbWUTnaJNKGjhY2K9hKn";

    const foundUser = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });
    if (!foundUser || foundUser.role !== "ADMIN") {
      return NextResponse.json({ error: "forbidden" }, { status: 403 });
    }

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

    const course = await prisma.course.create({
      data: {
        title: data.title,
        description: data.description,
        code: data.code,
        level: data.level,
      },
    });

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