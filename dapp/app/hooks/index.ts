import { useAccount, useNetwork } from "@starknet-react/core";
import {
  TBAImplementationAccount_SEPOLIA,
  TBAcontractAddress_SEPOLIA,
} from "../utils/data";
import { TokenboundClient } from "starknet-tokenbound-sdk";

export const useTokenBoundSDK = () => {
  const { account } = useAccount();
  console.log(account, "account");
  const options = {
    account: account,
    registryAddress: TBAcontractAddress_SEPOLIA,
    implementationAddress: TBAImplementationAccount_SEPOLIA,
    jsonRPC: `https://starknet-sepolia.g.alchemy.com/starknet/version/rpc/v0_7/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
  };

  let tokenbound: any;

  if (account) {
    tokenbound = new TokenboundClient(options);
  }
  return { tokenbound };
};
