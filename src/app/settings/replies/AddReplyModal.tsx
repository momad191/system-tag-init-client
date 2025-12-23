"use client";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";

import type { RootState, AppDispatch } from "@/lib/store";
import { createReply } from "@/lib/features/replySlice";

import { Button } from "@/components/ui-elements/button";

interface AddReplyModalProps {
  open: boolean;
  onClose: () => void;
}

const AddReplyModal = ({ open, onClose }: AddReplyModalProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const modalRef = useRef<HTMLDivElement>(null);

  const { loading, error } = useSelector((state: RootState) => state.replies);

  const [form, setForm] = useState({
    title: "",
    message: "",
  });

  /* ----------------------------------
     Close when clicking outside
  ----------------------------------- */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onClose]);

  /* ----------------------------------
     Handlers
  ----------------------------------- */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userId = Cookies.get("userId");

    if (!userId) {
      console.error("User ID not found in cookies");
      return;
    }

    const res = await dispatch(
      createReply({
        userId,
        title: form.title,
        message: form.message,
      }),
    );

    if (createReply.fulfilled.match(res)) {
      setForm({ title: "", message: "" });
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div
        ref={modalRef}
        className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg dark:bg-gray-dark"
      >
        <h2 className="mb-4 text-lg font-semibold text-dark dark:text-white">
          Add New Reply
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full rounded-md border px-3 py-2 text-sm"
          />

          {/* Message */}
          <textarea
            name="message"
            placeholder="Message"
            value={form.message}
            onChange={handleChange}
            required
            rows={4}
            className="w-full rounded-md border px-3 py-2 text-sm"
          />

          {/* Error */}
          {error && <p className="text-danger text-sm">{error}</p>}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <Button
              label="Cancel"
              variant="outlinePrimary"
              size="small"
              onClick={onClose}
            />

            <button
              type="submit"
              className="rounded-md bg-green-600 px-3 py-2 text-sm text-white hover:bg-green-700 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReplyModal;
