import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { User } from "@/types/user";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q") ?? "";

    if (!q) return NextResponse.json({ courses: [], notes: [] });

    const term = q.toLowerCase();
    const [courses, notes] = await Promise.all([
      prisma.course.findMany({
        where: {
          OR: [
            { title: { contains: term, mode: "insensitive" } },
            { code: { contains: term, mode: "insensitive" } },
          ],
        },
        take: 5,
      }),
      prisma.note.findMany({
        where: {
          OR: [
            { title: { contains: term, mode: "insensitive" } },
            { description: { contains: term, mode: "insensitive" } },
          ],
        },
      }),
    ]);

    const coursesWithType = courses.map((c) => ({ ...c, type: "course" }));
    const notesWithType = notes.map((n) => ({ ...n, type: "note" }));

    const role: string = "ADMIN";
    let users: any;
    if (role === "ADMIN") {
      users = await prisma.user.findMany({
        where: {
          OR: [{ username: { contains: term, mode: "insensitive" } }],
        },
      });
      
    }
    console.log("sending results:", coursesWithType, notesWithType);

    return NextResponse.json(
      {
        courses: coursesWithType,
        notes: notesWithType,
        users: users ?? null,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("error searching for term in api route:", err);
    return NextResponse.json(
      { error: "Internal server error", details: err },
      { status: 500 }
    );
  }
}
