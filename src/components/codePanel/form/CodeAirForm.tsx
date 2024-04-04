"use client";
import { Operator } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { CodeAirSchema, CodeAirValues } from "@/schema";
import { useFormStatus } from "@/hooks/useFormStatus";
import { SelectOperator } from "@/components/SelectOperator";
import { InputDate } from "@/components/InputDate";
import { Textarea } from "@/components/ui/textarea";
import { createCodeAir } from "@/actions/codePanel/codeAir/createCodeAir";
import { TemplateTextarea } from "@/components/TemplateTextarea";

interface Props {
  operators: Operator[];
}

export const CodeAirForm = ({ operators }: Props) => {
  const { isPending, setAlertMessage, startTransition } = useFormStatus();

  const form = useForm<CodeAirValues>({
    resolver: zodResolver(CodeAirSchema),
    defaultValues: {
      createdAt: undefined,
      location: "",
      emergencyDetails: "",
      operator: "",
      informant: "",
    },
  });

  const onSubmit = (values: CodeAirValues) => {
    startTransition(async () => {
      const resp = await createCodeAir(values);

      if (resp.error) {
        setAlertMessage({ message: resp.error, type: "error" });
        return;
      }

      form.reset();
      setAlertMessage({ message: resp.success, type: "success" });
    });
  };
  return (
    <Form {...form}>
      <form className="space-y-4 w-full" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-3">
          {/* Fecha y hora */}
          <FormField
            control={form.control}
            name="createdAt"
            render={({ field }) => (
              <InputDate
                name="createdAt"
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />

          {/* Funcionario/a */}
          <FormField
            control={form.control}
            name="informant"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Funcionario/a</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Operador */}
          <FormField
            control={form.control}
            name="operator"
            render={({ field }) => (
              <SelectOperator
                name={field.name}
                operators={operators}
                onValueChange={field.onChange}
                value={field.value}
              />
            )}
          />
        </div>

        {/* Ubicación */}
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <TemplateTextarea
              name={field.name}
              title="Ubicación"
              description="Ingresa la ubicación del código aéreo"
              onChange={field.onChange}
              value={field.value}
            />
          )}
        />

        {/* Detalle de la emergencia */}
        <FormField
          control={form.control}
          name="emergencyDetails"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Detalle de la emergencia
                <FormDescription>
                  Ingrese el detalle de la emergencia
                </FormDescription>
              </FormLabel>
              <FormControl>
                <Textarea className="resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={isPending}
          type="submit"
          className="w-full"
          title="Crear código azul"
        >
          Crear
        </Button>
      </form>
    </Form>
  );
};
