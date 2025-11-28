import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

interface NoteCardProps {
  id: string;
  title: string;
  description?: string;
  course: string;
}

const NoteCard = ({ id, title, description, course }: NoteCardProps) => {
  return (
    <Link href={`/resources/courses/${id}`}>
      <Card className="relative flex-row gap-4 p-4 max-w-sm rounded-3xl hover:cursor-pointer hover:bg-card/50 transition-all duration-200">
        <CardContent>
          <div className="flex justify-center items-center w-14 h-14 sm:w-16 sm:h-16 shrink-0 bg-accent rounded-md sm:rounded-2xl">
            PDF
          </div>

          <div className="flex-1 flex flex-col justify-center gap-1">
            <h3 className="text-lg uppercase font-semibold text-card-foreground">
              {title}
            </h3>
            {description && (
              <p className="text-sm text-card-foreground/60">{title}</p>
            )}
          </div>

          <Badge
            variant="secondary"
            className={`absolute top-3 right-3 border bg-blue-500`}
          >
            {course}
          </Badge>
        </CardContent>
      </Card>
    </Link>
  );
};

export default NoteCard;
