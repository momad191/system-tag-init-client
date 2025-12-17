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
import { getTicketsTableData } from "./fetch";
import { DownloadIcon, PreviewIcon } from "./icons";

export async function TicketsTable() {
  const data = await getTicketsTableData();

  return (
    <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
      <Table>
        <TableHeader>
          <TableRow className="border-none bg-[#F7F9FC] dark:bg-dark-2 [&>th]:py-4 [&>th]:text-base [&>th]:text-dark [&>th]:dark:text-white">
            <TableHead className="min-w-[155px] xl:pl-7.5">channel</TableHead>
            <TableHead className="min-w-[155px] xl:pl-7.5">title</TableHead>
            <TableHead className="min-w-[155px] xl:pl-7.5">
              description
            </TableHead>
            <TableHead className="min-w-[155px] xl:pl-7.5">status</TableHead>
            <TableHead className="min-w-[155px] xl:pl-7.5">assignee</TableHead>
            <TableHead className="min-w-[155px] xl:pl-7.5">team</TableHead>
            <TableHead> Date</TableHead>
            <TableHead className="min-w-[155px] xl:pl-7.5">priority</TableHead>
            <TableHead className="text-right xl:pr-7.5">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index} className="border-[#eee] dark:border-dark-3">
              <TableCell className="min-w-[155px] xl:pl-7.5">
                <h5 className="text-dark dark:text-white">{item.channelId}</h5>
              </TableCell>

              <TableCell className="min-w-[155px] xl:pl-7.5">
                <h5 className="text-dark dark:text-white">{item.title}</h5>
              </TableCell>

              <TableCell className="min-w-[155px] xl:pl-7.5">
                <h5 className="text-dark dark:text-white">
                  {item.description}
                </h5>
              </TableCell>

              <TableCell className="min-w-[155px] xl:pl-7.5">
                <h5 className="text-dark dark:text-white">{item.status}</h5>
              </TableCell>
              <TableCell className="min-w-[155px] xl:pl-7.5">
                <h5 className="text-dark dark:text-white">{item.assignee}</h5>
              </TableCell>
              <TableCell className="min-w-[155px] xl:pl-7.5">
                <h5 className="text-dark dark:text-white">{item.team}</h5>
              </TableCell>

              <TableCell>
                <p className="text-dark dark:text-white">
                  {dayjs(item.createdAt).format("MMM DD, YYYY")}
                </p>
              </TableCell>

              <TableCell>
                <div
                  className={cn(
                    "max-w-fit rounded-full px-3.5 py-1 text-sm font-medium",
                    {
                      "bg-[#219653]/[0.08] text-[#219653]":
                        item.priority === "High",
                      "bg-[#D34053]/[0.08] text-[#D34053]":
                        item.priority === "Low",
                      "bg-[#F2994A]/[0.08] text-[#F2994A]":
                        item.priority === "Medium",
                      "bg-[#F2994A]/[0.08] text-[#f700c1]":
                        item.priority === "Urgent",
                    },
                  )}
                >
                  {item.priority}
                </div>
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
