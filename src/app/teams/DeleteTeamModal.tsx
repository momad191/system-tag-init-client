"use client";

import { useDispatch, useSelector } from "react-redux";
import { X, AlertTriangle } from "lucide-react";

import type { RootState, AppDispatch } from "@/lib/store";
import { deleteTeam, setTeamToDelete } from "@/lib/features/teamSlice";

export default function DeleteTeamModal() {
  const dispatch = useDispatch<AppDispatch>();

  const { TeamToDelete, loading, error } = useSelector(
    (state: RootState) => state.teams,
  );

  if (!TeamToDelete) return null;

  /* -----------------------------
     Close modal
  ------------------------------ */
  const handleClose = () => {
    dispatch(setTeamToDelete(null));
  };

  /* -----------------------------
     Confirm delete
  ------------------------------ */
  const handleDelete = () => {
    dispatch(deleteTeam(TeamToDelete._id))
      .unwrap()
      .then(() => handleClose());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg dark:bg-gray-dark">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-dark dark:text-white">
            Delete Team
          </h3>

          <button onClick={handleClose}>
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="flex items-start gap-3 rounded-md bg-red-50 p-4 dark:bg-red-950">
          <AlertTriangle className="text-danger mt-0.5" size={20} />

          <div className="text-sm text-dark dark:text-white">
            <p className="font-medium">
              Are you sure you want to delete this team?
            </p>
            <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
              <strong>{TeamToDelete.name}</strong> will be permanently removed.
              This action cannot be undone.
            </p>
          </div>
        </div>

        {error && <p className="text-danger mt-3 text-sm">{error}</p>}

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={handleClose}
            className="rounded-md border px-4 py-2 text-sm"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
          >
            {loading ? "Deleting..." : "Delete Team"}
          </button>
        </div>
      </div>
    </div>
  );
}
