import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

export function PostTitle({ children }: Props) {
  return (
    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-zinc-100">
      {children}
    </h1>
  );
}
