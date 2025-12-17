import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { PlansTable } from "@/components/Tables/plans-table";
import { Metadata } from "next";
import { Button } from "@/components/ui-elements/button";
import { PlusIcon } from "@/assets/icons";
export const metadata: Metadata = {
  title: "Plans",
};
const PlansPage = () => {
  return (
    <>
      <Breadcrumb pageName="Plans" />
      <Button
        className="mb-6"
        label="Add plan"
        variant="green"
        shape="full"
        size="small"
        icon={<PlusIcon />}
      />
      <div className="space-y-10">
        <PlansTable />
      </div>
    </>
  );
};
export default PlansPage;
