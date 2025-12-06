"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field } from "@/components/ui/field";
import { useCreateCourse } from "@/hooks/course/useCreateCourse";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

const newCourseSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(6),
  code: z.string().min(3),
  level: z.enum(["L100", "L200", "L300", "L400", "L500"]),
});

type NewCourseFormValues = z.infer<typeof newCourseSchema>;

export default function NewCourseForm() {
  const router = useRouter();
  const { mutate: createCourse, isPending } = useCreateCourse();

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<NewCourseFormValues>({
    resolver: zodResolver(newCourseSchema),
    defaultValues: {
      title: "",
      description: "",
      code: "",
      level: "L100",
    },
  });

  const toastId = "course-toast";

  const onSubmit = async (values: NewCourseFormValues) => {
    toast.info("Sending data");
    createCourse(
      {
        title: values.title,
        description: values.description,
        code: values.code,
        level: values.level,
      },
      {
        onSuccess: (result) => {
          console.log("Course created successfully:", result);
          toast.success("Course created successfully", {
            id: toastId,
            description: result.digest,
          });
          router.push("/resources/courses")
        },
        onError: (error) => {
          console.error("failed to create course:", error);
          toast.error("Failed to create course", {
            description: error.message || "Please try again",
          });
        },
      }
    );
  };

  return (
    <Dialog open onOpenChange={() => router.back()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="text-left py-2">
          <DialogTitle>New Course</DialogTitle>
          <DialogDescription className="mt-1">
            Fill in the form below to create a new course. Click create when
            done.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          {/* Code */}
          <Field>
            <Label htmlFor="code">Course Code *</Label>
            <Input id="code" {...register("code")} placeholder="DTS121" />
            {errors.code && (
              <p className="text-red-500 text-sm">{errors.code.message}</p>
            )}
          </Field>

          {/* Title */}
          <Field>
            <Label htmlFor="title">Title *</Label>
            <Input id="title" {...register("title")} placeholder="Introduction to Data science" />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </Field>

          {/* Description */}
          <Field>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" {...register("description")} rows={6} className="resize-none max-h-8" />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </Field>

          {/* Level Dropdown using Controller + Field */}
          <Field>
            <Label>Level</Label>
            <Controller
              control={control}
              name="level"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="L100">100 lvl</SelectItem>
                    <SelectItem value="L200">200 lvl</SelectItem>
                    <SelectItem value="L300">300 lvl</SelectItem>
                    <SelectItem value="L400">400 lvl</SelectItem>
                    <SelectItem value="L500">500 lvl</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.level && (
              <p className="text-red-500 text-sm">{errors.level.message}</p>
            )}
          </Field>

          <DialogFooter className="flex justify-end gap-2 mt-2">
            <DialogClose asChild>
              <Button variant="outline" className="hover:cursor-pointer">Cancel</Button>
            </DialogClose>
            <Button type="submit" className="hover:cursor-pointer" disabled={isPending}>
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
