"use client";

import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "@/lib/store";
import { deleteOutcome } from "@/lib/features/outcomeSlice";
import type { Outcome } from "@/lib/features/outcomeSlice";

import { Button } from "@/components/ui-elements/button";

interface DeleteOutcomeModalProps {
  open: boolean;
  outcome: Outcome | null;
  onClose: () => void;
}

const DeleteOutcomeModal = ({
  open,
  outcome,
  onClose,
}: DeleteOutcomeModalProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const modalRef = useRef<HTMLDivElement>(null);

  const { loading } = useSelector((state: RootState) => state.outcomes);

  /* ----------------------------------
     Close on outside click
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
     Delete handler
  ----------------------------------- */
  const handleDelete = async () => {
    if (!outcome) return;

    const res = await dispatch(deleteOutcome(outcome._id));

    if (deleteOutcome.fulfilled.match(res)) {
      onClose();
    }
  };

  if (!open || !outcome) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div
        ref={modalRef}
        className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-dark"
      >
        <h2 className="mb-2 text-lg font-semibold text-dark dark:text-white">
          Delete Outcome
        </h2>

        <p className="mb-6 text-sm text-gray-600 dark:text-gray-300">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-dark dark:text-white">
            {outcome.name}
          </span>
          ? This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3">
          <Button
            label="Cancel"
            variant="outlinePrimary"
            size="small"
            onClick={onClose}
          />

          <button
            onClick={handleDelete}
            disabled={loading}
            className="rounded-md bg-red-800 px-4 py-2 text-sm text-white hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteOutcomeModal;
