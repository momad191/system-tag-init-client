"use client";

import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { OutcomesTable } from "@/components/Tables/outcomes-table";
import { Button } from "@/components/ui-elements/button";
import { PlusIcon } from "@/assets/icons";
import AddOutcomeModal from "./AddOutcomeModal";

const OutcomesPage = () => {
  const [open, setOpen] = useState(false);

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
        onClick={() => setOpen(true)}
      />

      <AddOutcomeModal open={open} onClose={() => setOpen(false)} />

      <div className="space-y-10">
        <OutcomesTable />
      </div>
    </>
  );
};

export default OutcomesPage;
