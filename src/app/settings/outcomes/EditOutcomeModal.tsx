"use client";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { RootState, AppDispatch } from "@/lib/store";
import {
  updateOutcome,
  clearCurrentOutcome,
  Outcome,
} from "@/lib/features/outcomeSlice";

import { Button } from "@/components/ui-elements/button";

interface EditOutcomeModalProps {
  open: boolean;
  outcome: Outcome | null;
  onClose: () => void;
}

const EditOutcomeModal = ({
  open,
  outcome,
  onClose,
}: EditOutcomeModalProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const modalRef = useRef<HTMLDivElement>(null);

  const { loading, error } = useSelector(
    (state: RootState) => state.outcomes
  );

  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  /* ----------------------------------
     Populate form when outcome changes
  ----------------------------------- */
  useEffect(() => {
    if (outcome) {
      setForm({
        name: outcome.name,
        description: outcome.description,
      });
    }
  }, [outcome]);

  /* ----------------------------------
     Close when clicking outside
  ----------------------------------- */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        handleClose();
      }
    };

    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  /* ----------------------------------
     Handlers
  ----------------------------------- */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    dispatch(clearCurrentOutcome());
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!outcome) return;

    const res = await dispatch(
      updateOutcome({
        id: outcome._id,
        body: {
          name: form.name,
          description: form.description,
        },
      }),
    );

    if (updateOutcome.fulfilled.match(res)) {
      handleClose();
    }
  };

  if (!open || !outcome) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div
        ref={modalRef}
        className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg dark:bg-gray-dark"
      >
        <h2 className="mb-4 text-lg font-semibold text-dark dark:text-white">
          Edit Outcome
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <input
            name="name"
            placeholder="Outcome name"
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
              onClick={handleClose}
            />

            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditOutcomeModal;
