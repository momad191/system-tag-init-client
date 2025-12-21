"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { X } from "lucide-react";

import {
  createChannel,
  ChannelProvider,
  ChannelCredentials,
} from "@/lib/features/channelSlice";
import type { AppDispatch, RootState } from "@/lib/store";
import { cn } from "@/lib/utils";

/* ======================================================
   Props
====================================================== */

interface AddChannelModalProps {
  open: boolean;
  onClose: () => void;
  userId: string; // required by API
}

/* ======================================================
   Component
====================================================== */

export default function AddChannelModal({
  open,
  onClose,
  userId,
}: AddChannelModalProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector(
    (state: RootState) => state.channels,
  );

  const [provider, setProvider] =
    useState<ChannelProvider>("custom");
  const [name, setName] = useState("");
  const [automatedReply, setAutomatedReply] = useState("");
  const [isActive, setIsActive] = useState(true);

  /* WhatsApp credentials */
  const [credentials, setCredentials] =
    useState<ChannelCredentials>({});

  /* ======================================================
     Reset on close
  ====================================================== */
  useEffect(() => {
    if (!open) {
      setProvider("custom");
      setName("");
      setAutomatedReply("");
      setIsActive(true);
      setCredentials({});
    }
  }, [open]);

  /* ======================================================
     Submit
  ====================================================== */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await dispatch(
      createChannel({
        userId,
        provider,
        name,
        automated_reply: automatedReply || undefined,
        credentials:
          provider === "whatsapp" ? credentials : undefined,
        isActive,
      }),
    );

    if (createChannel.fulfilled.match(result)) {
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-lg dark:bg-gray-dark">
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-dark dark:text-white">
            Add Channel
          </h3>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-dark dark:hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Provider */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              Provider
            </label>
            <select
              value={provider}
              onChange={(e) =>
                setProvider(e.target.value as ChannelProvider)
              }
              className="w-full rounded-md border border-stroke bg-transparent px-3 py-2 text-sm outline-none dark:border-dark-3"
            >
              <option value="custom">Custom</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="facebook">Facebook</option>
              <option value="email">Email</option>
            </select>
          </div>

          {/* Name */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              Channel Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. WhatsApp Support"
              required
              className="w-full rounded-md border border-stroke bg-transparent px-3 py-2 text-sm outline-none dark:border-dark-3"
            />
          </div>

          {/* Automated Reply */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              Automated Reply
            </label>
            <textarea
              value={automatedReply}
              onChange={(e) => setAutomatedReply(e.target.value)}
              rows={3}
              className="w-full rounded-md border border-stroke bg-transparent px-3 py-2 text-sm outline-none dark:border-dark-3"
            />
          </div>

          {/* WhatsApp Credentials */}
          {provider === "whatsapp" && (
            <div className="space-y-3 rounded-md border border-stroke p-4 dark:border-dark-3">
              <h4 className="text-sm font-semibold">
                WhatsApp Credentials
              </h4>

              {[
                "phone_number_id",
                "phone_number",
                "business_account_id",
                "app_id",
                "token",
              ].map((key) => (
                <input
                  key={key}
                  placeholder={key.replaceAll("_", " ")}
                  onChange={(e) =>
                    setCredentials((prev) => ({
                      ...prev,
                      [key]: e.target.value,
                    }))
                  }
                  className="w-full rounded-md border border-stroke bg-transparent px-3 py-2 text-sm outline-none dark:border-dark-3"
                />
              ))}
            </div>
          )}

          {/* Active */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isActive}
              onChange={() => setIsActive((p) => !p)}
              className="accent-primary"
            />
            <span className="text-sm">Active</span>
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-stroke px-4 py-2 text-sm dark:border-dark-3"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className={cn(
                "rounded-md bg-primary px-4 py-2 text-sm font-medium text-white",
                loading && "opacity-60 cursor-not-allowed",
              )}
            >
              {loading ? "Saving..." : "Create Channel"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
