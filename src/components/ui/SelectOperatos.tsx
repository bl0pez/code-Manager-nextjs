import { Operator } from "@prisma/client";

type Props = {
  props: React.SelectHTMLAttributes<HTMLSelectElement>;
  operatos: Operator[];
};

export const SelectOperatos: React.FC<Props> = ({ operatos, props }) => {
  return (
    <select
      {...props}
      className="border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-600 border "
    >
      <option value="" disabled>
        Selecciona un operador
      </option>
      {/* {operatos.map((operator: Operator) => (
        <option key={operator.id} value={operator.id}>
          {operator.fullName}
        </option>
      ))} */}
    </select>
  );
};
