"use client";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { CreateNodoSchema, CreateNodoValues } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormStatus } from "@/hooks/useFormStatus";
import { toast } from "react-toastify";
import { createNodo } from "@/actions/codePanel/fireAlarms/createNodo";

export const CreateNodo = () => {
  const { isPending, startTransition } = useFormStatus();

  const form = useForm<CreateNodoValues>({
    resolver: zodResolver(CreateNodoSchema),
    defaultValues: {
      building: "",
      nodo: undefined,
    },
  });

  const onSubmit = (values: CreateNodoValues) => {
    startTransition(async () => {
      const resp = await createNodo(values);

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
        <div className="grid grid-cols-2 gap-3">
          {/* Nodo */}
          <FormField
            control={form.control}
            name="nodo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nodo</FormLabel>
                <FormControl>
                  <Input {...field} type="number" value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Edificio */}
          <FormField
            control={form.control}
            name="building"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Edificio</FormLabel>
                <FormControl>
                  <Input {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          disabled={isPending}
          type="submit"
          variant="default"
          className="w-full mt-3"
        >
          Crear Nodo
        </Button>
      </form>
    </Form>
  );
};
