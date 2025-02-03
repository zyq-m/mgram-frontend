import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { PredictionResult } from "@/lib/type";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import FilterResult from "./resultFilter";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import { api } from "@/utils/axios";
import dayjs from "dayjs";

export default function ResultTable({
  showResult = false,
}: {
  showResult?: boolean;
}) {
  const [data, setData] = useState<PredictionResult[]>([]);
  const [date, setDate] = useState<string>("");
  const columns: ColumnDef<PredictionResult>[] = [
    {
      id: "no",
      header: "No.",
      cell: ({ row }) => <div>{row.index + 1}</div>,
    },
    {
      accessorKey: "icNo",
      header: "IC Number",
    },
    {
      accessorKey: "timestamp",
      header: "Timestamp",
    },
    showResult
      ? {
          accessorKey: "result",
          header: "Result",
        }
      : {
          id: "hide",
        },
    {
      id: "action",
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Link to={`/app/result/${row.original.id}`}>
                  View prediction
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  useEffect(() => {
    api.get("/predict", { params: { timestamp: date } }).then((res) => {
      setData(res.data);
    });
  }, [date]);

  return (
    <DataTable
      columns={columns}
      data={data}
      colName="icNo"
      placeholder="Search for IC No."
    >
      <FilterResult onDate={(d) => setDate(dayjs(d).format("YYYY-MM-DD"))} />
    </DataTable>
  );
}
