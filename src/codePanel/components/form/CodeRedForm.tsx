"use client";
import { createCodeRed } from "@/actions/codePanel/codeRed/createCodeRed";
import { Operator } from "@prisma/client";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

interface Props {
  operators: Operator[];
}

type FormInputs = {
  createdAt: Date;
  location: string;
  informant: string;
  operator: string;
  firefightersCallTime: Date;
  COERadialCommunication: string;
};

export const CodeRedForm = ({ operators }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setIsLoading(true);

    const { firefightersCallTime, COERadialCommunication, ...rest } = data;

    const resp = await createCodeRed({
      ...rest,
      COERadialCommunication: COERadialCommunication === "true" ? true : false,
      firefightersCallTime: firefightersCallTime
        ? new Date(firefightersCallTime)
        : null,
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
        <label
          htmlFor="firefightersCallTime"
          className="text-gray-600 font-semibold"
        >
          Hora de llamada a bomberos
        </label>
        <input
          id="firefightersCallTime"
          type="datetime-local"
          {...register("firefightersCallTime")}
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
      <div className="space-y-1 flex flex-col">
        <label htmlFor="police" className="text-gray-600 font-semibold">
          Comunicación radial COE
        </label>
        <select
          id="COERadialCommunication"
          className={errors.COERadialCommunication && "border-red-500"}
          {...register("COERadialCommunication")}
        >
          <option value="false">No</option>
          <option value="true">Si</option>
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
