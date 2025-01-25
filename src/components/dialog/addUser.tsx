import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { User } from "@/lib/type";
import UserForm from "../form";
import { CirclePlus } from "lucide-react";

export function AddUser() {
  async function add() {
    console.log("");
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          User
          <CirclePlus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add user</DialogTitle>
          <DialogDescription>Click submit when you're done.</DialogDescription>
        </DialogHeader>
        <UserForm />
        <DialogFooter>
          <Button type="submit" onClick={add}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
