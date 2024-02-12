"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { IoMdLogIn } from "react-icons/io";
import { MdErrorOutline } from "react-icons/md";

import { authenticate } from "@/actions/auth/login";

type FormInputs = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setIsLoading(true);

    const response = await authenticate(data);

    if (!response.ok) {
      toast.error(response.message);
      setIsLoading(false);
      return;
    }

    router.replace("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="space-y-2">
        <input
          className={errors.email && "border-red-500"}
          placeholder="Correo electrónico"
          type="email"
          {...register("email", {
            required: {
              value: true,
              message: "El correo es requerido",
            },
          })}
        />
        {errors.email && (
          <span className="py-1 text-red-500 flex items-center gap-2">
            <MdErrorOutline size={20} /> {errors.email.message}
          </span>
        )}
      </div>
      <div className="space-y-2">
        <input
          className={errors.password && "border-red-500"}
          placeholder="Contraseña"
          type="password"
          {...register("password", {
            required: {
              value: true,
              message: "La contraseña es requerida",
            },
            minLength: {
              value: 5,
              message: "La contraseña debe tener al menos 5 caracteres",
            },
          })}
        />
        {errors.password && (
          <span className="py-1 text-red-500 flex items-center gap-2">
            <MdErrorOutline size={20} /> {errors.password.message}
          </span>
        )}
      </div>
      <button
        className="bg-indigo-600 h-7 text-white rounded-md w-full hover:bg-indigo-700 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed flex justify-center items-center"
        disabled={isLoading}
        type="submit"
        title="Crear código azul"
      >
        {isLoading ? (
          <div
            className="w-5 h-5 rounded-full animate-spin
                border-4 border-solid border-indigo-700 border-t-transparent"
          ></div>
        ) : (
          <span className="flex items-center gap-4 text-base">
            Iniciar sesión <IoMdLogIn size={20} />
          </span>
        )}
      </button>
    </form>
  );
}
