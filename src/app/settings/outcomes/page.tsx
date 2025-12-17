import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { OutcomesTable } from "@/components/Tables/outcomes-table";
import { Metadata } from "next";
import { Button } from "@/components/ui-elements/button";
import { PlusIcon } from "@/assets/icons";
export const metadata: Metadata = {
  title: "Outcomes",
};
const OutcomesPage = () => {
  return (
    <>
      <Breadcrumb pageName="outcomes" />
      <Button
        className="mb-6"
        label="Add outcomes"
        variant="green"
        shape="full"
        size="small"
        icon={<PlusIcon />}
      />
      <div className="space-y-10">
        <OutcomesTable />
      </div>
    </>
  );
};
export default OutcomesPage;
