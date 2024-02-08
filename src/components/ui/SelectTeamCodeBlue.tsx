import { Team } from "@/interfaces";

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  teams: Team[];
}

export const SelectTeamCodeBlue = ({ value, onChange, teams }: Props) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className="border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-600 border w-full"
    >
      {teams.map((team) => (
        <option key={team.id} value={team.title}>
          {team.title}
        </option>
      ))}
    </select>
  );
};
