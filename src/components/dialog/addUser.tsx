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
import UserForm from "../form";
import { CirclePlus } from "lucide-react";

export function AddUser() {
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
        <UserForm add={true}>
          <DialogFooter>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </UserForm>
      </DialogContent>
    </Dialog>
  );
}
