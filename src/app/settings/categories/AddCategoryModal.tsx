"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";

import type { AppDispatch } from "@/lib/store";
import { createCategory } from "@/lib/features/categorySlice";

import { XMarkIcon } from "@/assets/icons";
import { Button } from "@/components/ui-elements/button";

interface Props {
  onClose: () => void;
}

export default function AddCategoryModal({ onClose }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  /* -------------------------------
     Local state
  -------------------------------- */
  const [userId, setUserId] = useState<string | undefined>(undefined);

  const [form, setForm] = useState({
    name: "",
    description: "",
    color_code: "#FF5733",
  });

  const [loading, setLoading] = useState(false);

  /* -------------------------------
     Get userId from cookies
  -------------------------------- */
  useEffect(() => {
    const id = Cookies.get("userId");
    setUserId(id);
  }, []);

  /* -------------------------------
     Handlers
  -------------------------------- */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      console.error("User ID not found");
      return;
    }

    setLoading(true);

    try {
      await dispatch(
        createCategory({
          userId,
          name: form.name,
          description: form.description,
          color_code: form.color_code,
        }),
      ).unwrap();

      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-40 bg-black/40" onClick={onClose} />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-xl dark:bg-gray-dark">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-dark dark:text-white">
            Add New Category
          </h2>

          <button onClick={onClose} className="hover:text-danger text-gray-500">
            <XMarkIcon />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Category name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full rounded-md border px-3 py-2 text-sm"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            className="w-full rounded-md border px-3 py-2 text-sm"
          />

          <div className="flex items-center gap-3">
            <label className="text-sm text-gray-600">Color</label>
            <input
              type="color"
              name="color_code"
              value={form.color_code}
              onChange={handleChange}
              className="h-10 w-14 cursor-pointer rounded border"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <Button label="Cancel" variant="green" onClick={onClose} />

            <button
              type="submit"
              disabled={loading || !userId}
              className="rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
