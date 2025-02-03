/* eslint-disable react-hooks/exhaustive-deps */
import { User } from "@/lib/type";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { userSchema } from "@/utils/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ReactNode, useEffect } from "react";
import { api } from "@/utils/axios";
import { useToast } from "@/hooks/use-toast";

export default function UserForm(
  props?: User & {
    children: ReactNode;
    edit?: boolean | false;
    add?: boolean | false;
  },
) {
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
  });

  const { toast } = useToast();

  const onSubmit = async (data: User) => {
    try {
      let message: string = "";
      if (props?.edit) {
        const user = await api.put(`/auth/user/${props?.id}`, data);
        message = user.data.message;
      }

      if (props?.add) {
        const user = await api.post("/auth/user", data);
        message = user.data.message;
      }

      toast({
        title: "Success",
        description: message,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    form.setValue("email", props?.email ?? "");
    form.setValue("name", props?.name ?? "");
    form.setValue("phone", props?.phone ?? "");
  }, []);

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-4 space-y-0">
              <FormLabel className="text-right">Name</FormLabel>
              <div className="col-span-3">
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-4 space-y-0">
              <FormLabel className="text-right">Email</FormLabel>
              <div className="col-span-3">
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-4 space-y-0">
              <FormLabel className="text-right">Phone</FormLabel>
              <div className="col-span-3">
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        {props?.children}
      </form>
    </Form>
  );
}
