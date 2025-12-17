"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "@/lib/features/userSlice";
import { AppDispatch } from "@/lib/store";
import { Checkbox } from "@/components/FormElements/checkbox";

type AddUserModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export const AddUserModal = ({ isOpen, onClose }: AddUserModalProps) => {
    const dispatch = useDispatch<AppDispatch>();

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        mobile: "",
        passwordHash: "123123",
        role: "User",
        type: "individual",
        status: "active",
        access_reports: true,
        access_broadcasts: true,
        access_settings: true,
        access_channels: true,
        access_accounts: true,
        is_email_verified: true,
        added_by: "",
        subscriptionId: "",
    });

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await dispatch(createUser(formData)).unwrap();
            onClose();
        } catch (err: any) {
            setError(err?.message || "Failed to create user");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        /* 🔴 Overlay (click closes modal) */
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            onClick={onClose}
        >
            {/* 🟢 Modal box (prevent close when clicking inside) */}
            <div
                className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="mb-4 text-xl font-semibold">Add New User</h2>

                {error && <p className="mb-3 text-red-500">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Full Name"
                        className="w-full rounded border p-2"
                        required
                    />

                    <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="w-full rounded border p-2"
                        required
                    />

                    <input
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        placeholder="Mobile"
                        className="w-full rounded border p-2"
                        required
                    />

                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full rounded border p-2"
                    >
                        <option value="Admin">Admin</option>
                        <option value="User">User</option>
                        <option value="Editor">Editor</option>
                        <option value="Viewer">Viewer</option>
                        <option value="Agent">Agent</option>
                    </select>

                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full rounded border p-2"
                    >
                        <option value="individual">Individual</option>
                        <option value="company">Company</option>
                    </select>

                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full rounded border p-2"
                    >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>

                    {/* Permissions */}
                    <div className="grid grid-cols-2 gap-2 pt-2">
                        {[
                            "access_reports",
                            "access_broadcasts",
                            "access_settings",
                            "access_channels",
                            "access_accounts",
                            "is_email_verified",
                        ].map((field) => (
                            <label key={field} className="flex items-center gap-2 text-sm">
                                {/* <input
                                type="checkbox"
                                name={field}
                                checked={formData[field as keyof typeof formData] as boolean}
                                onChange={handleChange}
                                /> */}

                                <Checkbox
                                    type={"checkbox"}
                                    name={field}
                                    checked={formData[field as keyof typeof formData] as boolean}
                                    handleChange={handleChange}
                                    label="Checkbox Text" />



                                {field.replace(/_/g, " ")}
                            </label>
                        ))}
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded border px-4 py-2"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded bg-green-600 px-4 py-2 text-white disabled:opacity-50"
                        >
                            {loading ? "Saving..." : "Add User"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
