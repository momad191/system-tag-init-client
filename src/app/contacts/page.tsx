import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { ContactsTable } from "@/components/Tables/contacts-table";
import { Metadata } from "next";
import { Button } from "@/components/ui-elements/button";
import { PlusIcon } from "@/assets/icons";
export const metadata: Metadata = {
  title: "Contacts",
};
const ContactsPage = () => {
  return (
    <>
      <Breadcrumb pageName="Contacts" />
      <Button
        className="mb-6"
        label="Add contact"
        variant="green"
        shape="full"
        size="small"
        icon={<PlusIcon />}
      />
      <div className="space-y-10">
        <ContactsTable />
      </div>
    </>
  );
};
export default ContactsPage;
