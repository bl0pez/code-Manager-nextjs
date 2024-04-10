"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { useFormStatus } from "@/hooks/useFormStatus";
import { CreateTypeDeviceSchema, CreateTypeDeviceValues } from "@/schema";
import { createTypeDevice } from "@/actions/codePanel/fireAlarms/createTypeDevice";

export const TypeDeviceForm = () => {
  const { isPending, startTransition } = useFormStatus();

  const form = useForm<CreateTypeDeviceValues>({
    resolver: zodResolver(CreateTypeDeviceSchema),
    defaultValues: {
      type: "",
    },
  });

  const onSubmit = (values: CreateTypeDeviceValues) => {
    startTransition(async () => {
      const resp = await createTypeDevice(values);

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
        {/* Nodo */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de Dispositivo</FormLabel>
              <FormControl>
                <Input {...field} />
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
          Crear Nodo
        </Button>
      </form>
    </Form>
  );
};
