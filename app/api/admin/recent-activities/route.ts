import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const user = requireAdmin();

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  try {
    const activities = await prisma.activity.findMany({
        where: {
            createdAt:{
                gte: sevenDaysAgo
            }
        },
        orderBy: { createdAt: "desc" },
        take: 5,
        include: {
            user: {
                select: {
                    id: true,
                    username: true,
                    email: true
                }
            }
        }
    });

    const groupedActivities = activities.reduce((acc: any, activity) => {
        const dateKey = activity.createdAt.toLocaleDateString("en-CA")

        acc[dateKey] ||= [];
        acc[dateKey].push(activity);

        return acc;
    }, {} as Record<string, typeof activities>);


    return NextResponse.json({ groupedActivities }, { status: 200 });
  } catch (error) {
    console.error("error in recent-activities:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
