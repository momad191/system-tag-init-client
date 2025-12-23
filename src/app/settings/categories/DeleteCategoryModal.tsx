"use client";

import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/lib/store";
import {
  deleteCategory,
  setCategoryToEdit,
} from "@/lib/features/categorySlice";

interface DeleteCategoryModalProps {
  open: boolean;
  onClose: () => void;
}

export default function DeleteCategoryModal({
  open,
  onClose,
}: DeleteCategoryModalProps) {
  const dispatch = useDispatch<AppDispatch>();

  const { categoryToEditId, loading } = useSelector(
    (state: RootState) => state.categories,
  );

  if (!open || !categoryToEditId) return null;

  const handleConfirm = async () => {
    await dispatch(deleteCategory(categoryToEditId));
    dispatch(setCategoryToEdit(null));
    onClose();
  };

  const handleCancel = () => {
    dispatch(setCategoryToEdit(null));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-dark">
        <h3 className="mb-2 text-lg font-semibold text-dark dark:text-white">
          Delete Category
        </h3>

        <p className="mb-6 text-sm text-gray-600 dark:text-gray-300">
          Are you sure you want to delete this category? This action cannot be
          undone.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={handleCancel}
            disabled={loading}
            className="rounded-md border px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-dark-2"
          >
            Cancel
          </button>

          <button
            onClick={handleConfirm}
            disabled={loading}
            className="rounded-md bg-red-700 px-4 py-2 text-sm text-white hover:bg-red-600"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
