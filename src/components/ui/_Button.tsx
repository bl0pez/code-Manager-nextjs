interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  icon?: React.ReactNode;
  isLoading?: boolean;
}

export const Button = (props: Props) => {
  const { isLoading, title, icon, ...rest } = props;

  return (
    <button
      {...rest}
      disabled={isLoading}
      className="bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed flex justify-center items-center px-4"
    >
      {isLoading ? (
        <div
          className="w-5 h-5 rounded-full animate-spin
          border-4 border-solid border-indigo-700 border-t-transparent"
        ></div>
      ) : (
        title
      )}
    </button>
  );
};
