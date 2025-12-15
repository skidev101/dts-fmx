import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const userId = (await params).id;
  if (!userId) {
    return NextResponse.json({ error: "userId  is required" }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return NextResponse.json({ error: "user not found" }, { status: 404 });
    }

    await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    return NextResponse.json({}, { status: 200 });
  } catch (err) {
    console.error("error deleting user:", err);
    return NextResponse.json(
      { error: "Internal server error", details: err },
      { status: 500 }
    );
  }
}
