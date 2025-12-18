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
// import { UploadButton } from "@uploadthing/react";
// import type { OurFileRouter } from "@/app/api/uploadthing/core";
import { useCreateNote } from "@/hooks/notes/useCreateNote";
import { useCourses } from "@/hooks/course/useCourses";
import { Course } from "@/types/course";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { uploadToCloudinary } from "@/lib/uploadFile";
import { Label } from "@/components/ui/label";
import { ALLOWED_TYPES, validateFile } from "@/utils/fileValidator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const noteSchema = z.object({
  title: z.string().min(3, "Title is too short").max(50, "Title is too long"),
  description: z.string().optional(),
});
type NoteFormSchema = z.infer<typeof noteSchema>;

const UploadNoteForm = () => {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
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

  const form = useForm<NoteFormSchema>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileError("");

    const fileError = validateFile(file);
    if (fileError) {
      setFileError(fileError);
      return;
    }

    setFile(file);
  };

  const handleReset = async () => {
    setFile(null);
    setFileError("");
    setSelectedCourse("");
    setCourseFieldError("");
    form.reset();
  };

  const handleSubmit = async (data: NoteFormSchema) => {
    if (!selectedCourse || selectedCourse == "") {
      setCourseFieldError("Please select a course");
      return;
    }
    if (!file) {
      setFileError("Please upload a file first");
      return;
    }
    const toastId = "note-toast";
    toast.loading("Uploading note...", { id: toastId });

    const upload = await uploadToCloudinary(file);
    console.log("result from file upload:", upload)
    createNote(
      {
        title: data.title,
        description: data.description || "",
        courseId: selectedCourseId,
        fileUrl: upload.secure_url,
        fileKey: upload.public_id,
        fileName: upload.original_filename,
        fileSize: upload.bytes,
        fileType: upload.format,
        resourceType: upload.resource_type,
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
          router.push("/resources/courses");
        },
        onError: (error) => {
          console.error("failed to create note:", error);
          toast.error("Failed to create note", {
            id: toastId,
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
    <Card className="bg-card/30 w-full rounded-2xl sm:rounded-3xl px-0 max-w-2xl">
      <CardHeader className="px-4 sm:px-6">
        <CardTitle className="text-2xl">New note</CardTitle>
        <CardDescription>
          Fill in the form below to create a new note under a course. Click
          submit when done.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4 sm:px-6">
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FieldGroup className="flex flex-col sm:flex-row items-center gap-2">
            {/* <div className="flex items-center gap-2"> */}
            {/* Title */}
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Title *</FieldLabel>
                  <Input
                    {...field}
                    placeholder="Intro to Data science"
                    className="border-neutral-800"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
              <div className="flex w-full flex-col gap-3 mt-2 sm:mt-0">
                <FieldLabel>Course *</FieldLabel>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={popoverOpen}
                    className={`w-full min-w-[230px] justify-between border-neutral-800! ${
                      courseFieldError && "border! border-red-800!"
                    } hover:cursor-pointer ${
                      !selectedCourse && "text-neutral-400"
                    }`}
                  >
                    {selectedCourse
                      ? selectedCourse.toUpperCase()
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

              <PopoverContent className="w-[230px] p-0">
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
                          {course.code.toUpperCase()}

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
                  rows={8}
                  placeholder="Note description"
                  className="resize-none min-h-24 border-neutral-800"
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
              className={`flex justify-center items-center py-4 border border-dashed min-h-24 ${
                fileError ? "border-red-500" : "border-gray-500"
              } rounded-xl`}
            >
              {/* <UploadButton<OurFileRouter, "noteUploader">
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
              /> */}
              <Input
                type="file"
                id="file-input"
                accept={ALLOWED_TYPES.join(",")}
                onChange={handleFileChange}
                className="hidden"
              />
              {file ? (
                <p>Uploaded</p>
              ) : (
                <Label htmlFor="file-input" className="hover:cursor-pointer">Choose file</Label>
              )}
            </div>

            {fileError && <p className="text-red-500">{fileError}</p>}
          </Field>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end items-center gap-2 mt-4">
        <Button
          variant="outline"
          onClick={handleReset}
          className="hover:cursor-pointer"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          onClick={form.handleSubmit(handleSubmit)}
          disabled={isPending || !courses}
          className="hover:cursor-pointer"
        >
          {isPending ? "Submitting..." : "Submit"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UploadNoteForm;
