"use client";
import { useFormState, useFormStatus } from "react-dom";

import { IoMdLogIn } from "react-icons/io";

import { authenticate } from "@/actions/auth/login";
import { Input } from "@/codePanel/components/input/Input";

export const LoginForm = () => {
  const [state, dispatch] = useFormState(authenticate, undefined);

  return (
    <form action={dispatch} className="flex flex-col gap-4">
      <Input type="email" placeholder="Correo electrónico" name="email" />
      <Input type="password" placeholder="Contraseña" name="password" />
      <div
        className="flex h-8 items-end space-x-1"
        aria-live="polite"
        aria-atomic="true"
      >
        {/* {state === "Credenciales incorrectas" && (
          <div className="flex justify-center h-full border border-red-300 w-full items-center">
            <IoInformationOutline className=" text-red-500" size={20} />
            <p className="text-sm text-red-500">{state}</p>
          </div>
        )} */}
      </div>
      <LoginButton />
    </form>
  );
};

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="flex items-center justify-center gap-2 bg-blue-500 text-white rounded-md p-2 hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
      aria-disabled={pending}
      disabled={pending}
    >
      Iniciar sesión <IoMdLogIn size={20} />
    </button>
  );
}
