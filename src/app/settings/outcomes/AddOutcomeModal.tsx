"use client";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";

import type { RootState, AppDispatch } from "@/lib/store";
import { createOutcome } from "@/lib/features/outcomeSlice";

import { Button } from "@/components/ui-elements/button";

interface AddOutcomeModalProps {
  open: boolean;
  onClose: () => void;
}

const AddOutcomeModal = ({ open, onClose }: AddOutcomeModalProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const modalRef = useRef<HTMLDivElement>(null);

  const { loading, error } = useSelector(
    (state: RootState) => state.outcomes
  );

  const [form, setForm] = useState({
    userId: "",
    name: "",
    description: "",
  });

  /* ----------------------------------
     Get userId from cookies
  ----------------------------------- */
  useEffect(() => {
    const userId = Cookies.get("userId");
    if (userId) {
      setForm((prev) => ({ ...prev, userId }));
    }
  }, []);

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
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onClose]);

  /* ----------------------------------
     Handlers
  ----------------------------------- */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await dispatch(
      createOutcome({
        userId: form.userId,
        name: form.name,
        description: form.description,
        
      })
    );

    if (createOutcome.fulfilled.match(res)) {
      setForm({ userId: form.userId, name: "", description: "" });
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div
        ref={modalRef}
        className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl dark:bg-gray-dark"
      >
        <h2 className="mb-4 text-lg font-semibold text-dark dark:text-white">
          Add New Outcome
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
              onClick={onClose}
            />

            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOutcomeModal;
