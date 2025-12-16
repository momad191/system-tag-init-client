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
import { getTeamsTableData } from "./fetch";
import { DownloadIcon, PreviewIcon } from "./icons";

export async function TeamsTable() {
    const data = await getTeamsTableData();

    return (
        <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
            <Table>
                <TableHeader>
                    <TableRow className="border-none bg-[#F7F9FC] dark:bg-dark-2 [&>th]:py-4 [&>th]:text-base [&>th]:text-dark [&>th]:dark:text-white">
                        <TableHead className="min-w-[155px] xl:pl-7.5">Name</TableHead>
                        <TableHead className="min-w-[155px] xl:pl-7.5">channels</TableHead>
                        <TableHead className="min-w-[155px] xl:pl-7.5">members</TableHead>
                        <TableHead> createdAt</TableHead>
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
                                <h5 className="text-dark dark:text-white">{item.channels}</h5>
                            </TableCell>
                            <TableCell className="min-w-[155px] xl:pl-7.5">
                                <h5 className="text-dark dark:text-white">{item.members}</h5>
                            </TableCell>

                            <TableCell>
                                <p className="text-dark dark:text-white">
                                    {dayjs(item.createdAt).format("MMM DD, YYYY")}
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
