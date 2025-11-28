"use client";

import React from "react";
import ResourceCard from "@/components/ResourceCard";
import { useCourses } from "@/hooks/course/useCourses";
import { useNotes } from "@/hooks/notes/useNotes";
import { Course } from "@/lib/types/course";
import { Note } from "@/lib/types/note";

const page = () => {
  const { data: notes, isError, isLoading } = useNotes();
  if (isLoading) return <div>Loading...</div>;
  if (!notes) return <div>No notes...</div>;
  console.log("notes fetched:", notes);

  return (
   <div className="flex flex-col m-auto max-w-5xl mt-10">
      <h1 className="text-3xl font-semibold">All notes</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        {notes.map((note: Note) => (
          <ResourceCard
            key={note.id}
            title={note.title}
            level={note.level}
          />
        ))}
      </div>
    </div>
  );
};

export default page;
