interface Props {
  value: Boolean;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const SelectPolice = ({ value, onChange }: Props) => {
  return (
    <select
      value={value ? "Si" : "No"}
      onChange={onChange}
      name="operator"
      className="border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-600 border w-full"
    >
      <option value="Si">Si</option>
      <option value="No">No</option>
    </select>
  );
};
