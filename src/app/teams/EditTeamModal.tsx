"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; 
import { X } from "lucide-react";

import type { RootState, AppDispatch } from "@/lib/store";
import { updateTeam, setSelectedTeam } from "@/lib/features/teamSlice";
import { fetchUsers } from "@/lib/features/userSlice";
import { fetchChannels } from "@/lib/features/channelSlice";

export default function EditTeamModal() {
  const dispatch = useDispatch<AppDispatch>();

  const { selectedTeam, loading, error } = useSelector(
    (state: RootState) => state.teams
  );
  const users = useSelector((state: RootState) => state.users.users);
  const channels = useSelector((state: RootState) => state.channels.channels);

  const [name, setName] = useState("");
  const [members, setMembers] = useState<string[]>([]);
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);

  /* ----------------------------------
     Load users & channels
  ----------------------------------- */
  useEffect(() => {
    if (!selectedTeam) return;

    dispatch(fetchUsers({ page: 1, limit: 100 }));
    dispatch(fetchChannels());
  }, [dispatch, selectedTeam]);

  /* ----------------------------------
     Populate form
  ----------------------------------- */
  useEffect(() => {
    if (!selectedTeam) return;

    setName(selectedTeam.name);
    setMembers(selectedTeam.members.map((m: any) => m._id ?? m));
    setSelectedChannels(selectedTeam.channels.map((c: any) => c._id ?? c));
  }, [selectedTeam]);

  /* ----------------------------------
     Close modal
  ----------------------------------- */
  const handleClose = () => {
    dispatch(setSelectedTeam(null));
  };

  /* ----------------------------------
     Submit
  ----------------------------------- */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTeam) return;

    dispatch(
      updateTeam({
        id: selectedTeam._id,
        body: {
          name,
          members,
          channels: selectedChannels,
        },
      })
    )
      .unwrap()
      .then(() => handleClose());
  };

  if (!selectedTeam) return null;

  /* ----------------------------------
     Render
  ----------------------------------- */
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-lg dark:bg-gray-dark">
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-dark dark:text-white">
            Edit Team
          </h3>

          <button onClick={handleClose}>
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Team Name */}
          <div>
            <label className="mb-1 block text-sm font-medium">Team Name</label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border px-3 py-2 text-sm"
            />
          </div>

          {/* Members */}
          <div>
            <label className="mb-1 block text-sm font-medium">Members</label>
            <select
              multiple
              value={members}
              onChange={(e) =>
                setMembers(
                  Array.from(e.target.selectedOptions).map((o) => o.value)
                )
              }
              className="w-full rounded-md border px-3 py-2 text-sm"
            >
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.fullName} ({u.email})
                </option>
              ))}
            </select>
          </div>

          {/* Channels */}
          <div>
            <label className="mb-1 block text-sm font-medium">Channels</label>
            <select
              multiple
              value={selectedChannels}
              onChange={(e) =>
                setSelectedChannels(
                  Array.from(e.target.selectedOptions).map((o) => o.value)
                )
              }
              className="w-full rounded-md border px-3 py-2 text-sm"
            >
              {channels.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.provider})
                </option>
              ))}
            </select>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-md border px-4 py-2 text-sm"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
