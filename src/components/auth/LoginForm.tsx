"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { LoginSchema, LoginValues } from "@/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState, useTransition } from "react";
import { FormAler } from "../FormAler";
import { useRouter } from "next/navigation";
import { login } from "@/actions/auth/login";

export const LoginForm = () => {
  const router = useRouter();
  const [isLoading, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  const form = useForm<LoginValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: LoginValues) => {
    setMessage(null);

    startTransition(async () => {
      const resp = await login(values);

      if (resp?.error) {
        setMessage(resp.error);
      }
    });
  };

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>ADM Central</CardTitle>
        <CardDescription>Ingresa tus datos para iniciar sesión</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo electrónico</FormLabel>
                  <FormControl>
                    <Input placeholder="Correo electrónico" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Contraseña"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormAler type="error" message={message} />

            <Button type="submit" disabled={isLoading} className="w-full">
              Iniciar sesión
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
