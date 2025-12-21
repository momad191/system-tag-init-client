"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { TrashIcon, PencilSquareIcon } from "@/assets/icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";

import {  PreviewIcon } from "./icons";
import { fetchUsers, User } from "@/lib/features/userSlice";
import { EditUserModal } from "@/app/users/EditUserModal";
import { DeleteUserModal } from "@/app/users/DeleteUserModal";

/* ----------------------------------
   Types
----------------------------------- */
interface RootState {
  users: {
    users: User[];
    loading: boolean;
    error: string | null;
  };
}

export function UsersTable() {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector(
    (state: RootState) => state.users 
  );

  /* ----------------------------------
     Edit modal state
  ----------------------------------- */
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [deleteUser, setDeleteUser] = useState<User | null>(null);

  /* ----------------------------------
     Fetch users
  ----------------------------------- */
  useEffect(() => {
    dispatch(fetchUsers({ page: 1, limit: 10 }) as any);
  }, [dispatch]);

  /* ----------------------------------
     Loading / Error
  ----------------------------------- */
  if (loading) {
    return (
      <div className="rounded-[10px] border bg-white p-6 text-center">
        Loading users...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-[10px] border bg-white p-6 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <>
      {/* 🔵 Edit User Modal */}
      <EditUserModal
        isOpen={!!selectedUser}
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
      />
      <DeleteUserModal
        isOpen={!!deleteUser}
        user={deleteUser}
        onClose={() => setDeleteUser(null)}
      />

      <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
        <Table>
          <TableHeader>
            <TableRow className="border-none bg-[#F7F9FC] dark:bg-dark-2 [&>th]:py-4 [&>th]:text-base [&>th]:text-dark [&>th]:dark:text-white">
              <TableHead className="min-w-[155px] xl:pl-7.5">Name</TableHead>
              <TableHead className="min-w-[155px] xl:pl-7.5">Email</TableHead>
              <TableHead className="min-w-[155px] xl:pl-7.5">Mobile</TableHead>
              <TableHead className="min-w-[155px] xl:pl-7.5">Role</TableHead>
              <TableHead className="min-w-[155px] xl:pl-7.5">Type</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right xl:pr-7.5">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users.map((item) => (
              <TableRow
                key={item.id}
                className="border-[#eee] dark:border-dark-3"
              >
                <TableCell className="min-w-[155px] xl:pl-7.5">
                  <h5 className="text-dark dark:text-white">
                    {item.fullName}
                  </h5>
                </TableCell>

                <TableCell className="min-w-[155px] xl:pl-7.5">
                  {item.email}
                </TableCell>

                <TableCell className="min-w-[155px] xl:pl-7.5">
                  {item.mobile}
                </TableCell>

                <TableCell className="min-w-[155px] xl:pl-7.5">
                  {item.role}
                </TableCell>

                <TableCell className="min-w-[155px] xl:pl-7.5">
                  {item.type}
                </TableCell>

                <TableCell>
                  {dayjs(item.createdAt).format("MMM DD, YYYY")}
                </TableCell>

                <TableCell>
                  <div
                    className={cn(
                      "max-w-fit rounded-full px-3.5 py-1 text-sm font-medium",
                      {
                        "bg-[#219653]/[0.08] text-[#219653]":
                          item.status === "active",
                        "bg-[#D34053]/[0.08] text-[#D34053]":
                          item.status === "inactive",
                      }
                    )}
                  >
                    {item.status}
                  </div>
                </TableCell>

                <TableCell className="xl:pr-7.5">
                  <div className="flex items-center justify-end gap-x-3.5">
                    <button className="hover:text-primary">
                      <PreviewIcon />
                    </button>

                    <button
                      className="hover:text-red-600"
                      onClick={() => setDeleteUser(item)}
                    >
                      <TrashIcon />
                    </button>

                    {/* ✏️ Edit user */}
                    <button
                      className="hover:text-primary"
                      onClick={() => setSelectedUser(item)}
                    >
                      <PencilSquareIcon />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
