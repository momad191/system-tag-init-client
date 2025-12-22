'use client'
import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { PlansTable } from "@/components/Tables/plans-table";
import { Button } from "@/components/ui-elements/button";
import { PlusIcon } from "@/assets/icons";
import AddPlanModal from "@/app/plans/AddPlanModal";
const PlansPage = () => {

  const [open, setOpen] = useState(false);

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
        onClick={() => setOpen(true)}
      />
      <div className="space-y-10">
        <PlansTable />
      </div>
      <AddPlanModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};
export default PlansPage;
