import { TrashIcon } from "@/assets/icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import { getPlansTableData } from "./fetch";
import { DownloadIcon, PreviewIcon } from "./icons";

export async function PlansTable() {
  const data = await getPlansTableData();

  return (
    <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
      <Table>
        <TableHeader>
          <TableRow className="border-none bg-[#F7F9FC] dark:bg-dark-2 [&>th]:py-4 [&>th]:text-base [&>th]:text-dark [&>th]:dark:text-white">
            <TableHead className="min-w-[155px] xl:pl-7.5">name</TableHead>
            <TableHead className="min-w-[155px] xl:pl-7.5">price</TableHead>
            <TableHead className="min-w-[155px] xl:pl-7.5">period</TableHead>
            <TableHead className="min-w-[155px] xl:pl-7.5">maxUsers</TableHead>
            <TableHead className="min-w-[155px] xl:pl-7.5">maxTeams</TableHead>
            <TableHead className="min-w-[155px] xl:pl-7.5">
              maxWhatsApp
            </TableHead>
            <TableHead className="min-w-[155px] xl:pl-7.5">maxEmails</TableHead>
            <TableHead className="min-w-[155px] xl:pl-7.5">
              maxDirectMessages
            </TableHead>
            <TableHead> Start Date</TableHead>
            <TableHead>end Date</TableHead>
            <TableHead className="text-right xl:pr-7.5">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index} className="border-[#eee] dark:border-dark-3">
              <TableCell className="min-w-[155px] xl:pl-7.5">
                <h5 className="text-dark dark:text-white">{item.name}</h5>
              </TableCell>

              <TableCell className="min-w-[155px] xl:pl-7.5">
                <h5 className="text-dark dark:text-white">{item.price}</h5>
              </TableCell>
              <TableCell className="min-w-[155px] xl:pl-7.5">
                <h5 className="text-dark dark:text-white">{item.period}</h5>
              </TableCell>
              <TableCell className="min-w-[155px] xl:pl-7.5">
                <h5 className="text-dark dark:text-white">{item.maxUsers}</h5>
              </TableCell>
              <TableCell className="min-w-[155px] xl:pl-7.5">
                <h5 className="text-dark dark:text-white">{item.maxTeams}</h5>
              </TableCell>
              <TableCell className="min-w-[155px] xl:pl-7.5">
                <h5 className="text-dark dark:text-white">
                  {item.maxWhatsApp}
                </h5>
              </TableCell>

              <TableCell className="min-w-[155px] xl:pl-7.5">
                <h5 className="text-dark dark:text-white">{item.maxEmails}</h5>
              </TableCell>

              <TableCell className="min-w-[155px] xl:pl-7.5">
                <h5 className="text-dark dark:text-white">
                  {item.maxDirectMessages}
                </h5>
              </TableCell>

              <TableCell>
                <p className="text-dark dark:text-white">
                  {dayjs(item.start_date).format("MMM DD, YYYY")}
                </p>
              </TableCell>
              <TableCell>
                <p className="text-dark dark:text-white">
                  {dayjs(item.end_date).format("MMM DD, YYYY")}
                </p>
              </TableCell>

              <TableCell className="xl:pr-7.5">
                <div className="flex items-center justify-end gap-x-3.5">
                  <button className="hover:text-primary">
                    <span className="sr-only">View Invoice</span>
                    <PreviewIcon />
                  </button>

                  <button className="hover:text-primary">
                    <span className="sr-only">Delete Invoice</span>
                    <TrashIcon />
                  </button>

                  <button className="hover:text-primary">
                    <span className="sr-only">Download Invoice</span>
                    <DownloadIcon />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
