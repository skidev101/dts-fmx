import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    // const user = await requireAdmin();
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
    const cursor = url.searchParams.get("cursor") ?? undefined;
    const limit = Math.min(Number(url.searchParams.get("limit") ?? 10), 50);

    const users = await prisma.user.findMany({
      take: limit + 1,
      orderBy: { createdAt: "desc" },
      ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
      select: {
        id: true,
        fullname: true,
        email: true,
        username: true,
        role: true,
        avatarUrl: true,
        createdAt: true
      },
    });

    console.log("users queried:", users);

    const hasMore = users.length > limit;
    const items = hasMore ? users.slice(0, -1) : users;
    const nextCursor = hasMore ? items[items.length - 1].id : null;


    return NextResponse.json({ items, nextCursor }, { status: 200 });
  } catch (err) {
    console.error("error getting users:", err);
    return NextResponse.json(
      { error: "Internal server error", details: err },
      { status: 500 }
    );
  }
}