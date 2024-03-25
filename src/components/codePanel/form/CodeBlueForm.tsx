"use client";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Operator, Team } from "@prisma/client";
import { createCodeBlue } from "@/actions/codePanel/codeBlue/createCodeBlue";
import { CodeBlueSchema, CodeBlueValues } from "@/schema";
import { InputDate } from "@/components/InputDate";
import { SelectOperator } from "@/components/SelectOperator";
import { useFormStatus } from "@/hooks/useFormStatus";
import { TemplateTextarea } from "@/components/TemplateTextarea";
import { TemplateButton } from "@/components/template/TemplateButton";

interface Props {
  teams: Team[];
  operators: Operator[];
}

export const CodeBlueForm = ({ operators, teams }: Props) => {
  const { isPending, setAlertMessage, startTransition } = useFormStatus();

  const form = useForm<CodeBlueValues>({
    resolver: zodResolver(CodeBlueSchema),
    defaultValues: {
      createdAt: undefined,
      informant: "",
      location: "",
      operator: "",
      team: "",
    },
  });

  const onSubmit = async (data: CodeBlueValues) => {
    startTransition(async () => {
      const resp = await createCodeBlue(data);

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
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
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

        {/* Equipo */}
        <FormField
          control={form.control}
          name="team"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Equipo</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un equipo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {teams.map((team) => (
                    <SelectItem key={team.id} value={team.title}>
                      {team.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
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
              name={field.name}
              operators={operators}
              onValueChange={field.onChange}
              value={field.value}
            />
          )}
        />

        {/* Ubicación */}
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <TemplateTextarea
              name={field.name}
              title="Ubicación"
              description="Ingresa la ubicación del código azul"
              onChange={field.onChange}
              value={field.value}
            />
          )}
        />

        <TemplateButton
          type="submit"
          isDisabled={isPending}
          title="Crear código azul"
          className="col-span-1 sm:col-span-2"
        />
      </form>
    </Form>
  );
};
