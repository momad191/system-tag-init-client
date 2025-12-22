"use client";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { X } from "lucide-react";

import type { RootState, AppDispatch } from "@/lib/store";
import {
  updateContact,
  clearCurrentContact,
} from "@/lib/features/contactSlice";

export default function EditContactModal() {
  const dispatch = useDispatch<AppDispatch>();
  const modalRef = useRef<HTMLDivElement>(null);

  const { currentContact, loading } = useSelector(
    (state: RootState) => state.contacts,
  );

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");

  /* ----------------------------------
     Populate form on open
  ----------------------------------- */
  useEffect(() => {
    if (currentContact) {
      setName(currentContact.name);
      setMobile(currentContact.mobile);
      setEmail(currentContact.email);
    }
  }, [currentContact]);

  /* ----------------------------------
     Close modal
  ----------------------------------- */
  const closeModal = () => {
    dispatch(clearCurrentContact());
  };

  /* ----------------------------------
     Click outside to close
  ----------------------------------- */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        closeModal();
      }
    };

    if (currentContact) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [currentContact]);

  /* ----------------------------------
     Submit
  ----------------------------------- */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentContact) return;

    dispatch(
      updateContact({
        id: currentContact._id,
        body: { name, mobile, email },
      }),
    ).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        closeModal();
      }
    });
  };

  if (!currentContact) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div
        ref={modalRef}
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg dark:bg-gray-dark"
      >
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-dark dark:text-white">
            Edit Contact
          </h3>

          <button
            onClick={closeModal}
            className="rounded-md p-1 hover:bg-gray-100 dark:hover:bg-dark-2"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Full Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-md border px-3 py-2 text-sm focus:border-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Mobile</label>
            <input
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
              className="w-full rounded-md border px-3 py-2 text-sm focus:border-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-md border px-3 py-2 text-sm focus:border-primary focus:outline-none"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={closeModal}
              className="rounded-md border px-4 py-2 text-sm"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-primary px-4 py-2 text-sm text-white hover:opacity-90 disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
