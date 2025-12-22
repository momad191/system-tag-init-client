"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { X } from "lucide-react";
import dayjs from "dayjs";

import type { RootState, AppDispatch } from "@/lib/store";
import {
  fetchTeamById,
  setTeamToShow,
  setSelectedTeam,
  setTeamToDelete,
} from "@/lib/features/teamSlice";

export default function ShowTeamModal() {
  const dispatch = useDispatch<AppDispatch>();

  const { teamToShowId, currentTeam, loadingTeamById, error } = useSelector(
    (state: RootState) => state.teams,
  );

  /* ----------------------------------
     Fetch team by ID
  ----------------------------------- */
  useEffect(() => {
    if (!teamToShowId) return;
    dispatch(fetchTeamById(teamToShowId));
  }, [dispatch, teamToShowId]);

  const handleClose = () => {
    dispatch(setTeamToShow(null));
  };

  if (!teamToShowId) return null;

  /* ----------------------------------
     Loading Overlay
  ----------------------------------- */
  if (loadingTeamById) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <div className="rounded-xl bg-white px-6 py-4 text-sm font-medium shadow-lg dark:bg-gray-dark">
          Loading team details...
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="w-full max-w-3xl rounded-2xl bg-white shadow-2xl dark:bg-gray-dark">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4 dark:border-dark-3">
          <div>
            <h3 className="text-lg font-semibold text-dark dark:text-white">
              Team Details
            </h3>
            {currentTeam && (
              <p className="text-xs text-gray-500">
                Created {dayjs(currentTeam.createdAt).format("MMM DD, YYYY")}
              </p>
            )}
          </div>

          <button
            onClick={handleClose}
            className="rounded-md p-1 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-dark-2"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-6 px-6 py-5">
          {error && (
            <div className="rounded-md bg-red-50 px-4 py-2 text-sm text-red-600">
              {error}
            </div>
          )}

          {currentTeam && (
            <>
              {/* Team Info */}
              <div className="grid grid-cols-2 gap-4 rounded-xl bg-gray-50 p-4 text-sm dark:bg-dark-2">
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    Team Name
                  </p>
                  <p className="mt-1 font-semibold text-dark dark:text-white">
                    {currentTeam.name}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    Members
                  </p>
                  <p className="mt-1 font-semibold text-dark dark:text-white">
                    {currentTeam.members.length}
                  </p>
                </div>
              </div>

              {/* Members */}
              <div>
                <h4 className="mb-3 text-sm font-semibold text-dark dark:text-white">
                  Members
                  <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                    {currentTeam.members.length}
                  </span>
                </h4>

                <div className="divide-y rounded-xl border dark:border-dark-3">
                  {currentTeam.members.map((m) => (
                    <div
                      key={m._id}
                      className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 dark:hover:bg-dark-2"
                    >
                      <div>
                        <p className="text-sm font-medium text-dark dark:text-white">
                          {m.fullName}
                        </p>
                        <p className="text-xs text-gray-500">{m.email}</p>
                      </div>

                      <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs text-blue-600">
                        {m.role}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Channels */}
              <div>
                <h4 className="mb-3 text-sm font-semibold text-dark dark:text-white">
                  Channels
                  <span className="bg-success/10 text-success ml-2 rounded-full px-2 py-0.5 text-xs">
                    {currentTeam.channels.length}
                  </span>
                </h4>

                <div className="divide-y rounded-xl border dark:border-dark-3">
                  {currentTeam.channels.map((c) => (
                    <div
                      key={c._id}
                      className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 dark:hover:bg-dark-2"
                    >
                      <div>
                        <p className="text-sm font-medium text-dark dark:text-white">
                          {c.name}
                        </p>
                        <p className="text-xs text-gray-500">{c.provider}</p>
                      </div>

                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          c.isActive
                            ? "bg-success/10 text-success"
                            : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        {c.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t px-6 py-4 dark:border-dark-3">
          <button
            onClick={handleClose}
            className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200 dark:bg-dark-2 dark:text-white dark:hover:bg-dark-3"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
