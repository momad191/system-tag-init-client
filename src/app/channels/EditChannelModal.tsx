"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { X } from "lucide-react";

import type { RootState, AppDispatch } from "@/lib/store";
import {
  ChannelProvider,
  ChannelCredentials,
  setSelectedChannel,
  updateChannel,
} from "@/lib/features/channelSlice";
import { cn } from "@/lib/utils";

/* ======================================================
   Component
====================================================== */

export default function EditChannelModal() {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedChannel, loading, error } = useSelector(
    (state: RootState) => state.channels
  );

  const [provider, setProvider] = useState<ChannelProvider>("custom");
  const [name, setName] = useState("");
  const [automatedReply, setAutomatedReply] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [credentials, setCredentials] = useState<ChannelCredentials>({});

  /* ======================================================
     Populate form when channel changes
  ====================================================== */
  useEffect(() => {
    if (!selectedChannel) return;

    setProvider(selectedChannel.provider);
    setName(selectedChannel.name);
    setAutomatedReply(selectedChannel.automated_reply || "");
    setIsActive(selectedChannel.isActive);
    setCredentials(selectedChannel.credentials || {});
  }, [selectedChannel]);

  /* ======================================================
     Close modal
  ====================================================== */
  const handleClose = () => {
    dispatch(setSelectedChannel(null));
  };

  /* ======================================================
     Submit (update thunk)
  ====================================================== */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedChannel) return;

    dispatch(
      updateChannel({
        id: selectedChannel.id,
        dto: {
          name,
          automated_reply: automatedReply,
          credentials: provider === "whatsapp" ? credentials : undefined,
          isActive,
        },
      })
    );

    handleClose();
  };

  if (!selectedChannel) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-lg dark:bg-gray-dark">
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-dark dark:text-white">
            Edit Channel
          </h3>

          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-dark dark:hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Provider (readonly) */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              Provider
            </label>
            <input
              disabled
              value={provider}
              className="w-full cursor-not-allowed rounded-md border border-stroke bg-gray-100 px-3 py-2 text-sm dark:border-dark-3 dark:bg-dark-2"
            />
          </div>

          {/* Name */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              Channel Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              rows={3}
              value={automatedReply}
              onChange={(e) => setAutomatedReply(e.target.value)}
              className="w-full rounded-md border border-stroke bg-transparent px-3 py-2 text-sm outline-none dark:border-dark-3"
            />
          </div>

          {/* WhatsApp Credentials */}
          {provider === "whatsapp" && (
            <div className="space-y-3 rounded-md border border-stroke p-4 dark:border-dark-3">
              <h4 className="text-sm font-semibold">WhatsApp Credentials</h4>

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
                  value={(credentials as any)?.[key] || ""}
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
          {error && <p className="text-sm text-red-500">{error}</p>}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-md border border-stroke px-4 py-2 text-sm dark:border-dark-3"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className={cn(
                "rounded-md bg-primary px-4 py-2 text-sm font-medium text-white",
                loading && "cursor-not-allowed opacity-60"
              )}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
