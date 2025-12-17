import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { RepliesTable } from "@/components/Tables/replies-table";
import { Metadata } from "next";
import { Button } from "@/components/ui-elements/button";
import { PlusIcon } from "@/assets/icons";
export const metadata: Metadata = {
  title: "Replies",
};
const RepliesPage = () => {
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
      />
      <div className="space-y-10">
        <RepliesTable />
      </div>
    </>
  );
};
export default RepliesPage;
