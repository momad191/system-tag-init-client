import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { UsersTable } from "@/components/Tables/users-table";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Users",
}; 
const UsersPage = () => {
  return (
    <>
      <Breadcrumb pageName="Users" />
      <div className="space-y-10">
        <UsersTable />
      </div>
    </>
  );
};
export default UsersPage; 
