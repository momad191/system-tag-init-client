"use client";

import { useDispatch } from "react-redux";
import { deleteUserById } from "@/lib/features/userSlice";
import { AppDispatch } from "@/lib/store";
import { User } from "@/lib/features/userSlice";
import { useState } from "react";

type DeleteUserModalProps = {
  isOpen: boolean;
  user: User | null;
  onClose: () => void;
};

export const DeleteUserModal = ({
  isOpen,
  user,
  onClose,
}: DeleteUserModalProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);

  if (!isOpen || !user) return null;

  const handleDelete = async () => {
    setLoading(true);
    try {
      await dispatch(deleteUserById(user.id)).unwrap();
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    /* 🔴 Overlay */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      {/* 🟢 Modal */}
      <div
        className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-3 text-xl font-semibold text-red-600">
          Delete User
        </h2>

        <p className="mb-6 text-sm text-gray-600">
          Are you sure you want to delete{" "}
          <span className="font-medium">{user.fullName}</span>?  
          This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded border px-4 py-2"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            disabled={loading}
            className="rounded bg-red-600 px-4 py-2 text-white disabled:opacity-50"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};
