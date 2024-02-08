"use client";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";

import { Operator } from "@prisma/client";
import { createCodeBlue } from "@/actions/codePanel/codeBlue/createCodeBlue";
import { SelectOperatos } from "@/components/ui/SelectOperatos";
import { Input } from "../input/Input";
import { SelectPolice } from "@/components/ui/SelectPolice";

interface Props {
  operatos: Operator[];
}

export const CreateCodeGreen = ({ operatos }: Props) => {
  const [createdAt, setCreatedAt] = useState("");
  const [location, setLocation] = useState("");
  const [event, setEvent] = useState("");
  const [police, setPolice] = useState<Boolean>(false);
  const [informant, setInformant] = useState("");
  const [operator, setOperator] = useState("");
  const [optionsOperators, setOptionsOperators] = useState<Operator[]>([]);

  useMemo(() => {
    setOptionsOperators(operatos);
  }, [operatos]);

  const onSubmit = async () => {
    const formData = new FormData();
    formData.append("createdAt", createdAt);
    formData.append("location", location);
    formData.append("operator", operator);
    formData.append("informant", informant);

    const codeBlue = await createCodeBlue(formData);

    if (!codeBlue.ok) {
      toast.error(codeBlue.message);
      return;
    }

    setCreatedAt("");
    setOperator("");
    setLocation("");
    setInformant("");
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
        <Input
          type="datetime-local"
          id="createdAt"
          name="createdAt"
          value={createdAt}
          onChange={(e) => setCreatedAt(e.target.value)}
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
          name="event"
          onChange={(e) => setEvent(e.target.value)}
          value={event}
          type="text"
          placeholder="Detalle del evento"
        />
      </td>
      <td>
        <SelectPolice
          value={police}
          onChange={(e) => setPolice(e.target.value === "Si")}
        />
      </td>
      <td>
        <Input
          name="informant"
          onChange={(e) => setInformant(e.target.value)}
          value={informant}
          type="text"
          placeholder="Nombre del funcionario"
        />
      </td>
      <td>
        <SelectOperatos
          value={operator}
          operatos={optionsOperators}
          onChange={(e) => setOperator(e.target.value)}
        />
      </td>
    </tr>
  );
};
