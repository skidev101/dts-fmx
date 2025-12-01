import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

// const NoteUploadSchema = z.object({
//   title: z.string().min(3),
//   description: z.string().optional(),
//   fileUrl: z.url(),
//   fileKey: z.string().min(3),
//   courseId: z.string().min(3),
// });

// export async function POST(req: NextRequest) {
//   try {
//     // const session = await auth();
//     // if (!session?.userId) {
//     //   return NextResponse.json({ error: "unauthorized" }, { status: 401 });
//     // }

//     // const userId = session.userId;
//     const userId = "user_35Zu0UUQbWUTnaJNKGjhY2K9hKn";

//     const foundUser = await prisma.user.findUnique({
//       where: {
//         clerkId: userId,
//       },
//     });
//     if (!foundUser || foundUser.role !== "ADMIN") {
//       return NextResponse.json({ error: "forbidden" }, { status: 403 });
//     }

//     const body = await req.json();
//     const data = NoteUploadSchema.parse(body);

//     const note = await prisma.note.create({
//       data: {
//         title: data.title,
//         description: data.description,
//         fileUrl: data.fileUrl,
//         fileKey: data.fileKey,
//         uploadedById: foundUser.id,
//         courseId: data.courseId,
//       },
//     });

//     return NextResponse.json(
//       { message: "new note created", note },
//       { status: 201 }
//     );
//   } catch (err) {
//     console.error("error creating note:", err);
//     return NextResponse.json(
//       { error: "Internal server error", details: err },
//       { status: 500 }
//     );
//   }
// }

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const cursor = (url.searchParams.get("cursor") ?? undefined) ?? undefined;
    const limit = Math.min(Number(url.searchParams.get("limit") ?? 10), 50);

    const notes = await prisma.note.findMany({
      orderBy: { createdAt: "desc" },
      take: limit + 1,
      ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
    });

    console.log("notes queried:", notes);
    const hasMore = notes.length > limit;
    const items = hasMore ? notes.slice(0, -1) : notes;
    const nextCursor = hasMore ? items[items.length - 1].id : null;

    console.log("sending notes", items)
    
    return NextResponse.json({notes: items, nextCursor}, { status: 200 });
  } catch (err) {
    console.error("error getting notes", err);
    return NextResponse.json(
      { error: "Internal server error", details: err },
      { status: 500 }
    );
  }
}
