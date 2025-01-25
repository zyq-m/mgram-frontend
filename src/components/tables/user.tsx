import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { User } from "@/lib/type";
import { ColumnDef } from "@tanstack/react-table";
import { CirclePlus, MoreHorizontal } from "lucide-react";
import { EditUser } from "../dialog/editUser";
import { AddUser } from "../dialog/addUser";
import { DeleteUser } from "../dialog/deleteUser";

const result: User[] = [
  {
    id: "1",
    email: "email@gmail.com",
    name: "Fulan",
    phone: "999",
  },
  {
    id: "2",
    email: "email@gmail.com",
    name: "Fulan",
    phone: "999",
  },
  {
    id: "3",
    email: "email@gmail.com",
    name: "Fulan",
    phone: "999",
  },
  {
    id: "4",
    email: "email@gmail.com",
    name: "Fulan",
    phone: "999",
  },
];

const columns: ColumnDef<User>[] = [
  {
    id: "no",
    header: "No.",
    cell: ({ row }) => <div>{row.index + 1}</div>,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    id: "action",
    header: "Action",
    cell: ({ row }) => {
      return (
        <div className="space-x-2">
          <EditUser {...row.original} />
          <DeleteUser {...row.original} />
        </div>
      );
    },
  },
];

export default function UserTable() {
  return (
    <DataTable
      columns={columns}
      data={result}
      colName="name"
      placeholder="Search for name"
    >
      <AddUser />
    </DataTable>
  );
}
