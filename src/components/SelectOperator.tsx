import { Operator } from "@prisma/client";
import { FormItem, FormLabel, FormMessage } from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface Props {
  operators: Operator[];
  onValueChange: (...event: any[]) => void;
  value: string;
  name: string;
}

export const SelectOperator = ({
  operators,
  onValueChange,
  value,
  name,
}: Props) => {
  return (
    <FormItem>
      <FormLabel>Operador</FormLabel>
      <Select name={name} onValueChange={onValueChange} value={value}>
        <SelectTrigger>
          <SelectValue placeholder="Selecciona un operador" />
        </SelectTrigger>
        <SelectContent>
          {operators.map((operator) => (
            <SelectItem key={operator.id} value={operator.fullName}>
              {operator.fullName}
            </SelectItem>
          ))}
        </SelectContent>
        <FormMessage />
      </Select>
    </FormItem>
  );
};
