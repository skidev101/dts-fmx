"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ChartBarStacked,
  Info,
  Loader2,
  MoreVertical,
  Trash,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { useDeleteCourse } from "@/hooks/course/useDeleteCourse";
import { useCourse } from "@/hooks/course/useCourse";
import { useParams, useRouter } from "next/navigation";
import { DeleteDialog } from "@/components/DeleteDialog";
import { Note } from "@/types/note";
import { NoteDialog } from "@/components/notes/NoteDialog";
import { Card, CardContent } from "@/components/ui/card";
import formatDate from "@/utils/formatDate";
import { Badge } from "@/components/ui/badge";
import { formatLevel } from "@/utils/formatLevel";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { LoadingOrError } from "@/components/LoadingOrError";

const CoursePage = () => {
  const params = useParams();
  const router = useRouter();
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  console.log("params object:", params);
  const [deleteId, setDeleteId] = useState<string>("");
  const slug = params.slug as string;
  console.log("slug params:", slug);
  const { data: course, isLoading, isError } = useCourse(slug);
  console.log("course details fetched:", course);
  const { mutate: deleteCourse, isPending } = useDeleteCourse();

  const isAdmin = true;
  const isReady = !isLoading && !isError && course;

  if (!isReady) {
    return (
      <LoadingOrError isLoading={isLoading} isError={isError || !course} />
    );
  }

  const handleDelete = async () => {
    if (!course.id) return;
    deleteCourse(course.id, {
      onSuccess: (result) => {
        toast.success("Course deleted successfully", {
          description: result.digest,
        });
        router.push("/resources/courses");
      },
      onError: (error) => {
        toast.error("An error occured", {
          description: error.message || "Please try again",
        });
      },
    });
  };

  const formattedLevel = formatLevel(course.level);

  return (
    <div className="relative max-w-5xl mx-auto px-2 sm:px-4 py-6 sm:py-10">
      <Badge
        variant="secondary"
        className={`absolute -top-3 right-4 border ${formattedLevel.colors}`}
      >
        {formattedLevel.level}
      </Badge>

      <div className="flex justify-between items-start">
        <div className="w-full">
          <h1 className="text-3xl sm:text-4xl font-bold">{course.title}</h1>

          <p className="text-foreground/80 font-semibold uppercase mt-1 text-lg">
            {course.code}
          </p>

          {course.description?.trim() && (
            <>
              <h2 className="text-2xl text-foreground/95 mt-10">Description</h2>
              <p className="mt-3 text-foreground/60">{course.description}</p>
            </>
          )}
        </div>

        {/* ADMIN DELETE */}
        {isAdmin && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="size-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem
                className="text-destructive hover:cursor-pointer"
                onSelect={(e) => {
                  e.preventDefault();
                  setDeleteId(course.id);
                }}
              >
                <Trash2 className="mr-1 size-4 text-destructive" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      <h2 className="text-2xl text-foreground/95 mt-10">Notes</h2>
      {/* <h1 className="text-2xl sm:text-3xl font-semibold">Notes</h1> */}

      <NoteDialog
        open={dialogOpen}
        note={selectedNote}
        onOpenChange={setDialogOpen}
      />

      {!course?.notes?.length ? (
        <div className="text-center mt-8">
          <p className="text-card-foreground/80">
            No notes for this course yet...
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 mt-6">
          {course.notes.map((note: Note) => (
            <Card
              key={note.id}
              className="rounded-3xl transition-all duration-200 hover:bg-card/50 hover:scale-[1.01] active:scale-[0.99]"
            >
              <button
                type="button"
                onClick={() => {
                  setDialogOpen(true);
                  setSelectedNote(note);
                }}
                className="w-full text-left p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-3xl"
              >
                <CardContent className="flex px-0">
                  <div className="shrink-0 flex items-center justify-center w-16 h-16 rounded-2xl bg-gray-100 dark:bg-neutral-800 border">
                    <ChartBarStacked className="size-8 text-neutral-400" />
                  </div>

                  <div className="flex flex-col justify-center ml-3">
                    <h3 className="font-medium text-lg">{note.title}</h3>

                    <p className="text-card-foreground/80 text-xs">
                      {formatDate(note.createdAt)}
                    </p>
                  </div>
                </CardContent>
              </button>
            </Card>
          ))}
        </div>
      )}

      <div className="mt-10">
        <div className="flex gap-2 items-center">
          <Info className="size-6 text-foreground/80" />
          <h2 className="text-xl text-foreground/90">Info</h2>
        </div>

        <p className="text-foreground/70 mt-4">
          Course created {formatDate(course.createdAt)} by{" "}
          {course.createdBy.username}
        </p>
      </div>

      <DeleteDialog
        id={deleteId || ""}
        action={handleDelete}
        setDeleteId={setDeleteId}
        isLoading={isPending}
        alertText="This action cannot be undone. This will permanently delete this course and all related notes."
      />
    </div>
  );
};

export default CoursePage;
