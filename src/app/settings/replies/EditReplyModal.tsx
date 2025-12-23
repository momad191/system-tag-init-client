"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { RootState, AppDispatch } from "@/lib/store";
import {
  fetchReplyById,
  updateReply,
  clearCurrentReply,
} from "@/lib/features/replySlice";

import { Button } from "@/components/ui-elements/button";

interface Props {
  open: boolean;
  replyId: string | null;
  onClose: () => void;
}

export default function EditReplyModal({ open, replyId, onClose }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const { currentReply, loadingById, loading } = useSelector(
    (state: RootState) => state.replies,
  );

  const [form, setForm] = useState({
    title: "",
    message: "",
  });

  /* ----------------------------------
     Fetch reply by ID
  ----------------------------------- */
  useEffect(() => {
    if (open && replyId) {
      dispatch(fetchReplyById(replyId));
    }
  }, [open, replyId, dispatch]);

  /* ----------------------------------
     Fill form when reply loaded
  ----------------------------------- */
  useEffect(() => {
    if (currentReply) {
      setForm({
        title: currentReply.title,
        message: currentReply.message,
      });
    }
  }, [currentReply]);

  /* ----------------------------------
     Handlers
  ----------------------------------- */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyId) return;

    dispatch(updateReply({ id: replyId, body: form })).then(() => {
      handleClose();
    });
  };

  const handleClose = () => {
    dispatch(clearCurrentReply());
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-dark">
        <h3 className="mb-4 text-lg font-semibold text-dark dark:text-white">
          Edit Reply
        </h3>

        {loadingById ? (
          <p className="text-center">Loading reply...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="title"
              placeholder="Title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full rounded-md border px-3 py-2 text-sm"
            />

            <textarea
              name="message"
              placeholder="Message"
              value={form.message}
              onChange={handleChange}
              rows={4}
              required
              className="w-full rounded-md border px-3 py-2 text-sm"
            />

            <div className="flex justify-end gap-2">
              <Button
                label="Cancel"
                variant="outlinePrimary"
                onClick={handleClose}
              />
              <button
                type="submit"
                className="rounded-md bg-green-600 px-3 py-2 text-sm text-white hover:bg-green-700 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
