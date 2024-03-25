import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";

interface Props extends React.ComponentProps<typeof Button> {
  isDisabled: boolean;
  title: string;
}

export const TemplateButton = (props: Props) => {
  const { isDisabled, title, ...rest } = props;

  return (
    <Button disabled={isDisabled} {...rest}>
      {isDisabled ? <ReloadIcon className="animate-spin" /> : title}
    </Button>
  );
};
