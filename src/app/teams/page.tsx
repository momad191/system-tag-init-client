 import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { TeamsTable } from "@/components/Tables/teams-table"; 
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Users",
}; 
const TeamsPage = () => { 
  return (
    <>
      <Breadcrumb pageName="Teams" />
      <div className="space-y-10">
        <TeamsTable />
      </div>
    </>
  );
};
export default TeamsPage; 
