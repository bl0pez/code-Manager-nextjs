"use client";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { Operator } from "@prisma/client";
import { toast } from "react-toastify";
import { createCodeGreen } from "@/actions/codePanel/codeGreen/createCodeGreen";

interface Props {
  operatos: Operator[];
}

enum Police {
  "true" = "Si",
  "false" = "No",
}

type FormInputs = {
  createdAt: Date;
  location: string;
  event: string;
  police: string;
  informant: string;
  operator: string;
};

export const CodeGreenForm = ({ operatos }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setIsLoading(true);

    const { createdAt, event, informant, location, operator, police } = data;

    const resp = await createCodeGreen({
      createdAt,
      event,
      informant,
      location,
      operator,
      police: police === "true" ? true : false,
    });

    if (!resp.ok) {
      toast.error(resp.message);
    } else {
      reset();
      toast.success(resp.message);
    }

    setIsLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white px-3 py-5 shadow md:gap-3 md:grid md:grid-cols-2"
    >
      <div className="space-y-1 flex flex-col">
        <label htmlFor="createdAt" className="text-gray-600 font-semibold">
          Fecha y hora
        </label>
        <input
          id="createdAt"
          className={errors.createdAt && "border-red-500"}
          type="datetime-local"
          {...register("createdAt", { required: true })}
        />
      </div>
      <div className="space-y-1 flex flex-col">
        <label htmlFor="location" className="text-gray-600 font-semibold">
          Ubicación
        </label>
        <input
          id="location"
          className={errors.location && "border-red-500"}
          {...register("location", { required: true })}
        />
      </div>
      <div className="space-y-1 flex flex-col">
        <label htmlFor="event" className="text-gray-600 font-semibold">
          Evento
        </label>
        <input
          id="event"
          className={errors.event && "border-red-500"}
          {...register("event", { required: true })}
        />
      </div>
      <div className="space-y-1 flex flex-col">
        <label htmlFor="police" className="text-gray-600 font-semibold">
          Carabineros
        </label>
        <select
          id="police"
          className={errors.police && "border-red-500"}
          {...register("police", { required: true })}
        >
          {Object.entries(Police).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-1 flex flex-col">
        <label htmlFor="informant" className="text-gray-600 font-semibold">
          Funcionario/a
        </label>
        <input
          id="informant"
          className={errors.informant && "border-red-500"}
          {...register("informant", { required: true })}
        />
      </div>
      <div className="space-y-1 flex flex-col">
        <label htmlFor="operator" className="text-gray-600 font-semibold">
          Operador
        </label>
        <select
          id="operator"
          className={errors.operator && "border-red-500"}
          {...register("operator", { required: true })}
        >
          {operatos.map((operator) => (
            <option key={operator.id} value={operator.fullName}>
              {operator.fullName}
            </option>
          ))}
        </select>
      </div>
      <div className="md:col-span-2">
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
            "Crear"
          )}
        </button>
      </div>
    </form>
  );
};
