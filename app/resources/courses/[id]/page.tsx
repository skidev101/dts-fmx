"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChartBarStacked, Loader2, Trash } from "lucide-react";
import { toast } from "sonner";
import { useDeleteCourse } from "@/hooks/course/useDeleteCourse";
import { useCourse } from "@/hooks/course/useCourse";
import { useParams, useRouter } from "next/navigation";
import { AlertDialogue } from "@/components/AlertDialogue";
import { Note } from "@/lib/types/note";
import { NoteDialog } from "@/components/notes/NoteDialog";
import ResourceCard from "@/components/ResourceCard";
import { Card, CardContent } from "@/components/ui/card";
import formatDate from "@/utils/formatDate";

const CoursePage = () => {
  const params = useParams();
  const router = useRouter();
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const id = params.id as string;
  const { data: course, isLoading, isError } = useCourse(id);
  const { mutate: deleteCourse, isPending } = useDeleteCourse(id);

  const isAdmin = true;

  const handleDelete = async () => {
    deleteCourse(undefined, {
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="size-18 animate-spin" />
      </div>
    );
  }

  if (isError || !course) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>An error occured</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-2 sm:px-4 py-6 sm:py-10">
      <div className="flex justify-between items-start">
        <div className="w-full">
          <h1 className="text-4xl capitalize font-bold">{course.title}</h1>
          <p className="text-foreground/80 font-semibold uppercase mt-1 text-lg">
            {course.code}
          </p>
          <h2 className="text-2xl text-foreground/95  mt-10">Description</h2>

          {course.description && (
            <p className="mt-3 text-foreground/60">
              {course.description} Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Tempora consequatur quam facere eveniet laborum
              non dolorem deserunt eius enim, doloribus distinctio nesciunt nemo
              quo atque veritatis perspiciatis ducimus. Consequuntur, vitae!
            </p>
          )}
        </div>

        {/* ADMIN DELETE */}
        {/* {isAdmin && <AlertDialogue action={handleDelete} />} */}
      </div>

      <h2 className="text-2xl text-foreground/95 mt-10">Notes</h2>

      <NoteDialog
        open={dialogOpen}
        note={selectedNote}
        onOpenChange={setDialogOpen}
      />

      {course?.notes?.length === 0 ? (
        <div className="text-center">
          <p>No notes for this course yet...</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 mt-6">
          {course?.notes?.map((note: Note) => (
            <Card
              key={note.id}
              onClick={() => {
                setDialogOpen(true);
                setSelectedNote(note);
              }}
              className="relative p-4 rounded-3xl hover:cursor-pointer hover:bg-card/50 hover:scale-101 active:scale-99 transition-all duration-200"
            >
              <CardContent className="flex px-0">
                <div className="shrink-0 flex items-center justify-center w-16 h-16 rounded-2xl bg-gray-100 dark:bg-neutral-800 border">
                  {/* <Image width={28} height={28} src="/file.svg" alt="file" /> */}
                  <ChartBarStacked className="size-8 text-neutral-400" />
                </div>
                <div className="flex justify-center flex-col ml-3">
                  <h3 className="font-medium capitalize text-lg">
                    {note.title}
                  </h3>

                  <p className="text-card-foreground/80 text-xs">
                    {formatDate(note.createdAt)}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CoursePage;
