import React from "react";
import { Card } from "./ui/card";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { ChartBarStacked, FileStack, SquareStack } from "lucide-react";
import { formatLevel } from "@/utils/formatLevel";

interface ResourceCardProps {
  slug: string;
  code?: string;
  title: string;
  level: string;
}

const ResourceCard = ({ code, title, level, slug }: ResourceCardProps) => {
  const formattedLevel = formatLevel(level);

  return (
    <Link href={`/resources/courses/${slug}`}>

    <Card className="relative w-fu min-w-[280px] flex-row gap-4 p-4 rounded-3xl hover:cursor-pointer hover:bg-card/50 hover:scale-101 active:scale-98 transition-all duration-300">
      <div className="shrink-0 flex items-center justify-center w-16 h-16 rounded-2xl bg:gray-200 dark:bg-neutral-800 border">
        {/* <Image width={28} height={28} src="/file.svg" alt="file" /> */}
        <ChartBarStacked className="size-8 text-neutral-400" />
      </div>

      <div className="flex-1 flex flex-col justify-center gap-1">
        <h3 className="text-lg uppercase font-semibold text-card-foreground">
          {code}
        </h3>
          <p className="text-sm text-card-foreground/60">{title}</p>
      </div>

      <Badge
        variant="secondary"
        className={`absolute top-3 right-3 border ${formattedLevel.colors}`}
      >
        {formattedLevel.level}
      </Badge>
    </Card>
    </Link>
  );
};

export default ResourceCard;
