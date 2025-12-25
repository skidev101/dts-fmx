"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { User } from "@/types/user";
import { mockUser } from "../../layout";
import formatDate from "@/utils/formatDate";
import { Loader2, Pencil, ShieldCheck, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { uploadToCloudinary } from "@/lib/uploadFile";
import { useUpdateUserProfile } from "@/hooks/users/useUpdateUserProfile";
import { useCurrentUser } from "@/hooks/users/useCurrentUser";
import { toast } from "sonner";
import { LoadingOrError } from "@/components/LoadingOrError";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const profileFormSchema = z.object({
  username: z
    .string()
    .min(3, "Username is too short")
    .max(14, "Username is too long")
    .optional(),
  fullname: z.string().optional(),
  avatarFile: z
    .custom<File>(
      (val): val is File =>
        typeof val === "object" &&
        val !== null &&
        "size" in val &&
        "type" in val
    )
    .optional()
    .refine(
      (file) => !file || file.size <= MAX_FILE_SIZE,
      "Image must be smaller than 2MB"
    )
    .refine(
      (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Image must be a valid image type"
    ),
});

type FormSchema = z.infer<typeof profileFormSchema>;

interface UploadSchema {
  username?: string;
  fullname?: string;
  avatarUrl?: string;
}

export const UserAccount = () => {
  const {
    data: user,
    isLoading: loadingUser,
    isError: userError,
  } = useCurrentUser();
  const { mutate: updateUserProfile, isPending } = useUpdateUserProfile();
  const [preview, setPreview] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<FormSchema>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: user?.username ?? "",
      fullname: user?.fullname ?? "",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        username: user.username,
        fullname: user.fullname || "",
      });
      setPreview(user.avatarUrl as string);
    }
  }, [user, form]);

  const handleFileChange = (file: File) => {
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  useEffect(() => {
    return () => {
      // Revoke the object URL to avoid memory leaks
      if (preview && preview !== (user?.avatarUrl as string)) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview, user?.avatarUrl]);

  const handleSave = async (data: FormSchema) => {
    if (!user) return;

    const changes: Partial<UploadSchema> = {};
    let avatarUrl: string | undefined = undefined;

    if (data.fullname !== user.fullname) {
      changes.fullname = data.fullname;
    }
    if (data.username !== user.username) {
      changes.username = data.username;
    }
    if (data.avatarFile) {
      avatarUrl = await uploadToCloudinary(data.avatarFile, "avatars").then(
        (res) => res.secure_url
      );
      changes.avatarUrl = avatarUrl;
    }
    if (Object.keys(changes).length === 0) {
      setEditing(false);
      return;
    }

    // save changes
    updateUserProfile(changes, {
      onSuccess: () => {
        setEditing(false);
        if (avatarUrl) {
          setPreview(avatarUrl);
        }
        toast.success("Profile updated successfully");
      },
      onError: (error) => {
        toast.error("Error", {
          description: error.message || "Please try again",
        });
      },
    });
  };

  const handleEdit = () => {
    form.reset({
      username: user.username,
      fullname: user.fullname || "",
    });
    setEditing(true);
  };

  const cancelEdit = () => {
    form.reset({
      username: user.username,
      fullname: user.fullname || "",
    });
    setEditing(false);
    setPreview(user.avatarUrl as string);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const isReady = !!user && !loadingUser && !userError;
  if (!isReady) {
    return <LoadingOrError isLoading={loadingUser} isError={userError} />;
  }

  return (
    <div className="max-w-3xl mx-auto pt-10 space-y-6">
      <h1 className="text-2xl font-bold">Profile</h1>

      <form onSubmit={form.handleSubmit(handleSave)} className="space-y-6">
        <div className="flex items-center">
          <div className="flex ">
            <div>
              <div
                className="relative w-24 h-24 sm:w-28 sm:h-28 hover:cursor-pointer rounded-full"
                onClick={openModal}
              >
                <Image
                  src={preview ?? "/default-avatar.jpg"}
                  alt="User Avatar"
                  fill
                  className="rounded-full object-cover border-4 border-gray-200"
                />

                <button
                  type="button"
                  disabled={!editing}
                  onClick={(e) => {
                    e.stopPropagation(); // Stop the click from reaching the parent
                    fileInputRef?.current?.click();
                  }}
                  className={`${
                    !editing && "hidden"
                  } absolute bottom-1 -right-1 p-2 text-muted-foreground rounded-full bg-gray-300 border border-gray-400 hover:bg-gray-200 hover:cursor-pointer active:scale-98 transition-all duration-300`}
                >
                  <Pencil className="size-4" />
                </button>
              </div>
            </div>

            {/* Hidden file input */}
            <Controller
              name="avatarFile"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      field.onChange(file);
                      handleFileChange(file as File);
                    }}
                    disabled={!editing}
                    className="hidden"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <div className="ml-3">
            <p className="text-lg font-semibold">{user.fullname ?? user.username}</p>
            {user.role === "ADMIN" ? (
              <Badge
                variant="secondary"
                className="bg-blue-500 text-white dark:bg-blue-600"
              >
                <ShieldCheck />
                Admin
              </Badge>
            ) : (
              <Badge>STUDENT</Badge>
            )}
          </div>
        </div>

        {/* Input fields */}
        <Card>
          <CardContent className="space-y-4">
            <FieldGroup>
              <Controller
                name="fullname"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Full Name</FieldLabel>
                    <Input {...field} disabled={!editing} />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="username"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Username</FieldLabel>
                    <Input {...field} disabled={!editing} />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <Card>
          <CardContent className="space-y-2">
            <h2 className="text-lg font-semibold">Contact</h2>
            <Input
              value={user.email}
              disabled
              className="text-foreground/80 max-w-md"
            />
          </CardContent>
        </Card>

        {/* Member Info */}
        <div className="text-sm text-muted-foreground">
          Member since {formatDate(user.createdAt)}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-2">
          {editing ? (
            <>
              <Button type="button" variant="outline" onClick={cancelEdit}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </>
          ) : (
            <Button type="button" onClick={handleEdit} disabled={isPending}>
              Edit
            </Button>
          )}
        </div>
      </form>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="relative max-w-full max-h-full p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={preview || "/default-avatar.jpg"}
              alt="Full User Avatar"
              width={600}
              height={600}
              className="rounded-lg object-contain max-h-[90vh] max-w-[90vw]"
            />
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 w-10 h-10 grid items-center text-white bg-gray-700 p-2 rounded-full hover:bg-gray-600 hover:cursor-pointer active:scale-95 transition-all duration-300"
            >
              <X className="size-5 mx-auto" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
