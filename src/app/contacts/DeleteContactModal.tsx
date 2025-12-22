"use client";

import { useDispatch, useSelector } from "react-redux";
import { X } from "lucide-react";

import type { RootState, AppDispatch } from "@/lib/store";
import { deleteContact, setContactToDelete } from "@/lib/features/contactSlice";

export default function DeleteContactModal() {
  const dispatch = useDispatch<AppDispatch>();

  const { contactToDelete, loading } = useSelector(
    (state: RootState) => state.contacts,
  );

  if (!contactToDelete) return null;

  const handleClose = () => {
    dispatch(setContactToDelete(null));
  };

  const handleConfirm = () => {
    dispatch(deleteContact(contactToDelete._id)).then(() => {
      dispatch(setContactToDelete(null));
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg dark:bg-gray-dark"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-dark dark:text-white">
            Delete Contact
          </h3>
          <button onClick={handleClose}>
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Are you sure you want to delete this contact?
        </p>

        <div className="mt-3 rounded-md border bg-gray-50 p-3 dark:bg-dark-2">
          <p className="font-medium text-dark dark:text-white">
            {contactToDelete.name}
          </p>
          <p className="text-sm text-gray-500">{contactToDelete.email}</p>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={handleClose}
            className="rounded-md border px-4 py-2 text-sm"
          >
            Cancel
          </button>

          <button
            onClick={handleConfirm}
            disabled={loading}
            className="hover:bg-danger/90 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
