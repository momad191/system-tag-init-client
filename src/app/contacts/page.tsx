"use client";
import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { ContactsTable } from "@/components/Tables/contacts-table";
import { Button } from "@/components/ui-elements/button";
import { PlusIcon } from "@/assets/icons";
import AddContactModal from "./AddContactModal";

const ContactsPage = () => {
  const [open, setOpen] = useState(false);

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
        onClick={() => setOpen(true)}
      />

      <div className="space-y-10">
        <ContactsTable />
      </div>
      <AddContactModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};
export default ContactsPage;
