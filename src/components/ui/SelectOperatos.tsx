import { Operator } from "@prisma/client";

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  operatos: Operator[];
}

export const SelectOperatos = ({ value, onChange, operatos }: Props) => {
  return (
    <select
      value={value}
      onChange={onChange}
      name="operator"
      className="border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-600 border w-full"
    >
      <option value="" disabled>
        Selecciona un operador
      </option>
      {operatos.map((operator) => (
        <option key={operator.id} value={operator.fullName}>
          {operator.fullName}
        </option>
      ))}
    </select>
  );
};
