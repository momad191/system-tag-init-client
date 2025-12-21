"use client";

import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { UsersTable } from "@/components/Tables/users-table";
// import { Metadata } from "next";
import { Button } from "@/components/ui-elements/button";
import { PlusIcon } from "@/assets/icons";
import { AddUserModal } from "./AddUserModal";

// export const metadata: Metadata = {
//   title: "Users",
// };

const UsersPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Breadcrumb pageName="Users" />
      <Button
        className="mb-6"
        label="Add user"
        variant="green"
        shape="full"
        size="small"
        icon={<PlusIcon />}
        onClick={() => setIsModalOpen(true)}
      />

      <div className="space-y-10">
        <UsersTable /> 
      </div>

      <AddUserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default UsersPage;
