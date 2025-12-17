"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { TrashIcon } from "@/assets/icons";
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

import { DownloadIcon, PreviewIcon } from "./icons";
import { fetchUsers } from "@/lib/features/userSlice";

/* ----------------------------------
   Types (optional but recommended)
----------------------------------- */
interface RootState {
  users: {
    users: any[];
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
     Fetch users on mount
  ----------------------------------- */
  useEffect(() => {
    dispatch(fetchUsers({ page: 1, limit: 10 }) as any);
  }, [dispatch]);

  /* ----------------------------------
     Loading / Error states
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
                <h5 className="text-dark dark:text-white">{item.fullName}</h5>
              </TableCell>

              <TableCell className="min-w-[155px] xl:pl-7.5">
                <h5 className="text-dark dark:text-white">{item.email}</h5>
              </TableCell>

              <TableCell className="min-w-[155px] xl:pl-7.5">
                <h5 className="text-dark dark:text-white">{item.mobile}</h5>
              </TableCell>

              <TableCell className="min-w-[155px] xl:pl-7.5">
                <h5 className="text-dark dark:text-white">{item.role}</h5>
              </TableCell>

              <TableCell className="min-w-[155px] xl:pl-7.5">
                <h5 className="text-dark dark:text-white">{item.type}</h5>
              </TableCell>

              <TableCell>
                <p className="text-dark dark:text-white">
                  {dayjs(item.createdAt).format("MMM DD, YYYY")}
                </p>
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
                      "bg-[#FFA70B]/[0.08] text-[#FFA70B]":
                        item.status === "Pending",
                    }
                  )}
                >
                  {item.status}
                </div>
              </TableCell>

              <TableCell className="xl:pr-7.5">
                <div className="flex items-center justify-end gap-x-3.5">
                  <button className="hover:text-primary">
                    <span className="sr-only">Preview</span>
                    <PreviewIcon />
                  </button>

                  <button className="hover:text-primary">
                    <span className="sr-only">Delete</span>
                    <TrashIcon />
                  </button>

                  <button className="hover:text-primary">
                    <span className="sr-only">Download</span>
                    <DownloadIcon />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
