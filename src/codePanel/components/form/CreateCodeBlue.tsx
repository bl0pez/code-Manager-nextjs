"use client";
import { Operator, Team } from "@/interfaces";
import { Input } from "../input/Input";
import { useState } from "react";
import { SelectTeamCodeBlue } from "@/components/ui/SelectTeamCodeBlue";
import { SelectOperatos } from "@/components/ui/SelectOperatos";
import { createCodeBlue } from "@/actions/codePanel/createCodeBlue";

interface Props {
  teams: Team[];
  operatos: Operator[];
}

export const CreateCodeBlue = ({ operatos, teams }: Props) => {
  const [team, setTeam] = useState("");
  const [operator, setOperator] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 16));
  const [location, setLocation] = useState("");
  const [officer, setOfficer] = useState("");

  const onSubmit = async () => {
    const formData = new FormData();
    formData.append("createdAt", date);
    formData.append("team", team);
    formData.append("location", location);
    formData.append("operator", operator);
    formData.append("officer", officer);

    const data = await createCodeBlue(formData);
  };

  return (
    <tr
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onSubmit();
        }
      }}
    >
      <td>
        <div>
          <Input
            type="datetime-local"
            id="datepicker"
            name="datepicker"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </td>
      <td>
        <SelectTeamCodeBlue
          value={team}
          teams={teams}
          onChange={(e) => setTeam(e.target.value)}
        />
      </td>
      <td>
        <Input
          id="location"
          onChange={(e) => setLocation(e.target.value)}
          name="location"
          value={location}
          type="text"
          placeholder="Ubicación"
        />
      </td>
      <td>
        <Input
          name="officer"
          onChange={(e) => setOfficer(e.target.value)}
          value={officer}
          type="text"
          placeholder="Nombre funcionario/a"
        />
      </td>
      <td>
        <SelectOperatos
          value={operator}
          operatos={operatos}
          onChange={(e) => setOperator(e.target.value)}
        />
      </td>
    </tr>
  );
};
