"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/lib/store";

import { TrashIcon, PencilSquareIcon } from "@/assets/icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import dayjs from "dayjs";

import { fetchTeams } from "@/lib/features/teamSlice";
import {PreviewIcon } from "./icons";

import { setSelectedTeam } from "@/lib/features/teamSlice";
import { setTeamToDelete } from "@/lib/features/teamSlice";
import EditTeamModal from "@/app/teams/EditTeamModal";
import DeleteTeamModal from "@/app/teams/DeleteTeamModal";
import ShowTeamModal from "@/app/teams/ShowTeamModal";
import { setTeamToShow } from "@/lib/features/teamSlice";

export function TeamsTable() {
  const handleClose = () => {
    dispatch(setTeamToShow(null));
    dispatch(setSelectedTeam(null));
    dispatch(setTeamToDelete(null));
  };

  const dispatch = useDispatch<AppDispatch>();

  const { teams, loading, error } = useSelector(
    (state: RootState) => state.teams,
  );

  useEffect(() => {
    dispatch(fetchTeams({ page: 1, limit: 10 }));
  }, [dispatch]);

  if (loading) {
    return (
      <div className="rounded-[10px] border bg-white p-6 text-center">
        Loading teams...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-[10px] border bg-white p-6 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
      <Table>
        <TableHeader>
          <TableRow className="border-none bg-[#F7F9FC] dark:bg-dark-2 [&>th]:py-4 [&>th]:text-base [&>th]:text-dark [&>th]:dark:text-white">
            <TableHead className="min-w-[155px] xl:pl-7.5">Name</TableHead>
            <TableHead className="min-w-[155px] xl:pl-7.5">Channels</TableHead>
            <TableHead className="min-w-[155px] xl:pl-7.5">Members</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="text-right xl:pr-7.5">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {teams.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="py-6 text-center">
                No teams found
              </TableCell>
            </TableRow>
          )}

          {teams.map((team) => (
            <TableRow
              key={team._id}
              className="border-[#eee] dark:border-dark-3"
            >
              <TableCell className="min-w-[155px] xl:pl-7.5">
                <h5 className="text-dark dark:text-white">{team.name}</h5>
              </TableCell>

              <TableCell className="min-w-[155px] xl:pl-7.5">
                {team.channels.length}
              </TableCell>

              <TableCell className="min-w-[155px] xl:pl-7.5">
                {team.members.length}
              </TableCell>

              <TableCell>
                {dayjs(team.createdAt).format("MMM DD, YYYY")}
              </TableCell>

              <TableCell className="xl:pr-7.5">
                <div className="flex items-center justify-end gap-x-3.5">
                  <button
                    className="hover:text-primary"
                    onClick={() => dispatch(setSelectedTeam(team))}
                  >
                    <span className="sr-only">Edit Team</span>
                    <PencilSquareIcon />
                  </button>

                  <button
                    className="hover:text-danger"
                    onClick={() => dispatch(setTeamToDelete(team as any))}
                  >
                    <span className="sr-only">Delete Team</span>
                    <TrashIcon />
                  </button>

                  <button
                    className="hover:text-primary"
                    onClick={() => dispatch(setTeamToShow(team._id))}
                  >
                    <span className="sr-only">Preview Team</span>
                    <PreviewIcon />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <EditTeamModal />

      <DeleteTeamModal />

      <ShowTeamModal />
    </div>
  );
}
