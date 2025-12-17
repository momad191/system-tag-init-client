import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { TicketsTable } from "@/components/Tables/tickets-table";
import { Metadata } from "next";
import { Button } from "@/components/ui-elements/button";
import { PlusIcon } from "@/assets/icons";
export const metadata: Metadata = {
  title: "conversations",
};
const ConversationsPage = () => {
  return (
    <>
      <Breadcrumb pageName="Conversations" />
      <Button
        className="mb-6"
        label="Create new conversation"
        variant="green"
        shape="full"
        size="small"
        icon={<PlusIcon />}
      />
      <div className="space-y-10">
        <TicketsTable />
      </div>
    </>
  );
};
export default ConversationsPage;
