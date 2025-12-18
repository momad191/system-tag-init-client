"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserById, User } from "@/lib/features/userSlice";
import { AppDispatch } from "@/lib/store";
import { Checkbox } from "@/components/FormElements/checkbox";

type EditUserModalProps = {
    isOpen: boolean;
    onClose: () => void;
    user: User | null;
};

export const EditUserModal = ({ isOpen, onClose, user }: EditUserModalProps) => {
    const dispatch = useDispatch<AppDispatch>();

    const [formData, setFormData] = useState<Partial<User>>({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    /* ----------------------------------------------------
       Fill form when user changes
    ---------------------------------------------------- */
    useEffect(() => {
        if (user) {
            setFormData({
                fullName: user.fullName,
                email: user.email,
                mobile: user.mobile,
                role: user.role,
                type: user.type,
                status: user.status,
                access_reports: user.access_reports,
                access_broadcasts: user.access_broadcasts,
                access_settings: user.access_settings,
                access_channels: user.access_channels,
                access_accounts: user.access_accounts,
                is_email_verified: user.is_email_verified,
            });
        }
    }, [user]);

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
        if (!user) return;

        setLoading(true);
        setError(null);

        try {
            await dispatch(
                updateUserById({
                    id: user.id,
                    userData: formData,
                })
            ).unwrap();

            onClose();
        } catch (err: any) {
            setError(err || "Failed to update user");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen || !user) return null;

    return (
        /* 🔴 Overlay */
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            onClick={onClose}
        >
            {/* 🟢 Modal */}
            <div
                className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="mb-4 text-xl font-semibold">Edit User</h2>

                {error && <p className="mb-3 text-red-500">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                        name="fullName"
                        value={formData.fullName || ""}
                        onChange={handleChange}
                        placeholder="Full Name"
                        className="w-full rounded border p-2 bg-white"
                        required
                    />

                    <input
                        name="email"
                        type="email"
                        value={formData.email || ""}
                        onChange={handleChange}
                        placeholder="Email"
                        className="w-full rounded border p-2 bg-white"
                        required
                    />

                    <input
                        name="mobile"
                        value={formData.mobile || ""}
                        onChange={handleChange}
                        placeholder="Mobile"
                        className="w-full rounded border p-2 bg-white"
                    />

                    <select
                        name="role"
                        value={formData.role || "User"}
                        onChange={handleChange}
                        className="w-full rounded border p-2 bg-white"
                    >
                        <option value="Admin">Admin</option>
                        <option value="User">User</option>
                        <option value="Editor">Editor</option>
                        <option value="Viewer">Viewer</option>
                        <option value="Agent">Agent</option>
                    </select>

                    <select
                        name="type"
                        value={formData.type || "individual"}
                        onChange={handleChange}
                        className="w-full rounded border p-2 bg-white"
                    >
                        <option value="individual">Individual</option>
                        <option value="company">Company</option>
                    </select>

                    <select
                        name="status"
                        value={formData.status || "active"}
                        onChange={handleChange}
                        className="w-full rounded border p-2 bg-white"
                    >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>

                    {/* Permissions */}
                    <h5 className="pt-2 font-medium">Permissions</h5>
                    <div className="grid grid-cols-2 gap-2">
                        {[
                            "access_reports",
                            "access_broadcasts",
                            "access_settings",
                            "access_channels",
                            "access_accounts",
                            "is_email_verified",
                        ].map((field) => (
                            <label
                                key={field}
                                className="flex items-center gap-2 text-sm"
                            >
                                <Checkbox
                                    type="checkbox"
                                    name={field}
                                    checked={Boolean(
                                        formData[field as keyof typeof formData]
                                    )}
                                    handleChange={handleChange}
                                    label=""
                                    
                                />

                               

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
                            className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
                        >
                            {loading ? "Saving..." : "Update User"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
