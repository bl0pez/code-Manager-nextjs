"use client";
import { Operator, Team } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { createCodeBlue } from "@/actions/codePanel/codeBlue/createCodeBlue";
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
import { CodeBlueSchema, CodeBlueValues } from "@/schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  teams: Team[];
  operatos: Operator[];
}

export const CodeBlueForm = ({ operatos, teams }: Props) => {
  const form = useForm<CodeBlueValues>({
    resolver: zodResolver(CodeBlueSchema),
    defaultValues: {
      createdAt: "",
      informant: "",
      location: "",
      operator: "",
      team: "",
    },
  });

  const onSubmit = async (data: CodeBlueValues) => {
    const { createdAt, informant, location, operator, team } = data;

    const resp = await createCodeBlue({
      createdAt,
      informant,
      location,
      operator,
      team,
    });

    if (!resp.ok) {
      return toast.error(resp.message);
    } else {
      toast.success(resp.message);
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-4 w-full" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="createdAt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fecha y hora</FormLabel>
                <FormControl>
                  <Input type="datetime-local" {...field} className="w-full" />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="team"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Equipo</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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
        </div>

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

        <div className="grid grid-cols-2 gap-3">
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

          <FormField
            control={form.control}
            name="operator"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Operador</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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

        <Button type="submit" className="w-full" title="Crear código azul">
          Crear
        </Button>
      </form>
    </Form>
  );
};
