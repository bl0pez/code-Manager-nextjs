"use client";

import { useState } from "react";
import { IoMdLogIn } from "react-icons/io";
import { MdErrorOutline } from "react-icons/md";

import { type SubmitHandler, useForm } from "react-hook-form";
import { authenticate } from "@/actions/auth/login";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

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
        className="bg-indigo-600 text-white py-2 rounded-md w-full hover:bg-indigo-700 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed flex justify-center items-center"
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
          <span className="flex items-center gap-4 text-xl">
            Crear <IoMdLogIn size={20} />
          </span>
        )}
      </button>
    </form>
  );
}

// function LoginButton() {
//   const { pending } = useFormStatus();

//   return (
//     <button
//       className="flex items-center justify-center gap-2 bg-blue-500 text-white rounded-md p-2 hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
//       aria-disabled={pending}
//       disabled={pending}
//     >
//       Iniciar sesión <IoMdLogIn size={20} />
//     </button>
//   );
// }
