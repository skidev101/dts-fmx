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
    const page = Math.max(Number(url.searchParams.get("page") ?? 1), 1);
    const limit = Math.min(Number(url.searchParams.get("limit") ?? 10), 50);
    const roleParam = url.searchParams.get("role")?.toUpperCase();
    const validRoles = ["ADMIN", "STUDENT"];
    const roleFilter = roleParam && validRoles.includes(roleParam) ? roleParam : undefined;

    const skip = (page - 1) * limit;
    const where: any = {};
    if (roleFilter) where.role = roleFilter;
    const users = await prisma.user.findMany({
      take: limit + 1,
      skip: skip,
      where,
      orderBy: { createdAt: "desc" },
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

    const totalUsers = await prisma.user.count({ where });
    console.log("total users:", totalUsers);

    console.log("users queried:", users);

    const totalPages = Math.ceil(totalUsers / limit);


    return NextResponse.json({ users, page, totalPages, totalUsers }, { status: 200 });
  } catch (err) {
    console.error("error getting users:", err);
    return NextResponse.json(
      { error: "Internal server error", details: err },
      { status: 500 }
    );
  }
}