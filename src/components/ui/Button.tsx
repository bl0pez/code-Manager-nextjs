interface Props {
  buttonProps?: JSX.IntrinsicElements["button"];
  children?: React.ReactNode;
}

export const Button = ({ buttonProps, children }: Props) => {
  return (
    <button
      {...buttonProps}
      className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
    >
      {children}
    </button>
  );
};
