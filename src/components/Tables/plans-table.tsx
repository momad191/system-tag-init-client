"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";

import type { RootState, AppDispatch } from "@/lib/store";
import { fetchPlans } from "@/lib/features/planSlice";

import { TrashIcon, PencilSquareIcon } from "@/assets/icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


import { PreviewIcon } from "./icons";

import EditPlanModal from "@/app/plans/EditPlanModal";
import DeletePlanModal from "@/app/plans/DeletePlanModal";
import ShowPlanModal from "@/app/plans/ShowPlanModal";

export function PlansTable() {
  const dispatch = useDispatch<AppDispatch>();

  const { plans, loading, error } = useSelector(
    (state: RootState) => state.plans,
  );

  /* ----------------------------------
     Local state
  ----------------------------------- */
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [isShowOpen, setIsShowOpen] = useState(false);

  /* ----------------------------------
     Fetch plans
  ----------------------------------- */
  useEffect(() => {
    dispatch(fetchPlans({ page: 1, limit: 10 }));
  }, [dispatch]);

  /* ----------------------------------
     Handlers
  ----------------------------------- */
  const handleEdit = (plan: any) => {
    setSelectedPlan(plan);
    setIsEditOpen(true);
  };

  const handleDeleteClick = (plan: any) => {
    setSelectedPlan(plan);
    setIsDeleteOpen(true);
  };


  const handleShow = (plan: any) => {
    setSelectedPlan(plan);
    setIsShowOpen(true);
  };

  /* ----------------------------------
     States
  ----------------------------------- */
  if (loading) {
    return (
      <div className="rounded-[10px] border bg-white p-6 text-center">
        Loading plans...
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
    <>
      <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
        <Table>
          <TableHeader>
            <TableRow className="border-none bg-[#F7F9FC] dark:bg-dark-2 [&>th]:py-4 [&>th]:text-base [&>th]:text-dark [&>th]:dark:text-white">
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Period</TableHead>
              <TableHead>Max Users</TableHead>
              <TableHead>Max WhatsApp</TableHead>
              <TableHead>Max Emails</TableHead>
              <TableHead>Max Direct Messages</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {plans.length === 0 && (
              <TableRow>
                <TableCell colSpan={10} className="py-6 text-center">
                  No plans found
                </TableCell>
              </TableRow>
            )}

            {plans.map((plan) => (
              <TableRow key={plan._id}>
                <TableCell>{plan.name}</TableCell>
                <TableCell>{plan.price}</TableCell>
                <TableCell>{plan.period}</TableCell>
                <TableCell>{plan.maxUsers}</TableCell>
                <TableCell>{plan.maxWhatsApp}</TableCell>
                <TableCell>{plan.maxEmails}</TableCell>
                <TableCell>{plan.maxDirectMessages}</TableCell>
                <TableCell>
                  {plan.start_date
                    ? dayjs(plan.start_date).format("MMM DD, YYYY")
                    : "-"}
                </TableCell>
                <TableCell>
                  {plan.end_date
                    ? dayjs(plan.end_date).format("MMM DD, YYYY")
                    : "-"}
                </TableCell>

                <TableCell className="text-right">
                  <div className="flex justify-end gap-3">
                    {/* Edit */}
                    <button
                      onClick={() => handleEdit(plan)}
                      className="hover:text-primary"
                    >
                      <PencilSquareIcon />
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => handleDeleteClick(plan)}
                      className="hover:text-danger"
                    >
                      <TrashIcon />
                    </button>

                    {/* Show Plan Details */}
                    <button
                      onClick={() => handleShow(plan)}
                      className="hover:text-primary"
                    >
                      <PreviewIcon />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* -----------------------------
          Edit Modal
      ------------------------------ */}
      {isEditOpen && selectedPlan && (
        <EditPlanModal
          plan={selectedPlan}
          onClose={() => {
            setIsEditOpen(false);
            setSelectedPlan(null);
          }}
        />
      )}

      {/* -----------------------------
          Delete Modal
      ------------------------------ */}
      {isDeleteOpen && selectedPlan && (
        <DeletePlanModal
          planId={selectedPlan._id}
          planName={selectedPlan.name}
          onClose={() => {
            setIsDeleteOpen(false);
            setSelectedPlan(null);
          }}
        />
      )}

      {/* -----------------------------
    Show Plan Modal
------------------------------ */}
      {isShowOpen && selectedPlan && (
        <ShowPlanModal
          plan={selectedPlan}
          onClose={() => {
            setIsShowOpen(false);
            setSelectedPlan(null);
          }}
        />
      )}

    </>
  );
}
