"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import type { AppDispatch } from "@/lib/store";
import { updatePlan, Plan } from "@/lib/features/planSlice";

/* =========================
   Props
========================= */
interface EditPlanModalProps {
  plan: Plan;
  onClose: () => void;
} 

export default function EditPlanModal({
  plan,
  onClose,
}: EditPlanModalProps) {
  const dispatch = useDispatch<AppDispatch>();

  const [form, setForm] = useState({
    name: "",
    price: 0,
    period: "monthly",
    maxUsers: 0,
    maxWhatsApp: 0,
    maxEmails: 0,
    maxDirectMessages: 0,
    start_date: "",
    end_date: "",
  });

  /* ----------------------------------
     Init form with selected plan
  ----------------------------------- */
  useEffect(() => {
    if (plan) {
      setForm({
        name: plan.name,
        price: plan.price,
        period: plan.period,
        maxUsers: plan.maxUsers,
        maxWhatsApp: plan.maxWhatsApp,
        maxEmails: plan.maxEmails,
        maxDirectMessages: plan.maxDirectMessages,
        start_date: plan.start_date ?? "",
        end_date: plan.end_date ?? "",
      });
    }
  }, [plan]);

  /* ----------------------------------
     Handlers
  ----------------------------------- */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "price" ||
        name === "maxUsers" ||
        name === "maxWhatsApp" ||
        name === "maxEmails" ||
        name === "maxDirectMessages"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(
      updatePlan({
        id: plan._id,
        body: form,
      }),
    );

    onClose();
  };

  /* ----------------------------------
     UI
  ----------------------------------- */
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg dark:bg-gray-dark"
      >
        <h2 className="mb-4 text-lg font-semibold">Edit Plan</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Plan name"
            className="w-full rounded-md border px-3 py-2 text-sm"
            required
          />

          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full rounded-md border px-3 py-2 text-sm"
            required
          />

          <select
            name="period"
            value={form.period}
            onChange={handleChange}
            className="w-full rounded-md border px-3 py-2 text-sm"
          >
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>

          <input
            type="number"
            name="maxUsers"
            value={form.maxUsers}
            onChange={handleChange}
            placeholder="Max users"
            className="w-full rounded-md border px-3 py-2 text-sm"
          />

          <input
            type="number"
            name="maxWhatsApp"
            value={form.maxWhatsApp}
            onChange={handleChange}
            placeholder="Max WhatsApp"
            className="w-full rounded-md border px-3 py-2 text-sm"
          />

          <input
            type="number"
            name="maxEmails"
            value={form.maxEmails}
            onChange={handleChange}
            placeholder="Max emails"
            className="w-full rounded-md border px-3 py-2 text-sm"
          />

          <input
            type="number"
            name="maxDirectMessages"
            value={form.maxDirectMessages}
            onChange={handleChange}
            placeholder="Max direct messages"
            className="w-full rounded-md border px-3 py-2 text-sm"
          />

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border px-4 py-2 text-sm"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-md bg-primary px-4 py-2 text-sm text-white"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
