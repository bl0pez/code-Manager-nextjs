"use client";
import { useForm } from "react-hook-form";
import { Role } from "@prisma/client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFormStatus } from "@/hooks/useFormStatus";
import { newUser } from "@/actions/adminPanel/user/newUser";
import { toast } from "react-toastify";
import { CreateOperatorSchema, CreateOperatorValues } from "@/schema";
import { createOperator } from "@/actions/adminPanel/operators/createOperator";

export const CreateOperatorForm = () => {
  const { isPending, startTransition } = useFormStatus();

  const form = useForm<CreateOperatorValues>({
    resolver: zodResolver(CreateOperatorSchema),
    defaultValues: {
      fullName: "",
    },
  });

  const onSubmit = (values: CreateOperatorValues) => {
    startTransition(async () => {
      const resp = await createOperator(values);

      if (resp.error) {
        toast.error(resp.error);
        return;
      }

      form.reset();
      toast.success(resp.success);
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input {...field} autoComplete="off" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={isPending}
          type="submit"
          variant="default"
          className="w-full mt-3"
        >
          Crear Operador
        </Button>
      </form>
    </Form>
  );
};
