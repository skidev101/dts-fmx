import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";


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
        resourceType: true
      },
    });

    await Promise.all(
      notes.map(async (note) => {
        if (!note.resourceType) return;
        try {
          await cloudinary.uploader.destroy(note.fileKey, {
            resource_type: note.resourceType
          }) 
        } catch(err) {
          console.error(`failed to delete note ${note.id}`);
        }
      })
    )

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