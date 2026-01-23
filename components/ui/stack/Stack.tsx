import { Div, IDiv } from "../div/Div";
import { cn } from "../utils";

export function Stack({ className, ...props }: IDiv) {
  return <Div className={cn("flex flex-col", className)} {...props} />;
}
