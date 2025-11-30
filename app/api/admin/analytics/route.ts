import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [totalCourses, totalNotes, totalUsers, topCoursesByNotes] =
      await Promise.all([
        prisma.course.count(),
        prisma.note.count(),
        prisma.user.count(),

        prisma.course.findMany({
          take: 10,
          orderBy: {
            notes: { _count: "desc" },
          },
          select: {
            id: true,
            code: true,
            _count: { select: { notes: true } },
          },
        }),
      ]);

      const formattedTopCourses = topCoursesByNotes.map((c: any) => ({
        courseId: c.id,
        code: c.code,
        noteCount: c._count?.notes ?? 0
      }))



    // uploadThing usage
    // const utRes = await fetch("https://api.uploadthing.com/v1/projects/usage", {
    //   headers: {
    //     "x-uploadthing-api-key": process.env.UPLOADTHING_SECRET!,
    //     "Content-Type": "application/json",
    //   },
    //   cache: "no-store",
    // });

    // if (!utRes.ok) {
    //   console.warn("UploadThing usage fetch failed");
    // }

    // const utData = utRes.ok ? await utRes.json() : null;

    // const storageUsed = utData?.storageUsage ?? 0;
    // const bandwidthUsed = utData?.bandwidthUsage ?? 0;

    // const STORAGE_LIMIT = 2 * 1024 * 1024 * 1024; // 2GB storage
    // const BANDWIDTH_LIMIT = 2 * 1024 * 1024 * 1024; // 2GB bandwidth

    // usage: {
    //   storage: {
    //     used: storageUsed,
    //     limit: STORAGE_LIMIT,
    //     left: Math.max(0, STORAGE_LIMIT - storageUsed),
    //     percent: (storageUsed / STORAGE_LIMIT) * 100,
    //   },
    //   bandwidth: {
    //     used: bandwidthUsed,
    //     limit: BANDWIDTH_LIMIT,
    //     left: Math.max(0, BANDWIDTH_LIMIT - bandwidthUsed),
    //     percent: (bandwidthUsed / BANDWIDTH_LIMIT) * 100,
    //   },
    const analytics = {
      totals: {
        totalCourses,
        totalNotes,
        totalUsers,
      },
      topCoursesByNotes: formattedTopCourses,
    };
  

    return NextResponse.json(analytics, { status: 200 });
  } catch (err) {
    console.error("error getting analytics", err);
    return NextResponse.json("Internal server error", { status: 500 });
  }
}
