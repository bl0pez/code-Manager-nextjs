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
            <FormItem>
              <FormLabel>
                Ubicación
                <FormDescription>
                  Ingrese la ubicación del código rojo
                </FormDescription>
              </FormLabel>
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
          className="w-full"
          title="Crear código azul"
        >
          Crear
        </Button>
      </form>
    </Form>
    // <form
    //   onSubmit={handleSubmit(onSubmit)}
    //   className="bg-white px-3 py-5 shadow md:gap-3 md:grid md:grid-cols-2"
    // >
    //   <div className="space-y-1 flex flex-col">
    //     <label htmlFor="createdAt" className="text-gray-600 font-semibold">
    //       Fecha y hora
    //     </label>
    //     <input
    //       id="createdAt"
    //       className={errors.createdAt && "border-red-500"}
    //       type="datetime-local"
    //       {...register("createdAt", { required: true })}
    //     />
    //   </div>
    //   <div className="space-y-1 flex flex-col">
    //     <label htmlFor="location" className="text-gray-600 font-semibold">
    //       Ubicación
    //     </label>
    //     <input
    //       id="location"
    //       className={errors.location && "border-red-500"}
    //       {...register("location", { required: true })}
    //     />
    //   </div>
    //   <div className="space-y-1 flex flex-col">
    //     <label htmlFor="informant" className="text-gray-600 font-semibold">
    //       Funcionario/a
    //     </label>
    //     <input
    //       id="informant"
    //       className={errors.informant && "border-red-500"}
    //       {...register("informant", { required: true })}
    //     />
    //   </div>
    //   <div className="space-y-1 flex flex-col">
    //     <label
    //       htmlFor="firefightersCallTime"
    //       className="text-gray-600 font-semibold"
    //     >
    //       Hora de llamada a bomberos
    //     </label>
    //     <input
    //       id="firefightersCallTime"
    //       type="datetime-local"
    //       {...register("firefightersCallTime")}
    //     />
    //   </div>
    //   <div className="space-y-1 flex flex-col">
    //     <label htmlFor="operator" className="text-gray-600 font-semibold">
    //       Operador
    //     </label>
    //     <select
    //       id="operator"
    //       className={errors.operator && "border-red-500"}
    //       {...register("operator", { required: true })}
    //     >
    //       {operators.map((operator) => (
    //         <option key={operator.id} value={operator.fullName}>
    //           {operator.fullName}
    //         </option>
    //       ))}
    //     </select>
    //   </div>
    //   <div className="space-y-1 flex flex-col">
    //     <label htmlFor="police" className="text-gray-600 font-semibold">
    //       Comunicación radial COE
    //     </label>
    //     <select
    //       id="COERadialCommunication"
    //       className={errors.COERadialCommunication && "border-red-500"}
    //       {...register("COERadialCommunication")}
    //     >
    //       <option value="false">No</option>
    //       <option value="true">Si</option>
    //     </select>
    //   </div>
    //   <div className="md:col-span-2">
    //     <button
    //       className="bg-indigo-600 text-white py-2 rounded-md w-full hover:bg-indigo-700 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed flex justify-center items-center"
    //       disabled={isLoading}
    //       type="submit"
    //       title="Crear código azul"
    //     >
    //       {isLoading ? (
    //         <div
    //           className="w-5 h-5 rounded-full animate-spin
    //           border-4 border-solid border-indigo-700 border-t-transparent"
    //         ></div>
    //       ) : (
    //         "Crear"
    //       )}
    //     </button>
    //   </div>
    // </form>
  );
};
