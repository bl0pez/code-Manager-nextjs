"use client";
import { useMemo, useState } from "react";

import { Operator, Team } from "@prisma/client";
import { createCodeBlue } from "@/actions/codePanel/createCodeBlue";
import { SelectOperatos } from "@/components/ui/SelectOperatos";
import { SelectTeamCodeBlue } from "@/components/ui/SelectTeamCodeBlue";
import { Input } from "../input/Input";

interface Props {
  teams: Team[];
  operatos: Operator[];
}

export const CreateCodeBlue = ({ operatos, teams }: Props) => {
  const [team, setTeam] = useState("");
  const [operator, setOperator] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [officer, setOfficer] = useState("");
  const [optionsTeams, setOptionsTeams] = useState<Team[]>([]);
  // const [optionsOperators, setOptionsOperators] = useState<Operator[]>([]);

  useMemo(() => {
    setOptionsTeams(teams);
  }, [teams]);

  // useMemo(() => {
  //   setOptionsOperators(operatos);
  // }, [operatos]);

  const onSubmit = async () => {
    const formData = new FormData();
    formData.append("createdAt", new Date(date).toISOString());
    formData.append("team", team);
    formData.append("location", location);
    formData.append("operator", operator);
    formData.append("officer", officer);

    const codeBlue = await createCodeBlue(formData);

    if (!codeBlue.ok) return;

    setDate(new Date().toISOString().slice(0, 16));
    setTeam("");
    setOperator("");
    setLocation("");
    setOfficer("");
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
            id="createdAt"
            name="createdAt"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </td>
      <td>
        <SelectTeamCodeBlue
          value={team}
          teams={optionsTeams}
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
