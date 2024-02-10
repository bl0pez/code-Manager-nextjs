"use client";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "react-toastify";

import { Operator } from "@prisma/client";
import { SelectOperatos } from "@/components/ui/SelectOperatos";

import { SelectPolice } from "@/components/ui/SelectPolice";
import { createCodeGreen } from "@/actions/codePanel/codeGreen/createCodeGreen";
import { useEffect } from "react";

interface Props {
  operatos: Operator[];
}

export const CreateCodeGreen = ({ operatos }: Props) => {
  const [state, dispatch] = useFormState(createCodeGreen, undefined);

  useEffect(() => {
    if (state === "Código verde creado correctamente") {
      toast.success(state);
    }

    if (state === "Error al crear el código verde") {
      toast.error(state);
    }

    if (state === "Debes iniciar sesión para hacer esto") {
      toast.error(state);
    }

    if (state === "Todos los campos son requeridos") {
      toast.error(state);
    }
  }, [state]);

  return (
    <form
      className="bg-white shadow-md rounded px-3 py-4 space-y-3"
      action={dispatch}
    >
      {/* <div className="grid grid-cols-2 gap-2"> */}
      {/* <Input type="datetime-local" id="createdAt" name="createdAt" />
        <Input
          id="location"
          name="location"
          type="text"
          placeholder="Ubicación"
        />
      </div>
      <div></div>
      <div>
        <Input name="event" type="text" placeholder="Detalle del evento" />
      </div>
      <div>
        <SelectPolice name="police" />
      </div>
      <div>
        <Input
          name="informant"
          type="text"
          placeholder="Nombre del funcionario"
        />
      </div>
      <div>
        <SelectOperatos operatos={operatos} />
      </div> */}
      <Button />
      {/* <button
        type="button"
        onClick={onSubmit}
        className="bg-indigo-600 text-white px-4 py-2 rounded-md w-full hover:bg-indigo-700 transition-all"
      >
        Crear Código Verde
      </button> */}
    </form>
  );
};

function Button() {
  const { pending } = useFormStatus();

  return (
    <button
      className="flex items-center justify-center gap-2 bg-blue-500 text-white rounded-md p-2 hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
      aria-disabled={pending}
      disabled={pending}
    >
      Crear Código Verde
    </button>
  );
}
