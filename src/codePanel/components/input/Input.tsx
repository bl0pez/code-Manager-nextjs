export const Input = ({ ...props }: JSX.IntrinsicElements["input"]) => {
  return (
    <input
      {...props}
      className="border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-600 border"
    />
  );
};
