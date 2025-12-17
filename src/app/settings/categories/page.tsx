import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { CategoriesTable } from "@/components/Tables/categories-table";
import { Metadata } from "next";
import { Button } from "@/components/ui-elements/button";
import { PlusIcon } from "@/assets/icons";
export const metadata: Metadata = {
  title: "Categories",
};
const CategoriesPage = () => {
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
      />
      <div className="space-y-10">
        <CategoriesTable />
      </div>
    </>
  );
};
export default CategoriesPage;
