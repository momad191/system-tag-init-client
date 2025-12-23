"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";

import type { RootState, AppDispatch } from "@/lib/store";
import {
  fetchCategoryById,
  clearCurrentCategory,
} from "@/lib/features/categorySlice";

import { XMarkIcon } from "@/assets/icons";
import { Button } from "@/components/ui-elements/button";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function ShowCategoryModal({ open, onClose }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const { categoryToEditId, currentCategory, loadingById } = useSelector(
    (state: RootState) => state.categories,
  );

  /* ----------------------------------
     Fetch category when modal opens
  ----------------------------------- */
  useEffect(() => {
    if (open && categoryToEditId) {
      dispatch(fetchCategoryById(categoryToEditId));
    }

    return () => {
      dispatch(clearCurrentCategory());
    };
  }, [open, categoryToEditId, dispatch]);

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-40 bg-black/40" onClick={onClose} />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-xl dark:bg-gray-dark">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-dark dark:text-white">
            Category Details
          </h2>

          <button onClick={onClose} className="hover:text-danger text-gray-500">
            <XMarkIcon />
          </button>
        </div>

        {/* Content */}
        {loadingById || !currentCategory ? (
          <div className="py-8 text-center text-sm text-gray-500">
            Loading category...
          </div>
        ) : (
          <div className="space-y-4">
            {/* Name */}
            <div>
              <p className="text-xs text-gray-500">Name</p>
              <p className="font-medium text-dark dark:text-white">
                {currentCategory.name}
              </p>
            </div>

            {/* Description */}
            <div>
              <p className="text-xs text-gray-500">Description</p>
              <p className="text-dark dark:text-white">
                {currentCategory.description || "—"}
              </p>
            </div>

            {/* Color */}
            <div>
              <p className="text-xs text-gray-500">Color Code</p>
              <div className="flex items-center gap-3">
                <span
                  className="inline-block h-6 w-6 rounded"
                  style={{ backgroundColor: currentCategory.color_code }}
                />
                <span className="text-sm text-dark dark:text-white">
                  {currentCategory.color_code}
                </span>
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <p className="text-xs text-gray-500">Created At</p>
                <p className="text-sm text-dark dark:text-white">
                  {dayjs(currentCategory.createdAt).format("MMM DD, YYYY")}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Updated At</p>
                <p className="text-sm text-dark dark:text-white">
                  {dayjs(currentCategory.updatedAt).format("MMM DD, YYYY")}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-end pt-6">
          <Button label="Close" variant="green" onClick={onClose} />
        </div>
      </div>
    </>
  );
}
