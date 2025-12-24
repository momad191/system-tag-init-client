"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { RootState, AppDispatch } from "@/lib/store";

import { fetchOutcomes, deleteOutcome } from "@/lib/features/outcomeSlice";
import type { Outcome } from "@/lib/features/outcomeSlice";

import { TrashIcon, PencilSquareIcon } from "@/assets/icons";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import EditOutcomeModal from "@/app/settings/outcomes/EditOutcomeModal";
import DeleteOutcomeModal from "@/app/settings/outcomes/DeleteOutcomeModal";

export function OutcomesTable() {
  const dispatch = useDispatch<AppDispatch>();

  const { outcomes, loading, error } = useSelector(
    (state: RootState) => state.outcomes,
  );

  const [editOpen, setEditOpen] = useState(false);
  const [selectedOutcome, setSelectedOutcome] = useState<Outcome | null>(null);

  const [deleteOpen, setDeleteOpen] = useState(false);

  /* ----------------------------------
     Fetch outcomes on mount
  ----------------------------------- */
  useEffect(() => {
    dispatch(fetchOutcomes({ page: 1, limit: 10 }));
  }, [dispatch]);

  /* ----------------------------------
     Delete handler
  ----------------------------------- */
  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this outcome?")) {
      dispatch(deleteOutcome(id));
    }
  };

  /* ----------------------------------
     Loading / Error states
  ----------------------------------- */
  if (loading) {
    return (
      <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-dark">
        Loading outcomes...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-danger rounded-lg bg-white p-6 shadow dark:bg-gray-dark">
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
            <TableHead className="min-w-[155px] xl:pl-7.5">
              Description
            </TableHead>
            <TableHead className="text-right xl:pr-7.5">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {outcomes.length === 0 && (
            <TableRow>
              <TableCell colSpan={3} className="py-6 text-center text-gray-500">
                No outcomes found
              </TableCell>
            </TableRow>
          )}

          {outcomes.map((item) => (
            <TableRow
              key={item._id}
              className="border-[#eee] dark:border-dark-3"
            >
              <TableCell className="min-w-[155px] xl:pl-7.5">
                <h5 className="text-dark dark:text-white">{item.name}</h5>
              </TableCell>

              <TableCell className="min-w-[155px] xl:pl-7.5">
                <p className="text-dark dark:text-white">{item.description}</p>
              </TableCell>

              <TableCell className="xl:pr-7.5">
                <div className="flex items-center justify-end gap-x-3.5">
                  <button
                    onClick={() => {
                      setSelectedOutcome(item);
                      setEditOpen(true);
                    }}
                    className="hover:text-primary"
                  >
                    <span className="sr-only">Edit</span>
                    <PencilSquareIcon />
                  </button>

                  <button
                    onClick={() => {
                      setSelectedOutcome(item);
                      setDeleteOpen(true);
                    }}
                    className="hover:text-danger"
                  >
                    <span className="sr-only">Delete</span>
                    <TrashIcon />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <EditOutcomeModal
        open={editOpen}
        outcome={selectedOutcome}
        onClose={() => {
          setEditOpen(false);
          setSelectedOutcome(null);
        }}
      />

      <DeleteOutcomeModal
        open={deleteOpen}
        outcome={selectedOutcome}
        onClose={() => {
          setDeleteOpen(false);
          setSelectedOutcome(null);
        }}
      />
    </div>
  );
}
