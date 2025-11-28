import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const courseId = params.id;

  if (!courseId) {
    return NextResponse.json(
      { error: "courseId is required" },
      { status: 400 }
    );
  }
  try {
    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    return NextResponse.json({ course }, { status: 200 });
  } catch (error) {
    console.error("error fetching course:", error);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const noteId = params.id;

  if (!noteId) {
    return NextResponse.json(
      { error: "courseId is required" },
      { status: 400 }
    );
  }

  try {
    const session = await auth();
    if (!session?.userId) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    const userId = session.userId;
    const foundUser = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });
    if (!foundUser || foundUser.role !== "ADMIN") {
      return NextResponse.json({ error: "forbidden" }, { status: 403 });
    }

    await prisma.note.delete({
      where: {
        id: noteId,
      },
    });

    return NextResponse.json({}, { status: 200 });
  } catch (err) {
    console.error("error deleting note:", err);
  }
}
