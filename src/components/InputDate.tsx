import { FormControl, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";

// import { formatISO } from "date-fns";

interface Props {
  name: string;
  value: Date;
  onChange: (value: Date) => void;
}

export const InputDate = ({ name, onChange, value }: Props) => {
  return (
    <FormItem>
      <FormLabel>Fecha y hora</FormLabel>
      <FormControl>
        <Input
          value={value ? value.toISOString().slice(0, -8) : ""}
          name={name}
          onChange={(e) => {
            onChange(new Date(e.target.value));
          }}
          type="datetime-local"
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};
