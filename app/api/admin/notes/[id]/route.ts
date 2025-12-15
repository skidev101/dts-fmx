import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";

export async function DELETE(
  req: Request,
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
    // const session = await auth();
    // if (!session?.userId) {
    //   return NextResponse.json({ error: "unauthorized" }, { status: 401 });
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

    const note = await prisma.note.findUnique({
      where: {
        id: noteId,
      },
    });
    if (!note) {
      return NextResponse.json({ error: "note not found" }, { status: 404 });
    }

    if (note.fileKey) {
      await cloudinary.uploader.destroy(note.fileKey, {
        resource_type: "auto",
      });
    }

    await prisma.note.delete({
      where: {
        id: noteId, 
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("error deleting note:", err);
    return NextResponse.json(
      { error: "Failed to delete note" },
      { status: 500 }
    );
  }
}
