"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { X } from "lucide-react";

import type { RootState, AppDispatch } from "@/lib/store";
import { ChannelProvider, ChannelCredentials, setChannelToShow } from "@/lib/features/channelSlice";

/* ======================================================
   Component
====================================================== */
export default function ShowChannelModal() {
  const dispatch = useDispatch<AppDispatch>();
  const { channelToShow } = useSelector((state: RootState) => state.channels);

  const [provider, setProvider] = useState<ChannelProvider>("custom");
  const [name, setName] = useState("");
  const [automatedReply, setAutomatedReply] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [credentials, setCredentials] = useState<ChannelCredentials>({});

  /* ======================================================
     Populate data when channel changes
  ====================================================== */
  useEffect(() => {
    if (!channelToShow) return;

    setProvider(channelToShow.provider);
    setName(channelToShow.name);
    setAutomatedReply(channelToShow.automated_reply || "");
    setIsActive(channelToShow.isActive);
    setCredentials(channelToShow.credentials || {});
  }, [channelToShow]);

  /* ======================================================
     Close modal
  ====================================================== */
  const handleClose = () => {
    dispatch(setChannelToShow(null));
  };

  if (!channelToShow) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-lg dark:bg-gray-dark">
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-dark dark:text-white">
            Channel Details
          </h3>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-dark dark:hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Details */}
        <div className="space-y-4">
          {/* Provider */}
          <div>
            <h4 className="text-sm font-medium text-gray-500">Provider</h4>
            <p className="text-dark dark:text-white">{provider}</p>
          </div>

          {/* Name */}
          <div>
            <h4 className="text-sm font-medium text-gray-500">Channel Name</h4>
            <p className="text-dark dark:text-white">{name}</p>
          </div>

          {/* Automated Reply */}
          <div>
            <h4 className="text-sm font-medium text-gray-500">Automated Reply</h4>
            <p className="text-dark dark:text-white">{automatedReply || "-"}</p>
          </div>

          {/* WhatsApp Credentials */}
          {provider === "whatsapp" && (
            <div className="space-y-2 rounded-md border border-stroke p-4 dark:border-dark-3">
              <h4 className="text-sm font-semibold">WhatsApp Credentials</h4>
              {["phone_number_id", "phone_number", "business_account_id", "app_id", "token"].map(
                (key) => (
                  <div key={key} className="flex justify-between text-sm text-dark dark:text-white">
                    <span className="font-medium">{key.replaceAll("_", " ")}:</span>
                    <span>{(credentials as any)?.[key] || "-"}</span>
                  </div>
                )
              )}
            </div>
          )}

          {/* Status */}
          <div>
            <h4 className="text-sm font-medium text-gray-500">Status</h4>
            <p className={`text-dark dark:text-white ${isActive ? "text-green-600" : "text-red-600"}`}>
              {isActive ? "Active" : "Inactive"}
            </p>
          </div>

          {/* Close button */}
          <div className="flex justify-end pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-md border border-stroke px-4 py-2 text-sm dark:border-dark-3"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
