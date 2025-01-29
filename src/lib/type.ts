import { ColumnDef } from "@tanstack/react-table";
import { type LucideIcon } from "lucide-react";
import { ReactNode } from "react";

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  colName: string;
  placeholder?: string;
  children?: ReactNode;
}

export type PredictionResult = {
  id: string;
  timestamp: string;
  icNo: string;
  result?: string;
};

export type User = {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
};

export type NavUserProps = {
  name: string;
  email: string;
  avatar: string;
};

export type NavLinkProps = {
  title: string;
  url: string;
  icon: LucideIcon;
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
  }[];
};

export type UploadFiles = {
  preview?: string;
  name?: string;
};

export type Birads = {
  name: string;
  prediction: PieBiards[];
  highest: number;
};

export type PieBiards = {
  birad: string;
  accuracy: number;
  fill?: string;
};
