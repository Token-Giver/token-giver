import { CallData } from "starknet";
import {
  IMPLEMENTATION_HASH,
  REGISTRY_HASH,
  TOKEN_GIVER_Nft_CONTRACT_ADDRESS,
  campaign_contract,
  nft_contract,
  provider,
} from "./data";

type CreateCampaignParams = {
  account: any;
  inputData: any;
};

export const fetchContentFromIPFS = async (cid: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL}${cid}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_API_KEY}`
    );
    const data = await response.json();

    return { ...data, cid: cid };
  } catch (error) {
    console.error(`Error fetching data for CID ${cid}:`, error);
    return null;
  }
};

export const createCampaign = async ({
  account,
  inputData,
}: CreateCampaignParams) => {
  try {
    campaign_contract.connect(account.account);
    const last_minted_id = await nft_contract.get_last_minted_id();
    const salt = Math.floor(Math.random() * 9999)
      .toString()
      .padStart(4, "0");
    console.log(salt, "salt");

    // CREATE CAMAPAIGN -> campaign address
    const create_campaign_res = await campaign_contract.create_campaign(
      CallData.compile([
        TOKEN_GIVER_Nft_CONTRACT_ADDRESS,
        REGISTRY_HASH,
        IMPLEMENTATION_HASH,
        salt,
        account.address,
      ])
    );
    const txnDet = await provider.waitForTransaction(
      create_campaign_res.transaction_hash
    );
    console.log(txnDet, "txn details");
    console.log(create_campaign_res, "create campaign response");

    // Upload Campaign NFT image to pinata
    if (!inputData.image) {
      alert("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", inputData.image);

    const image_upload_res = await fetch(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PINATA_BEARER_TOKEN}`,
        },
        body: formData,
      }
    );

    const image_upload_resData = await image_upload_res.json();
    console.log(image_upload_resData, "image upload response");

    // Create new Metadata URI JSON
    let new_metadata = JSON.stringify({
      id: Number(last_minted_id) + 1,
      image: `ipfs://${image_upload_resData.IpfsHash}/`,
      name: inputData.name,
      description: inputData.description,
      target: inputData.target,
      organizer: inputData.organizer,
      beneficiary: inputData.beneficiary,
      location: inputData.location,
      campaign_address: txnDet.isSuccess() && txnDet.events.at(1)?.from_address,
      created_at: new Date(),
    });

    // Upload new MetadataURI JSON to Pinata
    const metadata_upload_res = await fetch(
      "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PINATA_BEARER_TOKEN}`,
        },
        body: new_metadata,
      }
    );

    const metadata_upload_resData = await metadata_upload_res.json();
    console.log(metadata_upload_resData, "uploaded metadata uri");

    // Call set_metadata_uri function
    campaign_contract.connect(account.account);
    const set_campaign_metadata_res =
      await campaign_contract.set_campaign_metadata_uri(
        CallData.compile([
          txnDet.isSuccess() && txnDet.events[1].from_address,
          `ipfs://${metadata_upload_resData.IpfsHash}/`,
        ])
      );

    console.log(set_campaign_metadata_res, "set campaign metadata response");
  } catch (err) {
    console.log(err);
  }
};
