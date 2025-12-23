"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";

import type { RootState, AppDispatch } from "@/lib/store";
import { fetchCategories } from "@/lib/features/categorySlice";

import { TrashIcon, PencilSquareIcon } from "@/assets/icons";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DownloadIcon, PreviewIcon } from "./icons";

import EditCategoryModal from "@/app/settings/categories/EditCategoryModal";
import { setCategoryToEdit } from "@/lib/features/categorySlice";
import DeleteCategoryModal from "@/app/settings/categories/DeleteCategoryModal";
import ShowCategoryModal from "@/app/settings/categories/ShowCategoryModal";

export function CategoriesTable() {
  const dispatch = useDispatch<AppDispatch>();

  const { categories, loading, error } = useSelector(
    (state: RootState) => state.categories,
  );

  /* ----------------------------------
     Fetch categories
  ----------------------------------- */
  useEffect(() => {
    dispatch(fetchCategories({ page: 1, limit: 10 }));
  }, [dispatch]);

  /* ----------------------------------
     Handlers
  ----------------------------------- */
  const handleEdit = (id: string) => {
    dispatch(setCategoryToEdit(id));
    setEditOpen(true);
  };

  const handleDelete = (id: string) => {
    dispatch(setCategoryToEdit(id));
    setDeleteOpen(true);
  };

  const handleShow = (id: string) => {
    dispatch(setCategoryToEdit(id));
    setShowOpen(true);
  };

  /* ----------------------------------
     States
  ----------------------------------- */

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [showOpen, setShowOpen] = useState(false);

  if (loading) {
    return (
      <div className="rounded-[10px] border bg-white p-6 text-center">
        Loading categories...
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
            <TableHead className="min-w-[155px] xl:pl-7.5">
              Description
            </TableHead>
            <TableHead className="min-w-[155px] xl:pl-7.5">
              Color Code
            </TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right xl:pr-7.5">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {categories.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="py-6 text-center">
                No categories found
              </TableCell>
            </TableRow>
          )}

          {categories.map((item) => (
            <TableRow
              key={item._id}
              className="border-[#eee] dark:border-dark-3"
            >
              <TableCell className="min-w-[155px] xl:pl-7.5">
                <h5 className="text-dark dark:text-white">{item.name}</h5>
              </TableCell>

              <TableCell className="min-w-[155px] xl:pl-7.5">
                <h5 className="text-dark dark:text-white">
                  {item.description}
                </h5>
              </TableCell>

              <TableCell className="min-w-[155px] xl:pl-7.5">
                <span
                  className="inline-block rounded px-2 py-1 text-xs text-white"
                  style={{ backgroundColor: item.color_code }}
                >
                  {item.color_code}
                </span>
              </TableCell>

              <TableCell>
                <p className="text-dark dark:text-white">
                  {dayjs(item.createdAt).format("MMM DD, YYYY")}
                </p>
              </TableCell>

              <TableCell className="xl:pr-7.5">
                <div className="flex items-center justify-end gap-x-3.5">
                  <button
                    onClick={() => handleEdit(item._id)}
                    className="hover:text-primary"
                  >
                    <PencilSquareIcon />
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="hover:text-danger"
                  >
                    <TrashIcon />
                  </button>

                  <button
                    onClick={() => handleShow(item._id)}
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

      <EditCategoryModal open={editOpen} onClose={() => setEditOpen(false)} />
      <DeleteCategoryModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
      />

      <ShowCategoryModal open={showOpen} onClose={() => setShowOpen(false)} />
    </div>
  );
}
