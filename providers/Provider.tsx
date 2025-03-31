"use client";
import ApollosProvider from "./Apollo.provider";
import StarknetProvider from "./StarknetProvider";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ApollosProvider>
      <StarknetProvider>{children}</StarknetProvider>
    </ApollosProvider>
  );
};

export default Provider;
