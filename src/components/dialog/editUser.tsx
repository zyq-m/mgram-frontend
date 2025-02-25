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
import { UserPen } from "lucide-react";

export function EditUser(props: User) {
  return (
    <Dialog>
      <DialogTrigger>
        <UserPen className="size-4 text-green-500" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <UserForm {...props} edit={true}>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </UserForm>
      </DialogContent>
    </Dialog>
  );
}
