import { useAccount, useNetwork } from "@starknet-react/core";
import {
  TBAImplementationAccount_SEPOLIA,
  TBAcontractAddress_SEPOLIA
} from "../utils/data";
import {
  TBAVersion,
  TokenboundClient,
  TokenboundClientOptions
} from "starknet-tokenbound-sdk";
import { useEffect, useState } from "react";

export const useTokenBoundSDK = () => {
  const { account } = useAccount();

  const options = {
    account: account,
    registryAddress: TBAcontractAddress_SEPOLIA,
    implementationAddress: TBAImplementationAccount_SEPOLIA,
    jsonRPC: `https://starknet-sepolia.g.alchemy.com/starknet/version/rpc/v0_7/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
    version: TBAVersion.V3,
    chain_id: "SN_SEPOLIA"
  };

  let tokenbound: any;

  if (account) {
    tokenbound = new TokenboundClient(options);
  }
  return { tokenbound };
};

export const useDebounce = <T>(value: T, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};
