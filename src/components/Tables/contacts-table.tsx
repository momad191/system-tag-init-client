"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";

import type { RootState, AppDispatch } from "@/lib/store";
import {
  fetchContacts,
  deleteContact,
  fetchContactById,
} from "@/lib/features/contactSlice";

import { TrashIcon } from "@/assets/icons";
import { PencilSquareIcon } from "@/assets/icons";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import EditContactModal from "@/app/contacts/EditContactModal";

import { setContactToDelete } from "@/lib/features/contactSlice";
import DeleteContactModal from "@/app/contacts/DeleteContactModal";

export function ContactsTable() {
  const dispatch = useDispatch<AppDispatch>();

  const { contacts, loading, error, page, limit } = useSelector(
    (state: RootState) => state.contacts,
  );

  /* ----------------------------------
     Fetch contacts
  ----------------------------------- */
  useEffect(() => {
    dispatch(fetchContacts({ page: 1, limit: 10 }));
  }, [dispatch]);

  /* ----------------------------------
     Handlers
  ----------------------------------- */
  const handlePreview = (id: string) => {
    dispatch(fetchContactById(id));
  };

  const handleDelete = (contact: any) => {
    dispatch(setContactToDelete(contact));
  };

  /* ----------------------------------
     States
  ----------------------------------- */
  if (loading) {
    return (
      <div className="rounded-[10px] border bg-white p-6 text-center">
        Loading contacts...
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
            <TableHead className="min-w-[155px] xl:pl-7.5">Mobile</TableHead>
            <TableHead className="min-w-[155px] xl:pl-7.5">Email</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right xl:pr-7.5">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {contacts.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="py-6 text-center">
                No contacts found
              </TableCell>
            </TableRow>
          )}

          {contacts.map((contact) => (
            <TableRow
              key={contact._id}
              className="border-[#eee] dark:border-dark-3"
            >
              <TableCell className="min-w-[155px] xl:pl-7.5">
                <h5 className="text-dark dark:text-white">{contact.name}</h5>
              </TableCell>

              <TableCell className="min-w-[155px] xl:pl-7.5">
                {contact.mobile}
              </TableCell>

              <TableCell className="min-w-[155px] xl:pl-7.5">
                {contact.email}
              </TableCell>

              <TableCell>
                {dayjs(contact.createdAt).format("MMM DD, YYYY")}
              </TableCell>

              <TableCell className="xl:pr-7.5">
                <div className="flex items-center justify-end gap-x-3.5">
                  <button
                    className="hover:text-primary"
                    onClick={() => handlePreview(contact._id)}
                  >
                    <span className="sr-only">Edit Channel</span>
                    <PencilSquareIcon />
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(contact)}
                    className="hover:text-danger"
                  >
                    <span className="sr-only">Delete</span>
                    <TrashIcon />
                  </button>

                  {/* Start conversation */}
                  <button className="text-sm font-medium text-primary">
                    Start conversation
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <EditContactModal />
      <DeleteContactModal />
    </div>
  );
}
