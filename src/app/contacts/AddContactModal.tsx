"use client";

import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { X } from "lucide-react";

import type { RootState, AppDispatch } from "@/lib/store";
import { createContact } from "@/lib/features/contactSlice";

export default function AddContactModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const modalRef = useRef<HTMLDivElement>(null);

  const { loading, error } = useSelector((state: RootState) => state.contacts);

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
  });

  /* ----------------------------------
     Close on outside click
  ----------------------------------- */
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  /* ----------------------------------
     Submit
  ----------------------------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await dispatch(createContact(form));

    if (createContact.fulfilled.match(result)) {
      setForm({ name: "", mobile: "", email: "" });
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
    >
      <div
        ref={modalRef}
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl dark:bg-gray-dark"
      >
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-dark dark:text-white">
            Add New Contact
          </h3>

          <button
            onClick={onClose}
            className="rounded-md p-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-dark-3"
          >
            <X size={18} />
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 rounded-md bg-red-50 px-4 py-2 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="mb-1 block text-sm text-gray-600 dark:text-gray-300">
              Name
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:border-primary dark:bg-dark-2 dark:text-white"
              placeholder="John Doe"
            />
          </div>

          {/* Mobile */}
          <div>
            <label className="mb-1 block text-sm text-gray-600 dark:text-gray-300">
              Mobile
            </label>
            <input
              type="number"
              required
              value={form.mobile}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, mobile: e.target.value }))
              }
              className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:border-primary dark:bg-dark-2 dark:text-white"
              placeholder="0551234567"
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-1 block text-sm text-gray-600 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, email: e.target.value }))
              }
              className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:border-primary dark:bg-dark-2 dark:text-white"
              placeholder="example@email.com"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-dark-3"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-60"
            >
              {loading ? "Saving..." : "Add Contact"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
