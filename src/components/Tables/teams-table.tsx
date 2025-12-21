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
import { DownloadIcon, PreviewIcon } from "./icons";

import { setSelectedTeam } from "@/lib/features/teamSlice";
import EditTeamModal from "@/app/teams/EditTeamModal";


export function TeamsTable() {
    const dispatch = useDispatch<AppDispatch>();

    const { teams, loading, error } = useSelector(
        (state: RootState) => state.teams
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
                        <TableHead className="min-w-[155px] xl:pl-7.5">
                            Name
                        </TableHead>
                        <TableHead className="min-w-[155px] xl:pl-7.5">
                            Channels
                        </TableHead>
                        <TableHead className="min-w-[155px] xl:pl-7.5">
                            Members
                        </TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead className="text-right xl:pr-7.5">
                            Actions
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {teams.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center py-6">
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
                                <h5 className="text-dark dark:text-white">
                                    {team.name}
                                </h5>
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

                                    <button className="hover:text-danger">
                                        <span className="sr-only">
                                            Delete Team
                                        </span>
                                        <TrashIcon />
                                    </button>

                                    <button className="hover:text-primary">
                                        <span className="sr-only">
                                            Download Team
                                        </span>
                                        <DownloadIcon />
                                    </button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <EditTeamModal />
        </div>
        
    );
}
