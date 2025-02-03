import { DataTable } from "@/components/data-table";

import { User } from "@/lib/type";
import { ColumnDef } from "@tanstack/react-table";
import { EditUser } from "../dialog/editUser";
import { AddUser } from "../dialog/addUser";
import { DeleteUser } from "../dialog/deleteUser";
import { useEffect, useState } from "react";
import { api } from "@/utils/axios";

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
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    api
      .get("/auth/user")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <DataTable
      columns={columns}
      data={users}
      colName="name"
      placeholder="Search for name"
    >
      <AddUser />
    </DataTable>
  );
}
