import { FormControl, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";

interface Props {
  name: string;
  value: Date;
  onChange: (value: Date) => void;
}

export const InputDate = ({ name, value, onChange }: Props) => {
  return (
    <FormItem>
      <FormLabel>Fecha y hora</FormLabel>
      <FormControl>
        <Input
          name={name}
          value={value instanceof Date ? value.toISOString().slice(0, 16) : ""}
          onChange={(e) => {
            return onChange(new Date(e.target.value));
          }}
          type="datetime-local"
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};
