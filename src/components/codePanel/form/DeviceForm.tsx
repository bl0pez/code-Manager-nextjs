"use client";
import { useForm } from "react-hook-form";
import { CreateDeviceSchema, CreateDeviceValues } from "@/schema";
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
import { Nodo, TypeDevice } from "@prisma/client";
import { TemplateButton } from "@/components/template/TemplateButton";
import { TemplateTextarea } from "@/components/TemplateTextarea";
import { useFormStatus } from "@/hooks/useFormStatus";
import { createDevice } from "@/actions/codePanel/fireAlarms/createDevice";

interface Props {
  nodo: Nodo[];
  typeDevices: TypeDevice[];
}

export const DeviceForm = ({ nodo, typeDevices }: Props) => {
  const { isPending, setAlertMessage, startTransition } = useFormStatus();

  const form = useForm<CreateDeviceValues>({
    resolver: zodResolver(CreateDeviceSchema),
    defaultValues: {
      lazo: "",
      location: "",
      nodoId: "",
      typeDeviceId: "",
      deviceId: "",
    },
  });

  const onSubmit = (values: CreateDeviceValues) => {
    startTransition(async () => {
      const resp = await createDevice(values);

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
        {/* Nodo */}
        <FormField
          control={form.control}
          name="nodoId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nodo</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una opción" />
                  </SelectTrigger>
                  <SelectContent>
                    {nodo.map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.nodo} - {item.building}
                      </SelectItem>
                    ))}
                  </SelectContent>
                  <FormMessage />
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        {/* Lazo */}
        <FormField
          control={form.control}
          name="lazo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lazo</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ID del dispositivo */}
        <FormField
          control={form.control}
          name="deviceId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID del dispositivo</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ID del dispositivo */}
        <FormField
          control={form.control}
          name="typeDeviceId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de dispositivo</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una opción" />
                  </SelectTrigger>
                  <SelectContent>
                    {typeDevices.map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                  <FormMessage />
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        {/* Ubicación */}
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <TemplateTextarea
              description="Ingresa la ubicación del dispositivo"
              title="Ubicación del dispositivo"
              name={field.name}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />

        <TemplateButton
          isDisabled={isPending}
          title="Crear Dispositivo"
          type="submit"
          className="col-span-1 sm:col-span-2"
        />
      </form>
    </Form>
  );
};
