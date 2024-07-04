export const JSON_RPC: string =
  "https://starknet-mainnet.g.alchemy.com/starknet/version/rpc/v0_7/YLzkDbFjxig2SRh_ZniVZROre_E31D79";
export const IMPLEMENTATION_HASH: string =
  "0x45d67b8590561c9b54e14dd309c9f38c4e2c554dd59414021f9d079811621bd";
export const REGISTRY_ADDRESS: string =
  "0x7f63abcad960f980c12d650b2cc4c27a8f63ee1f6eb36ea8286a946a2330c1b";
export const TOKEN_CONTRACT: string =
  "0x42e7815d9e90b7ea53f4550f74dc12207ed6a0faaef57ba0dbf9a66f3762d82";
export const TOKEN_ID: string = "37231096265422892774";

export const shortenAddress = (address: string) => {
  if (!address) return null;
  return `${address.substr(0, 6)}...${address.substr(
    address.length - 4,
    address.length
  )}`;
};
