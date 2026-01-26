import { HTMLAttributes, ReactNode } from 'react';

export interface IDiv extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export function Div({ children, ...props }: IDiv) {
  return <div {...props}>{children}</div>;
}
