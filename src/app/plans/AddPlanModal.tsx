"use client";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { X } from "lucide-react";

import type { RootState, AppDispatch } from "@/lib/store";
import { createPlan } from "@/lib/features/planSlice";

export default function AddPlanModal({
    open,
    onClose,
}: {
    open: boolean;
    onClose: () => void;
}) {
    const dispatch = useDispatch<AppDispatch>();
    const modalRef = useRef<HTMLDivElement>(null);

    const { loading, error } = useSelector((state: RootState) => state.plans);

    /* ----------------------------------
       Form state
    ----------------------------------- */
    const [form, setForm] = useState({
        name: "",
        price: "",
        period: "",
        maxUsers: "",
        maxWhatsApp: "",
        maxEmails: "",
        maxDirectMessages: "",
        start_date: "",
        end_date: "",
    });

    /* ----------------------------------
       Close on outside click
    ----------------------------------- */
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                onClose();
            }
        }

        if (open) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [open, onClose]);

    if (!open) return null;

    /* ----------------------------------
       Handlers
    ----------------------------------- */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        dispatch(
            createPlan({
                name: form.name,
                price: Number(form.price),
                period: form.period,
                maxUsers: Number(form.maxUsers),
                maxWhatsApp: Number(form.maxWhatsApp),
                maxEmails: Number(form.maxEmails),
                maxDirectMessages: Number(form.maxDirectMessages),
                start_date: form.start_date,
                end_date: form.end_date,
            }),
        ).then((res) => {
            if (res.meta.requestStatus === "fulfilled") {
                onClose();
                setForm({
                    name: "",
                    price: "",
                    period: "",
                    maxUsers: "",
                    maxWhatsApp: "",
                    maxEmails: "",
                    maxDirectMessages: "",
                    start_date: "",
                    end_date: "",
                });
            }
        });
    };

    /* ----------------------------------
       UI
    ----------------------------------- */
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div
                ref={modalRef}
                className="w-full max-w-3xl rounded-xl bg-white p-6 shadow-lg dark:bg-gray-dark"
            >
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-dark dark:text-white">
                        Add New Plan
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X size={18} />
                    </button>
                </div>

                {/* Error */}
                {error && (
                    <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
                        {error}
                    </p>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                    <input
                        name="name"
                        placeholder="Plan name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="col-span-2 rounded-md border px-3 py-2 text-sm"
                    />

                    <input
                        name="price"
                        type="number"
                        placeholder="Price"
                        value={form.price}
                        onChange={handleChange}
                        required
                        className="rounded-md border px-3 py-2 text-sm"
                    />

                    <select
                        name="period"
                        value={form.period}
                        onChange={handleChange}
                        required
                        className="rounded-md border px-3 py-2 text-sm"
                    >
                        <option value="" disabled>
                            Select period
                        </option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                    </select>


                    <input
                        name="maxUsers"
                        type="number"
                        placeholder="Max users"
                        value={form.maxUsers}
                        onChange={handleChange}
                        className="rounded-md border px-3 py-2 text-sm"
                    />

                    <input
                        name="maxWhatsApp"
                        type="number"
                        placeholder="Max WhatsApp"
                        value={form.maxWhatsApp}
                        onChange={handleChange}
                        className="rounded-md border px-3 py-2 text-sm"
                    />

                    <input
                        name="maxEmails"
                        type="number"
                        placeholder="Max emails"
                        value={form.maxEmails}
                        onChange={handleChange}
                        className="rounded-md border px-3 py-2 text-sm"
                    />

                    <input
                        name="maxDirectMessages"
                        type="number"
                        placeholder="Max direct messages"
                        value={form.maxDirectMessages}
                        onChange={handleChange}
                        className="rounded-md border px-3 py-2 text-sm"
                    />

                    <input
                        name="start_date"
                        type="date"
                        value={form.start_date}
                        onChange={handleChange}
                        className="rounded-md border px-3 py-2 text-sm"
                    />

                    <input
                        name="end_date"
                        type="date"
                        value={form.end_date}
                        onChange={handleChange}
                        className="rounded-md border px-3 py-2 text-sm"
                    />

                    {/* Actions */}
                    <div className="col-span-2 flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-md border px-4 py-2 text-sm"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-md bg-primary px-5 py-2 text-sm text-white hover:bg-primary/90 disabled:opacity-60"
                        >
                            {loading ? "Creating..." : "Create Plan"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
