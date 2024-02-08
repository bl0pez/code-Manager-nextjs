interface Props {
  title: string;
}

export const Title = ({ title }: Props) => {
  return <h1 className="text-2xl font-semibold text-gray-800 py-4">{title}</h1>;
};
