import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  style?: string;
};
export const H1 = ({ children, style }: Props) => {
  return (
    <h1 className={`text-2xl font-semibold font-agrandir ${style} `}>
      {children}
    </h1>
  );
};
export const H2 = ({ children, style }: Props) => {
  return <h2 className={`text-xl ${style}`}>{children}</h2>;
};
export const H3 = ({ children, style }: Props) => {
  return <h3 className={`text-l ${style}`}>{children}</h3>;
};
