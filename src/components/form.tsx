import { User } from "@/lib/type";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function UserForm(props?: User) {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Name
        </Label>
        <Input id="name" value={props?.name} className="col-span-3" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="email" className="text-right">
          Email
        </Label>
        <Input id="email" value={props?.email} className="col-span-3" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="phone" className="text-right">
          Phone
        </Label>
        <Input id="phone" value={props?.phone} className="col-span-3" />
      </div>
    </div>
  );
}
