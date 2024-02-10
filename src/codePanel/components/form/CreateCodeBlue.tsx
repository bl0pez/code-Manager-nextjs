"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { Operator, Team } from "@prisma/client";
import { createCodeBlue } from "@/actions/codePanel/codeBlue/createCodeBlue";
import { toast } from "react-toastify";
import { useFormStatus } from "react-dom";
import { useState } from "react";

interface Props {
  teams: Team[];
  operatos: Operator[];
}

enum TeamCodeBlue {
  Uci = "Uci",
  Urgencia = "Urgencia",
  UciPediatrica = "Uci Pediatrica",
}

enum OperatorCodeBlue {
  Operator1 = "Alexander ",
  Operator2 = "Bryan Lopez",
  Operator3 = "Ignacio Huerta",
}

type FormInputs = {
  createdAt: string;
  informant: string;
  location: string;
  operator: OperatorCodeBlue;
  team: TeamCodeBlue;
};

export const CreateCodeBlue = ({ operatos, teams }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setIsLoading(true);

    const { createdAt, informant, location, operator, team } = data;

    const resp = await createCodeBlue({
      createdAt,
      informant,
      location,
      operator,
      team,
    });

    if (!resp.ok) {
      return toast.error(resp.message);
    } else {
      reset();
      toast.success(resp.message);
    }

    setIsLoading(false);
  };

  return (
    <div className="flex justify-center">
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
          <label htmlFor="team" className="text-gray-600 font-semibold">
            Equipo
          </label>
          <select
            id="team"
            className={errors.team && "border-red-500"}
            {...register("team", { required: true })}
          >
            {teams.map((team) => (
              <option key={team.id} value={team.title}>
                {team.title}
              </option>
            ))}
          </select>
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
    </div>
  );
};
