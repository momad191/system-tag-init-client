"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { RootState, AppDispatch } from "@/lib/store";
import {
  fetchCategoryById,
  updateCategory,
  clearCurrentCategory,
  setCategoryToEdit,
} from "@/lib/features/categorySlice";

import { Button } from "@/components/ui-elements/button";

interface EditCategoryModalProps {
  open: boolean;
  onClose: () => void;
}

export default function EditCategoryModal({
  open,
  onClose,
}: EditCategoryModalProps) {
  const dispatch = useDispatch<AppDispatch>();

  const { currentCategory, categoryToEditId, loading, loadingById, error } =
    useSelector((state: RootState) => state.categories);

  const [form, setForm] = useState({
    name: "",
    description: "",
    color_code: "",
  });

  /* ----------------------------------
     Fetch category by ID
  ----------------------------------- */
  useEffect(() => {
    if (open && categoryToEditId) {
      dispatch(fetchCategoryById(categoryToEditId));
    }
  }, [open, categoryToEditId, dispatch]);

  /* ----------------------------------
     Fill form when category loaded
  ----------------------------------- */
  useEffect(() => {
    if (currentCategory) {
      setForm({
        name: currentCategory.name,
        description: currentCategory.description,
        color_code: currentCategory.color_code,
      });
    }
  }, [currentCategory]);

  /* ----------------------------------
     Handlers
  ----------------------------------- */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!categoryToEditId) return;

    const res = await dispatch(
      updateCategory({
        id: categoryToEditId,
        body: form,
      }),
    );

    if (updateCategory.fulfilled.match(res)) {
      handleClose();
    }
  };

  const handleClose = () => {
    dispatch(clearCurrentCategory());
    dispatch(setCategoryToEdit(null));
    onClose();
  };

  /* ----------------------------------
     UI Guards
  ----------------------------------- */
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-lg font-semibold">Edit Category</h2>

        {loadingById && (
          <p className="mb-3 text-sm text-gray-500">Loading category...</p>
        )}

        {error && <p className="mb-3 text-sm text-red-500">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <input
            name="name"
            placeholder="Category name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full rounded-md border px-3 py-2 text-sm"
          />

          {/* Description */}
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            className="w-full rounded-md border px-3 py-2 text-sm"
          />

          {/* Color Code */}
          <input
            type="color"
            name="color_code"
            value={form.color_code}
            onChange={handleChange}
            required
            className="h-10 w-14 cursor-pointer rounded border"
            placeholder={form.color_code}
          />

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-3">
            <Button
              label="Cancel"
              variant="outlinePrimary"
              size="small"
              onClick={handleClose}
            />
            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-green-600 px-3 py-2 text-sm text-white hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
