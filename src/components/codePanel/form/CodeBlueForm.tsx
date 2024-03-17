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
import { Button } from "@/components/ui/button";
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

          {/* Equipo */}
          <FormField
            control={form.control}
            name="team"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Equipo</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un equipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {teams.map((team) => (
                      <SelectItem key={team.id} value={team.title}>
                        {team.title}
                      </SelectItem>
                    ))}
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
            <FormItem>
              <FormLabel>Ubicación</FormLabel>
              <FormControl>
                <Input {...field} />
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
