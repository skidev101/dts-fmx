import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";


const NoteUploadSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  fileUrl: z.url(),
  fileKey: z.string().min(3),
  fileName: z.string().min(1),
  fileType: z.string().min(1),
  courseId: z.string().min(3),
});

export async function POST(req: Request) {
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
      select: { id: true, role: true },
    });
    if (!foundUser || foundUser.role !== "ADMIN") {
      return NextResponse.json({ error: "forbidden" }, { status: 403 });
    }
    
    const body = await req.json();
    const data = NoteUploadSchema.parse(body);

    const note = await prisma.note.create({
      data: {
        title: data.title,
        description: data.description,
        fileUrl: data.fileUrl,
        fileKey: data.fileKey,
        fileName: data.fileName,
        fileType: data.fileType,
        uploadedById: foundUser.id,
        courseId: data.courseId,
      },
    });

    return NextResponse.json(
      { message: "new note created", note },
      { status: 201 }
    );
  } catch (err) {
    console.error("error creating note:", err);
    return NextResponse.json(
      { error: "Internal server error", details: err },
      { status: 500 }
    );
  }
}