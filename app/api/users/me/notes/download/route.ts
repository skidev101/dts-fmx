import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    // const user = await requireUser();
    // const clerkId = user.clerkId;

    // console.log("new user:", user)

    const clerkId = "user_36U6eejMHENdCbVJwo3s5s4teFt"; // temporary mocking. new id
    const foundUser = await prisma.user.findUnique({
      where: { clerkId },
    });
    if (!foundUser) {
      return NextResponse.json({ error: "user not found" }, { status: 404 });
    }

    const url = new URL(req.url);
    const cursor = (url.searchParams.get("cursor") ?? undefined) ?? undefined;
    const limit = Math.min(Number(url.searchParams.get("limit") ?? 10), 50);

    const where = { userId: foundUser.id };
    const logs = await prisma.noteDownloadLog.findMany({
      where,
      take: limit + 1,
      orderBy: { createdAt: "desc" },
      ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
      include: {
        note: {
          select: {
            id: true,
            title: true,
            description: true,
            fileUrl: true,
            fileName: true,
            fileType: true,
            fileSize: true,
            resourceType: true,
            uploadedBy: { select: { username: true } },
            course: { select: { code: true, title: true } },
            createdAt: true,
          },
        },
      },
    });

    console.log("logs queried:", logs);

    const hasMore = logs.length > limit;
    const items = hasMore ? logs.slice(0, -1) : logs;
    const nextCursor = hasMore ? items[items.length - 1].id : null;

    const payload = items.map((l) => ({
      id: l.id,
      createdAt: l.createdAt,
      note: l.note,
    }));
    console.log("payload created:", payload);

    return NextResponse.json({ items: payload, nextCursor }, { status: 200 });
  } catch (err) {
    console.error("error getting downloaded notes:", err);
    return NextResponse.json(
      { error: "Internal server error", details: err },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    // const session = await auth();
    // if (!session?.userId) {
    //   return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    // }

    // const userId = session.userId;
    const userId = "user_36U6eejMHENdCbVJwo3s5s4teFt"; // temporary mocking

    const foundUser = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
      select: { id: true },
    });
    if (!foundUser) {
      return NextResponse.json(
        { error: "user does not exist" },
        { status: 404 }
      );
    }

    const { noteId } = await req.json();
    const noteExists = await prisma.note.findUnique({
      where: { id: noteId },
      select: { id: true },
    });
    if (!noteExists) {
      return NextResponse.json(
        { error: "note does not exist" },
        { status: 404 }
      );
    }

    const result = await prisma.$transaction(async (tx) => {
      const log = await prisma.noteDownloadLog.create({
        data: { noteId, userId: foundUser.id },
      });

      await tx.note.update({
        where: { id: noteId },
        data: { downloads: { increment: 1 } },
      });

      return log;
    });

    return NextResponse.json({ ok: true, logId: result.id }, { status: 201 });
  } catch (err: any) {
    console.error("error logging download:", err);
    if (err?.code === "P2002") {
      return NextResponse.json(
        { ok: true, message: "already recorded" },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error", details: err },
      { status: 500 }
    );
  }
}
