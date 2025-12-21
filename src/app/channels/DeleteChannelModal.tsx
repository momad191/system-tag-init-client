"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { deleteChannelById, setSelectedChannel, Channel } from "@/lib/features/channelSlice";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DeleteChannelModal() {
  const dispatch = useDispatch<AppDispatch>();

 
  const { channelToDelete, loading, error } = useSelector(
  (state: RootState) => state.channels
);

  const [isOpen, setIsOpen] = useState(false);

 
  const handleClose = () => {
    setIsOpen(false);
    dispatch(setSelectedChannel(null));
  };


  useEffect(() => {
  setIsOpen(!!channelToDelete);
}, [channelToDelete]);

if (!channelToDelete || !isOpen) return null;

const handleDelete = () => {
  if (channelToDelete) {
    dispatch(deleteChannelById(channelToDelete.id));
    handleClose();
  }
};
  

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg dark:bg-gray-dark">
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-dark dark:text-white">
            Confirm Delete
          </h3>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-dark dark:hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <p className="mb-5 text-sm text-dark dark:text-white">
          Are you sure you want to delete the channel <strong>{channelToDelete.name}</strong>? This action cannot be undone.
        </p>

        {error && <p className="mb-3 text-sm text-red-500">{error}</p>}

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={handleClose}
            className="rounded-md border border-stroke px-4 py-2 text-sm dark:border-dark-3"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className={cn(
              "rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white",
              loading && "cursor-not-allowed opacity-60"
            )}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
