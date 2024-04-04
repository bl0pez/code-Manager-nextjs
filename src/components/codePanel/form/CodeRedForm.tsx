"use client";

import { Operator } from "@prisma/client";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { InputDate } from "@/components/InputDate";
import { CodeRedSchema, CodeRedValues } from "@/schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { SelectOperator } from "@/components/SelectOperator";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "@/hooks/useFormStatus";
import { createCodeRed } from "@/actions/codePanel/codeRed/createCodeRed";
import { zodResolver } from "@hookform/resolvers/zod";
import { TemplateTextarea } from "@/components/TemplateTextarea";

interface Props {
  operators: Operator[];
}

export const CodeRedForm = ({ operators }: Props) => {
  const { isPending, setAlertMessage, startTransition } = useFormStatus();

  const form = useForm<CodeRedValues>({
    resolver: zodResolver(CodeRedSchema),
    defaultValues: {
      createdAt: undefined,
      informant: "",
      location: "",
      operator: "",
      firefightersCallTime: undefined,
      COERadialCommunication: undefined,
    },
  });

  const onSubmit = (values: CodeRedValues) => {
    startTransition(async () => {
      const resp = await createCodeRed(values);

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
      <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
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

          {/* Hora de llamada a bomberos */}
          <FormField
            control={form.control}
            name="firefightersCallTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hora de llamada a bomberos</FormLabel>
                <FormControl>
                  <Input
                    value={field.value}
                    name={field.name}
                    type="time"
                    onChange={(e) => {
                      const date = new Date();
                      const [hours, minutes] = e.target.value.split(":");
                      date.setHours(Number(hours));
                      date.setMinutes(Number(minutes));
                      field.onChange(date.toISOString());
                    }}
                    className="inline-block w-auto"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Carabineros */}
          <FormField
            control={form.control}
            name="COERadialCommunication"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Comunicación radial COE</FormLabel>

                <Select
                  name={field.name}
                  value={
                    field.value === true
                      ? "Si"
                      : field.value === false
                      ? "No"
                      : ""
                  }
                  onValueChange={(value) => {
                    if (value == "Si") {
                      return field.onChange(true);
                    }

                    if (value == "No") {
                      return field.onChange(false);
                    }

                    return field.onChange(undefined);
                  }}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una opción" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={"Si"}>Sí</SelectItem>
                    <SelectItem value={"No"}>No</SelectItem>
                  </SelectContent>
                  <FormMessage />
                </Select>
              </FormItem>
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
                operators={operators}
                onValueChange={field.onChange}
                value={field.value}
                name={field.name}
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
              description="Ingresa la ubicación del código rojo"
              onChange={field.onChange}
              value={field.value}
            />
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
