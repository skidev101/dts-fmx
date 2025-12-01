"use client";

import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandItem,
  CommandGroup,
} from "@/components/ui/command";
import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import { useCreateNote } from "@/hooks/notes/useCreateNote";
import { useCourses } from "@/hooks/course/useCourses";
import { Course } from "@/types/course";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

const noteSchema = z.object({
  title: z.string().min(3, "Title is too short").max(50, "Title is too long"),
  description: z
    .string()
    .min(3, "Description is too short")
    .max(300, "Description is too long")
    .optional(),
});
type NoteFormSchema = z.infer<typeof noteSchema>;

const UploadNoteForm = () => {
  const router = useRouter();
  const [fileUrl, setFileUrl] = useState<string>("");
  const [fileKey, setFileKey] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [fileType, setFileType] = useState<string>("");
  const [fileError, setFileError] = useState("");
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [courseFieldError, setCourseFieldError] = useState("");
  const {
    data: courses,
    isLoading: coursesLoading,
    isError: coursesError,
    error: coursesErrorDetails,
  } = useCourses();
  const { mutate: createNote, isPending } = useCreateNote();
  console.log("courses fetched:", courses);
  const courseList = courses ?? [];
  const uploadToastId = "upload-toast";

  const form = useForm<NoteFormSchema>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const handleSubmit = (data: NoteFormSchema) => {
    if (!fileUrl) {
      setFileError("Please upload a file first");
      return;
    }
    if (!selectedCourse || selectedCourse == "") {
      setCourseFieldError("Please select a course");
      return;
    }

    const toastId = "note-toast";

    createNote(
      {
        title: data.title,
        description: data.description || "",
        courseId: selectedCourseId,
        fileUrl,
        fileKey,
        fileName,
        fileType,
      },
      {
        //  onMutate: () => {
        //   toast.loading("Creating note", { id: toastId });
        // },
        onSuccess: (result) => {
          console.log("note created successfully:", result);
          toast.success("Note created successfully", {
            id: toastId,
            description: result.digest,
          });
          router.push("/resources/notes");
        },
        onError: (error) => {
          console.error("failed to create note:", error);
          toast.error("Failed to create note", {
            description: error.message || "Please try again",
          });
        },
      }
    );
  };

  // if (coursesLoading) {
  //   return (
  //     <div className="flex justify-center items-center min-h-screen">
  //       <Loader2 className="size-10 animate-spin" />
  //     </div>
  //   );
  // }

  if (coursesError) {
    return toast.error("An error occured", {
      description:
        coursesErrorDetails.message || "Please refresh the page and try again",
    });
  }

  return (
    <Dialog open onOpenChange={() => router.back()}>
      <DialogContent className="sm:max-w-[425px] ">
        <DialogHeader>
          <DialogTitle>New note</DialogTitle>
          <DialogDescription>
            Fill in the form below to create a new note under a course. Click
            submit when done.
          </DialogDescription>
        </DialogHeader>{" "}
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FieldGroup>
            {/* <div className="flex items-center gap-2"> */}
            {/* Title */}
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Title *</FieldLabel>
                  <Input {...field} placeholder="Intro to Data science" />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
              <div className="flex flex-col gap-3">
                <FieldLabel>Course *</FieldLabel>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={popoverOpen}
                    className={`w-full justify-between ${
                      courseFieldError && "border-red-500"
                    }`}
                  >
                    {selectedCourse
                      ? selectedCourse
                      : // ? courseList.find(
                        //     (course: Course) => course.code === selectedCourse
                        //   )
                        "Select course"}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                {courseFieldError && (
                  <p className="text-red-500">{courseFieldError}</p>
                )}
              </div>

              <PopoverContent className="w-[300px] p-0">
                <Command>
                  <CommandInput placeholder="Search courses" className="h-9" />
                  <CommandList>
                    <CommandEmpty>No course found.</CommandEmpty>
                    <CommandGroup>
                      {courseList?.map((course: Course) => (
                        <CommandItem
                          key={course.id}
                          value={course.code}
                          onSelect={(value: string) => {
                            setSelectedCourse(
                              value === selectedCourse ? "" : value
                            );
                            setSelectedCourseId(course.id);
                            setPopoverOpen(false);
                          }}
                        >
                          {course.code}

                          <Check
                            className={cn(
                              "ml-auto",
                              selectedCourse === course.code
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {/* </div> */}
          </FieldGroup>

          {/* Description */}
          <Controller
            name="description"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Description</FieldLabel>
                <Textarea
                  {...field}
                  rows={6}
                  placeholder="Note description"
                  className="resize-none"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* File Upload */}
          <Field>
            <FieldLabel>Upload File *</FieldLabel>
            <div
              className={`flex justify-center items-center py-4 border border-dashed ${
                fileError ? "border-red-500" : "border-gray-500"
              } rounded-xl`}
            >
              <UploadButton<OurFileRouter, "noteUploader">
                endpoint="noteUploader"
                onClientUploadComplete={(res: any) => {
                  console.log("respond from file upload:", res);
                  if (res?.length) {
                    setFileUrl(res[0].serverData.url);
                    setFileKey(res[0].serverData.fileKey);
                    setFileName(res[0].serverData.fileName);
                    setFileType(res[0].serverData.fileType);
                  }
                  toast.success("File uploaded", {
                    id: uploadToastId,
                    description: "You may submit now!",
                  });
                }}
                onUploadProgress={(p) => {
                  console.log("upload progress:", p);
                  toast.loading("Uploading file", {
                    id: uploadToastId,
                    description: "This may take a few seconds",
                  });
                }}
                onUploadError={(err: Error) => {
                  console.error("error uploading file:", err);
                  toast.success("File upload error", {
                    id: uploadToastId,
                    description: err.message || "Please try again",
                  });
                }}
                // className="mt-2"
              />
              {fileError && <p className="text-red-500">{fileError}</p>}
            </div>

            {fileUrl && (
              <p className="text-sm mt-1 truncate">Uploaded: {fileUrl}</p>
            )}
          </Field>
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="hover:cursor-pointer">
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="submit"
            onClick={form.handleSubmit(handleSubmit)}
            disabled={isPending}
          >
            {isPending ? "Submitting..." : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UploadNoteForm;
