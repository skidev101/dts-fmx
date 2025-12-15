"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUsers } from "@/hooks/users/useUsers";
import {
  Calendar1,
  Loader2,
  MoreVertical,
  Pin,
  ShieldCheck,
  Trash,
  Trash2,
  User,
} from "lucide-react";
import formatDate from "@/utils/formatDate";
import { useState } from "react";
import PaginationButtons from "./PaginationButtons";
import { filters } from "../../users/page";
import { DeleteDialog } from "@/components/DeleteDialog";
import { useDeleteUser } from "@/hooks/users/useDeleteUser";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export default function UsersTable({
  page,
  setPage,
  roleFilter,
}: {
  page: number;
  setPage: (page: number) => void;
  roleFilter: filters;
}) {
  const router = useRouter();
  const [deleteId, setDeleteId] = useState("");
  const { data, isLoading, isFetching } = useUsers(page, roleFilter);
  const { mutate: deleteUser, isPending } = useDeleteUser();

  const handleDelete = async () => {
    console.log("deleteId:", deleteId);
    if (!deleteId) return;
    
    deleteUser(deleteId, {
      onSuccess: (result) => {
        toast.success("User deleted successfully", {
          description: result.digest,
        });
        router.push("/dashboard/users");
      },
      onError: (error) => {
        toast.error("An error occured", {
          description: error.message || "Please try again",
        });
      },
    });
  };

  if (isLoading || isFetching || !data) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="size-8 animate-spin" />
      </div>
    );
  }

  const users = data?.users ?? [];
  const totalPages = data?.totalPages ?? 1;

  return (
    <>
      <Card className="max-w-max max-h-max px-3 py-2 rounded-md">
        <p className="text-sm">Total users: {data?.totalUsers}</p>
      </Card>
      <div className="mt-4 border rounded-xl bg-card shadow-sm overflow-hidden">
        {/* DESKTOP TABLE */}
        <div className="relative hidden md:block max-h-[600px] overflow-auto">
          <Table>
            <TableHeader className="sticky top-0 bg-card z-10 border-b">
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[380px] ml-2 font-semibold">
                  <div className="flex items-center gap-1">
                    <User className="size-4" />
                    User
                  </div>
                </TableHead>
                <TableHead className="ml-2 font-semibold">
                  <div className="flex items-center gap-1">
                    <ShieldCheck className="size-4" />
                    Role
                  </div>
                </TableHead>
                <TableHead className="flex gap-1 items-center mr-2 font-semibold">
                  <div className="flex items-center gap-1">
                    <Calendar1 className="size-4" />
                    Joined
                  </div>
                </TableHead>
                <TableHead className="text-right mr-2 font-semibold">
                  <div className="flex justify-end items-center gap-1 text-right">
                    <Pin className="size-4" />
                    Action
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {users.map((user, i) => (
                <TableRow
                  key={user.id}
                  className={`transition-colors ${
                    i % 2 === 0 ? "bg-muted/30" : "bg-transparent"
                  } hover:bg-muted/50`}
                >
                  {/* USER + AVATAR + EMAIL */}
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Image
                        src={"/default-avatar.jpg"}
                        alt={user.fullname || user.username}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />

                      <div className="flex flex-col">
                        <span className="font-medium">
                          {user.fullname || user.username}
                        </span>

                        <span className="text-sm text-muted-foreground">
                          {user.email}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  {/* ROLE */}
                  <TableCell>
                    <Badge
                      variant={user.role === "ADMIN" ? "default" : "secondary"}
                    >
                      {user.role}
                    </Badge>
                  </TableCell>

                  {/* DATE */}
                  <TableCell className="text-muted-foreground text-sm">
                    {formatDate(user.createdAt)}
                  </TableCell>

                  <TableCell className="text-right">
                    <Button
                      variant="destructive"
                      onClick={() => setDeleteId(user.id)}
                      className="hover:bg-destructive/80! hover:scale-102 active:scale-98 hover:cursor-pointer"
                    >
                      <Trash className="size-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}

              {users.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="py-10 text-center text-muted-foreground"
                  >
                    No users found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* MOBILE CARD LIST */}
        {/* <div className="md:hidden divide-y">
          {users.map((user) => (
            <div key={user.id} className="p-4 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <Image
                  src={"/default-avatar.jpg"}
                  alt="avatar"
                  width={32}
                  height={32}
                  className="rounded-full"
                />

                <div className="flex flex-col">
                  <span className="font-medium">
                    {user.fullname || user.username}
                  </span>

                  <span className="text-sm text-muted-foreground">
                    {user.email}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Badge
                  variant={user.role === "admin" ? "default" : "secondary"}
                  className="capitalize"
                >
                  {user.role}
                </Badge>

                <span className="text-xs text-muted-foreground">
                  {formatDate(user.createdAt)}
                </span>
              </div>
            </div>
          ))}
        </div> */}

        <div className="md:hidden divide-y">
          {users.map((user) => (
            <div key={user.id} className="p-4 flex flex-col gap-3">
              {/* HEADER: USER + ELLIPSIS */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <Image
                    src="/default-avatar.jpg"
                    alt="avatar"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />

                  <div className="flex flex-col">
                    <span className="font-medium">
                      {user.fullname || user.username}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {user.email}
                    </span>
                  </div>
                </div>

                {/* ELLIPSIS MENU */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      className="text-destructive"
                      onSelect={(e) => {
                        e.preventDefault();
                        setDeleteId(user.id);
                      }}
                    >
                      <Trash2 className="mr-1 size-4 text-destructive" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* META: ROLE + JOINED DATE */}
              <div className="flex items-center justify-between">
                <Badge
                  variant={user.role === "ADMIN" ? "default" : "secondary"}
                  className="capitalize"
                >
                  {user.role}
                </Badge>

                <span className="text-xs text-muted-foreground">
                  {formatDate(user.createdAt)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {totalPages > 0 && (
        <div className="py-8">
          <PaginationButtons
            page={page}
            totalPages={totalPages}
            setPage={setPage}
          />
        </div>
      )}

      <DeleteDialog
        id={deleteId}
        action={handleDelete}
        setDeleteId={setDeleteId}
        isLoading={isPending}
        alertText="This action cannot be undone. This will permanently delete this user and all related data."
      />
    </>
  );
}
