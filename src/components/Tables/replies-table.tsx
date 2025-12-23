"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";

import type { RootState, AppDispatch } from "@/lib/store";
import { fetchReplies, deleteReply } from "@/lib/features/replySlice";

import { TrashIcon } from "@/assets/icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DownloadIcon, PreviewIcon } from "./icons";

import { useState } from "react";
import EditReplyModal from "@/app/settings/replies/EditReplyModal";
import DeleteReplyModal from "@/app/settings/replies/DeleteReplyModal";
import { PencilSquareIcon } from "@/assets/icons";

export function RepliesTable() {
  const dispatch = useDispatch<AppDispatch>();

  const { replies, loading, error } = useSelector(
    (state: RootState) => state.replies,
  );

  /* ----------------------------------
     Fetch replies
  ----------------------------------- */
  useEffect(() => {
    dispatch(fetchReplies({ page: 1, limit: 10 }));
  }, [dispatch]);

  /* ----------------------------------
     Handlers
  ----------------------------------- */
  const handleDelete = (id: string) => {
    setSelectedReplyId(id);
    setDeleteOpen(true);
  };

  const handleEdit = (id: string) => {
    setSelectedReplyId(id);
    setEditOpen(true);
  };

  /* ----------------------------------
     States
  ----------------------------------- */

  const [editOpen, setEditOpen] = useState(false);
  const [selectedReplyId, setSelectedReplyId] = useState<string | null>(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  // const [selectedReplyId, setSelectedReplyId] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="rounded-[10px] border bg-white p-6 text-center">
        Loading replies...
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
            <TableHead className="min-w-[155px] xl:pl-7.5">Title</TableHead>
            <TableHead className="min-w-[155px] xl:pl-7.5">Message</TableHead>
            <TableHead className="min-w-[155px]">Created At</TableHead>
            <TableHead className="text-right xl:pr-7.5">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {replies.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="py-6 text-center">
                No replies found
              </TableCell>
            </TableRow>
          )}

          {replies.map((item) => (
            <TableRow
              key={item._id}
              className="border-[#eee] dark:border-dark-3"
            >
              <TableCell className="min-w-[155px] xl:pl-7.5">
                <h5 className="text-dark dark:text-white">{item.title}</h5>
              </TableCell>

              <TableCell className="min-w-[155px] xl:pl-7.5">
                <p className="text-dark dark:text-white">{item.message}</p>
              </TableCell>

              <TableCell>
                <p className="text-dark dark:text-white">
                  {dayjs(item.createdAt).format("MMM DD, YYYY")}
                </p>
              </TableCell>

              <TableCell className="xl:pr-7.5">
                <div className="flex items-center justify-end gap-x-3.5">
                  {/* Preview */}
                  {/* <button className="hover:text-primary">
                    <PreviewIcon />
                  </button> */}

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="hover:text-danger"
                  >
                    <TrashIcon />
                  </button>

                  <button
                    onClick={() => handleEdit(item._id)}
                    className="hover:text-primary"
                  >
                    <PencilSquareIcon />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <EditReplyModal
        open={editOpen}
        replyId={selectedReplyId}
        onClose={() => setEditOpen(false)}
      />

      <DeleteReplyModal
        open={deleteOpen}
        replyId={selectedReplyId}
        onClose={() => setDeleteOpen(false)}
      />
    </div>
  );
}
