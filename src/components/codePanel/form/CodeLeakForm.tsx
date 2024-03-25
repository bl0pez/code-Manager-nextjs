"use client";
import { Operator } from "@prisma/client";
import { useForm } from "react-hook-form";
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

import { CodeLeakSchema, CodeLeakValues } from "@/schema";
import { useFormStatus } from "@/hooks/useFormStatus";
import { SelectOperator } from "@/components/SelectOperator";
import { InputDate } from "@/components/InputDate";
import { createCodeLeak } from "@/actions/codePanel/codeLeak/createCodeLeak";
import { TemplateTextarea } from "@/components/TemplateTextarea";
import { TemplateButton } from "@/components/template/TemplateButton";

interface Props {
  operators: Operator[];
}

export const CodeLeakForm = ({ operators }: Props) => {
  const { isPending, setAlertMessage, startTransition } = useFormStatus();

  const form = useForm<CodeLeakValues>({
    resolver: zodResolver(CodeLeakSchema),
    defaultValues: {
      createdAt: undefined,
      informant: "",
      patient_description: "",
      operator: "",
      service: "",
    },
  });

  const onSubmit = async (values: CodeLeakValues) => {
    startTransition(async () => {
      const resp = await createCodeLeak(values);

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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        {/* Fecha y hora */}
        <FormField
          control={form.control}
          name="createdAt"
          render={({ field }) => (
            <InputDate
              name={field.name}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />

        {/* Operador */}
        <FormField
          control={form.control}
          name="operator"
          render={({ field }) => (
            <SelectOperator
              operators={operators}
              onValueChange={field.onChange}
              value={field.value}
              name={field.name}
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

        {/* Servicio */}
        <FormField
          control={form.control}
          name="service"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Servicio</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Descripción del paciente */}
        <FormField
          control={form.control}
          name="patient_description"
          render={({ field }) => (
            <TemplateTextarea
              description="Ingresa una descripción del paciente"
              title="Descripción del paciente"
              name={field.name}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />

        <TemplateButton
          isDisabled={isPending}
          title="Crear evento"
          type="submit"
          className="col-span-1 sm:col-span-2"
        />
      </form>
    </Form>
  );
};
