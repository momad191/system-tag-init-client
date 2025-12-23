"use client";
import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { CategoriesTable } from "@/components/Tables/categories-table";
import { Button } from "@/components/ui-elements/button";
import { PlusIcon } from "@/assets/icons";
import AddCategoryModal from "./AddCategoryModal";

const CategoriesPage = () => {
  const [isAddOpen, setIsAddOpen] = useState(false);

  return (
    <>
      <Breadcrumb pageName="Categories" />

      <Button
        className="mb-6"
        label="Add categories"
        variant="green"
        shape="full"
        size="small"
        icon={<PlusIcon />}
        onClick={() => setIsAddOpen(true)}
      />

      <div className="space-y-10">
        <CategoriesTable />
      </div>

      {/* Add Category Modal */}
      {isAddOpen && <AddCategoryModal onClose={() => setIsAddOpen(false)} />}
    </>
  );
};

export default CategoriesPage;
