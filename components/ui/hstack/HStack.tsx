import { Div, IDiv } from "../div/Div";
import { cn } from "../utils";

export function HStack({ className, ...props }: IDiv) {
  return <Div className={cn("flex flex-row", className)} {...props} />;
}
