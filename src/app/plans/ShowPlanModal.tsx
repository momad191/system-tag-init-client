"use client";

import React from "react";
import { Plan } from "@/lib/features/planSlice";
import { XIcon } from "@/assets/icons"; // replace with your close icon path
import dayjs from "dayjs";

interface ShowPlanModalProps {
  plan: Plan;
  onClose: () => void;
}

const ShowPlanModal: React.FC<ShowPlanModalProps> = ({ plan, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg dark:bg-gray-dark">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-dark dark:text-white">
            Plan Details
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white">
            <XIcon />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-2">
          <div>
            <strong>Name:</strong> {plan.name}
          </div>
          <div>
            <strong>Price:</strong> {plan.price}
          </div>
          <div>
            <strong>Period:</strong> {plan.period}
          </div>
          <div>
            <strong>Max Users:</strong> {plan.maxUsers}
          </div>
          <div>
            <strong>Max WhatsApp:</strong> {plan.maxWhatsApp}
          </div>
          <div>
            <strong>Max Emails:</strong> {plan.maxEmails}
          </div>
          <div>
            <strong>Max Direct Messages:</strong> {plan.maxDirectMessages}
          </div>
          <div>
            <strong>Start Date:</strong>{" "}
            {plan.start_date ? dayjs(plan.start_date).format("MMM DD, YYYY") : "-"}
          </div>
          <div>
            <strong>End Date:</strong>{" "}
            {plan.end_date ? dayjs(plan.end_date).format("MMM DD, YYYY") : "-"}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/80"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowPlanModal;
