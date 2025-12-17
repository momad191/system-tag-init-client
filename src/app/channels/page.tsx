import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { ChannelsTable } from "@/components/Tables/channels-table";
import { Metadata } from "next";
import { Button } from "@/components/ui-elements/button";
import { PlusIcon } from "@/assets/icons";
export const metadata: Metadata = {
  title: "Channels",
};
const ChannelsPage = () => {
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
      />
      <div className="space-y-10">
        <ChannelsTable />
      </div>
    </>
  );
};
export default ChannelsPage;
