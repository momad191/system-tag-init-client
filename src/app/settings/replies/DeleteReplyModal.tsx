"use client";

import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/lib/store";
import { deleteReply } from "@/lib/features/replySlice";
import { Button } from "@/components/ui-elements/button";

interface DeleteReplyModalProps {
  open: boolean;
  replyId: string | null;
  onClose: () => void;
}

export default function DeleteReplyModal({
  open,
  replyId,
  onClose,
}: DeleteReplyModalProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.replies);

  if (!open || !replyId) return null;

  const handleDelete = async () => {
    await dispatch(deleteReply(replyId));
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-dark"
      >
        <h2 className="mb-3 text-lg font-semibold text-dark dark:text-white">
          Delete Reply
        </h2>

        <p className="mb-6 text-sm text-gray-600 dark:text-gray-300">
          Are you sure you want to delete this reply? This action cannot be
          undone.
        </p>

        <div className="flex justify-end gap-3">
          <Button
            label="Cancel"
            variant="outlinePrimary"
            size="small"
            onClick={onClose}
          />

          <button
            type="button"
            className="rounded-md bg-red-700 px-3 py-2 text-sm text-white hover:bg-red-600 disabled:opacity-50"
            disabled={loading}
            onClick={handleDelete}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
