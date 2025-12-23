"use client";
import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { RepliesTable } from "@/components/Tables/replies-table";
import { Button } from "@/components/ui-elements/button";
import { PlusIcon } from "@/assets/icons";
import AddReplyModal from "./AddReplyModal";

const RepliesPage = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Breadcrumb pageName="Replies" />
      <Button
        className="mb-6"
        label="Add replies"
        variant="green"
        shape="full"
        size="small"
        icon={<PlusIcon />}
        onClick={() => setOpen(true)}
      />
      <div className="space-y-10">
        <RepliesTable />
      </div>
      <AddReplyModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};
export default RepliesPage;
