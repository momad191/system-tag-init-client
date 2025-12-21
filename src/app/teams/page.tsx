"use client";
import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { TeamsTable } from "@/components/Tables/teams-table";

import { Button } from "@/components/ui-elements/button";
import { PlusIcon } from "@/assets/icons";
import AddTeamModal from "./AddTeamModal";

const TeamsPage = () => {

  const [open, setOpen] = useState(false);

  return (
    <>
      <Breadcrumb pageName="Teams" />
      <Button
        className="mb-6"
        label="Add team"
        variant="green"
        shape="full"
        size="small"
        icon={<PlusIcon />}
        onClick={() => setOpen(true)}
      />
      <div className="space-y-10">
        <TeamsTable />
      </div>
      <AddTeamModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};
export default TeamsPage;
