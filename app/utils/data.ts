// IMPORTS
import { Contract, RpcProvider } from "starknet";
import campaign_contract_abi from "../../public/abi/campaign_abi.json";
import nft_contract_abi from "../../public/abi/nft_abi.json";
import token_abi from "../../public/abi/token_abi.json";

// TOKEN GIVER NFT COLLECTION CONTRACT ADDRESS
export const TOKEN_GIVER_Nft_CONTRACT_ADDRESS =
  "0x6db289f5eebb0851089dc9a6ea26aaeea1da4a3724a667a91911e004dfab688";

// TOKEN GIVER CAMPAIGN CONTRACT ADDRESS
export const CAMPAIGN_CONTRACT_ADDRESS =
  "0x6a71ae1fad7070249fd5a191701a7851f3d919def3b7fa1278df02ce5e293a4";

// STRK SEPOLIA CONTRACT ADDRESS
export const STRK_SEPOLIA: string =
  "0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d";

// PINATA BEARER TOKEN
export const BEARER_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJjOWU2MDAxNy00YTgwLTQ4ZWEtYmY3MS1kYTZlMDM0NjBjMTIiLCJlbWFpbCI6InNhbGFraTE5MDJAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImZmY2NmNzY3MWM4ZjZmOTI5Yzg0Iiwic2NvcGVkS2V5U2VjcmV0IjoiMmE4NzRhNjVmY2I3OGIwOTAzNWMxMmNhNWYzMGU2MTU0YWUzMDBiNTkzNGVmZGYwMzYyNjQwNmEwOTY4ODIwYiIsImV4cCI6MTc1MTc4OTg4NH0.Ppobgyjslmtq59sngD6i2Dg7pCvGZT4dyXFbhQWKUQg";

// RPC PROVIDER
export const provider = new RpcProvider({
  nodeUrl: "https://starknet-sepolia.public.blastapi.io"
});

// TOKEN GIVER CAMPAIGN CONTRACT
export const campaign_contract = new Contract(
  campaign_contract_abi,
  CAMPAIGN_CONTRACT_ADDRESS,
  provider
);

// TOKEN GIVER NFT CONTRACT
export const nft_contract = new Contract(
  nft_contract_abi,
  TOKEN_GIVER_Nft_CONTRACT_ADDRESS,
  provider
);

// STRK SEPOLIA CONTRACT
export const strk_contract = new Contract(token_abi, STRK_SEPOLIA, provider);

// TBA CONTRACT ADDRESS (SEPOLIA)
export const TBAcontractAddress_SEPOLIA: string =
  "0x4101d3fa033024654083dd982273a300cb019b8cb96dd829267a4daf59f7b7e";

// TBA IMPLEMENTAION ACCOUNT (SEPOLIA)
export const TBAImplementationAccount_SEPOLIA: string =
  "0x45d67b8590561c9b54e14dd309c9f38c4e2c554dd59414021f9d079811621bd";

// TBA RIGISTRY HASH
export const REGISTRY_HASH =
  "0x46163525551f5a50ed027548e86e1ad023c44e0eeb0733f0dab2fb1fdc31ed0";

// TBA IMPLEMENTATION HASH
export const IMPLEMENTATION_HASH =
  "0x45d67b8590561c9b54e14dd309c9f38c4e2c554dd59414021f9d079811621bd";
