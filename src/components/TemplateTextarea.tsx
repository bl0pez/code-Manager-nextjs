import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Textarea } from "./ui/textarea";

interface Props {
  title: string;
  description: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const TemplateTextarea = (props: Props) => {
  const { name, onChange, value, description, title } = props;

  return (
    <FormItem className="col-span-1 sm:col-span-2">
      <FormLabel>
        {title}
        <FormDescription>{description}</FormDescription>
      </FormLabel>
      <FormControl>
        <Textarea
          name={name}
          value={value}
          onChange={(e) => onChange(e)}
          className="resize-none"
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};
