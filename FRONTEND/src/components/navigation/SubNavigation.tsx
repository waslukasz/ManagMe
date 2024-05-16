import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

export default function SubNavigation({ children }: Props) {
  return <div className="flex bg-red-400">{children}</div>;
}
