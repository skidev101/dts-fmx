import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "./prisma";
import usernameFromEmail from "@/utils/formatName";

import { NextResponse } from "next/server";

export async function getCurrentUser() {
  const clerkUser = await currentUser();
  if (!clerkUser) return null;

  let user = await prisma.user.findUnique({
    where: {
      clerkId: clerkUser.id,
    },
    select: {
      id: true,
      clerkId: true,
      fullname: true,
      username: true,
      email: true,
      avatarUrl: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    const username = usernameFromEmail(clerkUser.emailAddresses[0].emailAddress);
    user = await prisma.user.create({
      data: {
        clerkId: clerkUser.id,
        username,
        email: clerkUser.emailAddresses[0].emailAddress,
        avatarUrl: clerkUser.imageUrl,
        role: "STUDENT",
      },
    });
    console.log("new user created:", user);
  }

  return user;
}

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) {
    throw NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  return user;
}

export async function requireAdmin() {
  const user = await getCurrentUser();
  if (user?.role !== "ADMIN") {
    throw NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  return user;
}
