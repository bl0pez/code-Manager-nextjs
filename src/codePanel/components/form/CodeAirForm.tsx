"use client";
import { useState } from "react";
import { Operator } from "@prisma/client";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { createCodeAir } from "@/actions/codePanel/codeAir/createCodeAir";

interface Props {
  operators: Operator[];
}

type FormInputs = {
  createdAt: Date;
  location: string;
  informant: string;
  operator: string;
  emergencyDetails: string | null;
};

export const CodeAirForm = ({ operators }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setIsLoading(true);

    const resp = await createCodeAir(data);

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
      className="bg-white px-3 py-5 shadow gap-3 grid md:grid-cols-2 rounded"
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
          Lugar de la emergencia
        </label>
        <input
          id="location"
          className={errors.location && "border-red-500"}
          {...register("location", { required: true })}
        />
      </div>
      <div className="space-y-1 flex flex-col">
        <label
          htmlFor="emergencyDetails"
          className="text-gray-600 font-semibold"
        >
          Detalles de la emergencia
        </label>
        <input id="emergencyDetails" {...register("emergencyDetails")} />
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
          {operators.map((operator) => (
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
