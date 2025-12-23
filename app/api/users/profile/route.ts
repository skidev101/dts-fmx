import { NextResponse } from "next/server";
import z from "zod";
import { prisma } from "@/lib/prisma";

const ProfileUpdateSchema = z
  .object({
    fullname: z.string().min(3, "too short").max(20, "too long").optional(),
    username: z.string().min(3, "too short").max(10, "too long").optional(),
    avatarUrl: z.url().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });

export async function PATCH(req: Request) {
  try {
    const userId = "cmiuoy9ox0000th5201ab0dgd"; // new id

    const body = await req.json();
    const parsed = ProfileUpdateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten() },
        { status: 400 }
      );
    }

    let data: any = {};

    if (parsed.data.fullname !== undefined) {
      data.fullname = parsed.data.fullname;
    }

    if (parsed.data.username !== undefined) {
      data.username = parsed.data.username;
    }

    if (parsed.data.avatarUrl && parsed.data.avatarUrl !== undefined) {
      data.avatarUrl = parsed.data.avatarUrl;
    }

    const updated = await prisma.user.update({
      where: { id: userId },
      data,
      select: {
        id: true,
        fullname: true,
        email: true,
        username: true,
        role: true,
        avatarUrl: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (err: any) {
    console.error("error updating account settings", err);
    if (err.code === "P2002") {
      return NextResponse.json(
        { error: "Username already taken" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
