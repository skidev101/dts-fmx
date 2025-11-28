import React from "react";
import { Card } from "./ui/card";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { ChartBarStacked, FileStack, SquareStack } from "lucide-react";

interface ResourceCardProps {
  id: string;
  code?: string;
  title: string;
  level: string;
}

const ResourceCard = ({ id, code, title, level }: ResourceCardProps) => {
  const formatLevel = () => {
    switch (level) {
      case "L100":
        return { level: "100 lvl", colors: "border-blue-500 text-blue-400 bg-blue-100 dark:bg-blue-950" };

      case "L200":
        return { level: "200 lvl", colors: "border-green-500 text-green-400 bg-green-100 dark:bg-green-950" };

      case "L300":
        return { level: "300 lvl", colors: "border-red-500 text-red-400 bg-red-100 dark:bg-red-950" };

      case "L400":
        return { level: "400 lvl", colors: "border-purple-500 text-purple-400 bg-purple-100 dark:bg-purple-950" }
      case "L500":
        return { level: "500 lvl", colors: "border-orange-500 text-orange-400 bg-orange-100 dark:bg-orange-950" };

      default:
        return { level: "100 lvl", colors: "border-blue-500 text-blue-400 bg-gray-100 dark:bg-blue-950" };
    }
  };

  const formatedLevel = formatLevel();

  return (
    <Link href={`/resources/courses/${id}`}>

    <Card className="relative flex-row gap-4 p-4 max-w-sm rounded-3xl hover:cursor-pointer hover:bg-card/50 transition-all duration-200">
      <div className="shrink-0 flex items-center justify-center w-16 h-16 rounded-2xl bg-gray-100 border">
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
        className={`absolute top-3 right-3 border ${formatedLevel.colors}`}
      >
        {formatedLevel.level}
      </Badge>
    </Card>
    </Link>
  );
};

export default ResourceCard;
