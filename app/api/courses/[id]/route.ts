import cloudinary from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const courseId = (await params).id;
  // console.log("course id:", courseId)

  if (!courseId) {
    return NextResponse.json(
      { error: "courseId is required" },
      { status: 400 }
    );
  }

  try {
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        notes: { include: { uploadedBy: true } },
      },
    });

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    // console.log("course gotten:", course)

    return NextResponse.json(course, { status: 200 });
  } catch (error) {
    console.error("error fetching course:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const courseId = (await params).id;
  if (!courseId) {
    return NextResponse.json(
      {
        message: "courseId is required",
      },
      { status: 400 }
    );
  }

  try {
    // const session = await auth();
    // if (!session.userId) {
    //   return NextResponse.json({ error: "unauthorized" }, { status: 403 });
    // }
    // const userId = session.userId;

    const userId = "user_36U6eejMHENdCbVJwo3s5s4teFt";

    const foundUser = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });
    if (!foundUser || foundUser.role !== "ADMIN") {
      return NextResponse.json({ error: "forbidden" }, { status: 403 });
    }

    const notes = await prisma.note.findMany({
      where: {
        courseId,
      },
      select: {
        id: true,
        fileKey: true,
      },
    });

    const fileKeys = notes.map((n) => n.fileKey).filter(Boolean) as string[];

    // TODO: error handling for cloudinary deletion. refer to snippet(local)
    if (fileKeys.length > 0) {
      await Promise.all(
        fileKeys.map((key) =>
          cloudinary.uploader.destroy(key, { resource_type: "auto" })
        )
      );
    }

    await prisma.$transaction([
      prisma.note.deleteMany({ where: { courseId } }),
      prisma.course.delete({ where: { id: courseId } }),
    ]);

    return NextResponse.json(
      { success: true, message: "Course deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("error deleting course:", error);
    return NextResponse.json(
      { error: "Internal server error " },
      { status: 500 }
    );
  }
}
