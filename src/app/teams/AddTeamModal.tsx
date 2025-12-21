"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { X } from "lucide-react";
import type { RootState, AppDispatch } from "@/lib/store";
import { createTeam } from "@/lib/features/teamSlice";
import { fetchUsers, User } from "@/lib/features/userSlice";
import {
  fetchChannels,
  // deleteChannelById,
  Channel,
} from "@/lib/features/channelSlice";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function AddTeamModal({ open, onClose }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const { loading, error } = useSelector((state: RootState) => state.teams);
  const users = useSelector((state: RootState) => state.users.users);
  const channels = useSelector((state: RootState) => state.channels.channels);

  const [name, setName] = useState("");
  const [members, setMembers] = useState<string[]>([]);
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);

      useEffect(() => {
  dispatch(fetchUsers({ page: 1, limit: 100 }));
  dispatch(fetchChannels());
}, [dispatch]);

  if (!open) return null;




  /* ----------------------------------
     Handlers
  ----------------------------------- */

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(
      createTeam({
        name,
        members,
        channels: selectedChannels,
      })
    ).unwrap()
      .then(() => {
        setName("");
        setMembers([]);
        setSelectedChannels([]);
        onClose();
      });
  };





  /* ----------------------------------
     Render
  ----------------------------------- */

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-lg dark:bg-gray-dark">
        
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-dark dark:text-white">
            Add New Team
          </h3>

          <button onClick={onClose}>
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
              placeholder="Team Zeta"
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

          {/* Error */}
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
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
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create Team"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
