"use client";

import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/lib/store";
import { deletePlan } from "@/lib/features/planSlice";

interface DeletePlanModalProps {
  planId: string;
  planName: string;
  onClose: () => void;
}

export default function DeletePlanModal({
  planId,
  planName,
  onClose,
}: DeletePlanModalProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.plans);

  const handleConfirmDelete = async () => {
    await dispatch(deletePlan(planId));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h3 className="mb-2 text-lg font-semibold text-dark">
          Delete Plan
        </h3>

        <p className="mb-6 text-sm text-gray-600">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-dark">
            {planName}
          </span>
          ? This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-md border px-4 py-2 text-sm hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleConfirmDelete}
            disabled={loading}
            className="rounded-md bg-danger px-4 py-2 text-sm text-white bg-red-800 hover:bg-red-600 disabled:opacity-50"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
