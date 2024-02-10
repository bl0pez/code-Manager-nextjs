export const SelectPolice = ({
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) => {
  return (
    <select
      {...props}
      className="border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-600 border w-full"
    >
      <option value="True">Si</option>
      <option value="False">No</option>
    </select>
  );
};
// interface Props {
//   value?: Boolean;
//   onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
//   name?: string;
// }

// export const SelectPolice = ({ value, name, onChange }: Props) => {
//   return (
//     <select
//       value={value ? "Si" : "No"}
//       onChange={onChange}
//       name="operator"
//       className="border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-600 border w-full"
//     >
//       <option value="Si">Si</option>
//       <option value="No">No</option>
//     </select>
//   );
// };
