"use client";

import { useEffect } from "react";
import { TrashIcon } from "@/assets/icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import { PreviewIcon } from "./icons";
import { PencilSquareIcon } from "@/assets/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/lib/store";
import {
  fetchChannels,
  // deleteChannelById,
  Channel,
} from "@/lib/features/channelSlice";

import EditChannelModal from "@/app/channels/EditChannelModal";
import { setSelectedChannel } from "@/lib/features/channelSlice";
import DeleteChannelModal from "@/app/channels/DeleteChannelModal";
import { setChannelToDelete } from "@/lib/features/channelSlice";
import ShowChannelModal from "@/app/channels/ShowChannelModal";
import { setChannelToShow } from "@/lib/features/channelSlice";

/* ----------------------------------
   Redux State
----------------------------------- */
interface RootState {
  channels: {
    channels: Channel[];
    loading: boolean;
    error: string | null;
  };
}

export function ChannelsTable() {
  const dispatch = useDispatch<AppDispatch>();
  const { channels, loading, error } = useSelector(
    (state: RootState) => state.channels,
  );

  /* ----------------------------------
     Fetch channels on mount
  ----------------------------------- */
  useEffect(() => {
    dispatch(fetchChannels());
  }, [dispatch]);

  /* ----------------------------------
     Loading state
  ----------------------------------- */
  if (loading) {
    return (
      <div className="rounded-[10px] border border-stroke bg-white p-6 text-center shadow-1 dark:border-dark-3 dark:bg-gray-dark">
        Loading channels...
      </div>
    );
  }

  /* ----------------------------------
     Error state
  ----------------------------------- */
  if (error) {
    return (
      <div className="rounded-[10px] border border-stroke bg-white p-6 text-center text-red-500 shadow-1 dark:border-dark-3 dark:bg-gray-dark">
        {error}
      </div>
    );
  }

  /* ----------------------------------
     Empty state
  ----------------------------------- */
  if (!channels.length) {
    return (
      <div className="rounded-[10px] border border-stroke bg-white p-6 text-center shadow-1 dark:border-dark-3 dark:bg-gray-dark">
        No channels found
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
              Provider
            </TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="min-w-[155px] xl:pl-7.5">
              Status
            </TableHead>
            <TableHead className="text-right xl:pr-7.5">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {channels.map((item) => (
            <TableRow
              key={item.id}
              className="border-[#eee] dark:border-dark-3"
            >
              {/* Name */}
              <TableCell className="min-w-[155px] xl:pl-7.5">
                <h5 className="text-dark dark:text-white">
                  {item.name}
                </h5>
              </TableCell>

              {/* Provider */}
              <TableCell className="min-w-[155px] xl:pl-7.5">
                <h5 className="capitalize text-dark dark:text-white">
                  {item.provider}
                </h5>
              </TableCell>

              {/* Date */}
              <TableCell>
                <p className="text-dark dark:text-white">
                  {dayjs(item.createdAt).format("MMM DD, YYYY")}
                </p>
              </TableCell>

              {/* Status */}
              <TableCell>
                <div
                  className={cn(
                    "max-w-fit rounded-full px-3.5 py-1 text-sm font-medium",
                    {
                      "bg-[#219653]/[0.08] text-[#219653]":
                        item.isActive,
                      "bg-[#D34053]/[0.08] text-[#D34053]":
                        !item.isActive,
                    },
                  )}
                >
                  {item.isActive ? "Active" : "Inactive"}
                </div>
              </TableCell>

              {/* Actions */}
              <TableCell className="xl:pr-7.5">

                <div className="flex items-center justify-end gap-x-3.5"
                
                >
                  <button className="hover:text-primary"
                  onClick={() => dispatch(setChannelToShow(item))}
                  >
                    <span className="sr-only">Preview Channel</span>
                    <PreviewIcon />
                  </button>


                  <button
                    className="hover:text-red-500"
                    onClick={() => dispatch(setChannelToDelete(item))}
                  >
                    <span className="sr-only">Delete Channel</span>
                    <TrashIcon />
                  </button>

                  <button
                    className="hover:text-primary"
                    onClick={() => dispatch(setSelectedChannel(item))}
                  >
                    <span className="sr-only">Edit Channel</span>
                    <PencilSquareIcon />
                  </button>



                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      <EditChannelModal />
      <DeleteChannelModal />
      <ShowChannelModal />  
    </div>
  );
}
