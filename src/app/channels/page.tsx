'use client';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { ChannelsTable } from "@/components/Tables/channels-table";

import { Button } from "@/components/ui-elements/button";
import { PlusIcon } from "@/assets/icons";
import { useState } from "react";
import AddChannelModal from "./AddChannelModal";
import Cookies from "js-cookie";

const ChannelsPage = () => {
  const [open, setOpen] = useState(false);
  const user_id = Cookies.get("userId") || "";
  return (
    <>
      <Breadcrumb pageName="Channels" />
      <Button
        className="mb-6"
        label="Add Channel"
        variant="green"
        shape="full"
        size="small"
        icon={<PlusIcon />}
        onClick={() => setOpen(true)}
      />
      <div className="space-y-10">
        <ChannelsTable />
      </div>
      <AddChannelModal
        open={open}
        onClose={() => setOpen(false)}
        userId={user_id}
      />;
    </>
  );
};
export default ChannelsPage; 
