"use client";
import { useForm } from "react-hook-form";
import { Operator } from "@prisma/client";
import { toast } from "react-toastify";
import { CodeGreenSchema, CodeGreenValues } from "@/schema";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createCodeGreen } from "@/actions/codePanel/codeGreen/createCodeGreen";
import { useRouter } from "next/navigation";
import { InputDate } from "@/components/InputDate";

interface Props {
  operatos: Operator[];
}

export const CodeGreenForm = ({ operatos }: Props) => {
  const route = useRouter();

  const form = useForm<CodeGreenValues>({
    resolver: zodResolver(CodeGreenSchema),
    defaultValues: {
      createdAt: undefined,
      event: "",
      informant: "",
      location: "",
      operator: "",
      police: undefined,
    },
  });

  const onSubmit = async (data: CodeGreenValues) => {
    const response = await createCodeGreen(data);

    form.reset();
    if (response.error) {
      toast.error(response.error);
      return;
    }

    toast.success(response.success);
    route.refresh();
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

          {/* Carabineros */}
          <FormField
            control={form.control}
            name="police"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Carabineros</FormLabel>
                <FormControl>
                  <Select
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
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una opción" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={"Si"}>Sí</SelectItem>
                      <SelectItem value={"No"}>No</SelectItem>
                    </SelectContent>
                    <FormMessage />
                  </Select>
                </FormControl>
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
              <FormItem>
                <FormLabel>Operador</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un operador" />
                  </SelectTrigger>
                  <SelectContent>
                    {operatos.map((operator) => (
                      <SelectItem key={operator.id} value={operator.fullName}>
                        {operator.fullName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                  <FormMessage />
                </Select>
              </FormItem>
            )}
          />
        </div>

        {/* Ubicación */}
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Ubicación
                <FormDescription>
                  Ingrese la ubicación del código verde
                </FormDescription>
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Evento */}
        <FormField
          control={form.control}
          name="event"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Evento
                <FormDescription>
                  Describa el evento que generó el código verde
                </FormDescription>
              </FormLabel>
              <FormControl>
                <Textarea className="resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" title="Crear código azul">
          Crear
        </Button>
      </form>
    </Form>
  );
};
