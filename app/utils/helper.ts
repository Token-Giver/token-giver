import {
  CAMPAIGN_CONTRACT_ADDRESS,
  STRK_SEPOLIA,
  campaign_contract,
  provider,
  strk_contract
} from "./data";
import { formatCurrency } from "./currency";
import { CallData, Uint256, cairo } from "starknet";
import { Campaign } from "@/types";
import { Dispatch, SetStateAction } from "react";

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

export const fetchCampaigns = async (
  campaign_contract: any,
  setLoading: any,
  setCollections: any
) => {
  try {
    const campaigns = await campaign_contract.get_campaigns();
    const campaignPromises = campaigns.map((cid: string) =>
      fetchContentFromIPFS(cid.slice(7, -1))
    );
    const campaignData: Campaign[] = await Promise.all(campaignPromises);
    setCollections(
      campaignData
        .filter((data) => data !== null)
        .sort((a, b) => {
          const dateA = new Date(a.created_at).getTime();
          const dateB = new Date(b.created_at).getTime();
          return dateB - dateA;
        })
    );
    setLoading(false);
  } catch (error) {
    console.log(error);
  }
};

export const fetchBalance = async (address: string, setBalance: any) => {
  try {
    const strk = await strk_contract.balanceOf(address);
    // @ts-ignore
    const strkBalance = formatCurrency(strk.toString());
    setBalance(strkBalance);
  } catch (err) {
    console.log(err);
  }
};

export const fetchDonationBalance = async (
  address: string,
  setBalance: any
) => {
  try {
    let current_donation = await campaign_contract.get_donations(address);
    const balance = formatCurrency(current_donation.toString());
    setBalance(balance);
  } catch (err) {
    console.log(err);
  }
};

export const fetchDonationCount = async (
  address: string,
  setDonationCount: any
) => {
  let count = await campaign_contract.get_donation_count(address);
  setDonationCount(Number(count));
};

export const fetchCampaign = async (
  cid: string,
  setBalance: any,
  setDonationCount: any,
  setCampaignDetails: any,
  setAvailableBalance: any
) => {
  try {
    const data = await fetchContentFromIPFS(cid);
    if (setDonationCount && setBalance) {
      await fetchDonationBalance(data.campaign_address, setBalance);
      await fetchDonationCount(data.campaign_address, setDonationCount);
    }
    if (setAvailableBalance) {
      let balance = await campaign_contract.get_available_withdrawal(
        data.campaign_address
      );
      setAvailableBalance(formatCurrency(balance.toString()));
    }
    if (data) {
      const timestamp = data.created_at;
      const date = new Date(timestamp);
      const day = date.getDate();
      const month = date.toLocaleString("default", { month: "long" });
      const year = date.getFullYear();
      const formattedDate = `Created ${day} ${month} ${year}`;
      const imageUrl = data.image.slice(7, -1);
      setCampaignDetails({
        name: data.name || "",
        description: data.description || "",
        image:
          `${process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL}${imageUrl}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_API_KEY}` ||
          "/default-image.webp",
        date: formattedDate,
        organizer: data.organizer,
        beneficiary: data.beneficiary,
        location: data.location,
        target: data.target,
        address: data.campaign_address
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchUserCampaigns = async (
  address: string,
  setCollections: any,
  setLoading: any
) => {
  try {
    const campaigns: any = await campaign_contract.get_user_campaigns(address);
    const campaignPromises = campaigns.map((cid: string) =>
      fetchContentFromIPFS(cid.slice(7, -1))
    );
    const campaignData = await Promise.all(campaignPromises);
    setCollections(
      campaignData
        .filter((data) => data !== null)
        .sort((a, b) => {
          const dateA = new Date(a.created_at).getTime();
          const dateB = new Date(b.created_at).getTime();
          return dateB - dateA;
        })
    );
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

export const handleDonate = async (
  amount: string,
  account: any,
  setSendingState: Dispatch<
    SetStateAction<"send" | "sending..." | "sent" | "failed">
  >,
  campaign_address: string
) => {
  try {
    if (!amount || !account) {
      return;
    }
    setSendingState("sending...");
    let current_withdrawal =
      await campaign_contract.get_available_withdrawal(campaign_address);
    let current_donation =
      await campaign_contract.get_donations(campaign_address);
    strk_contract.connect(account);
    const toTransferTk: Uint256 = cairo.uint256(Number(amount) * 1e18);
    const multiCall = await account?.execute([
      // Transfer Token
      {
        contractAddress: STRK_SEPOLIA,
        entrypoint: "transfer",
        calldata: CallData.compile({
          recipient: campaign_address,
          amount: toTransferTk
        })
      },
      // Increase Donation Count
      {
        contractAddress: CAMPAIGN_CONTRACT_ADDRESS,
        entrypoint: "set_donation_count",
        calldata: CallData.compile({
          campaign_address
        })
      },
      // Increase withdrawal Available
      {
        contractAddress: CAMPAIGN_CONTRACT_ADDRESS,
        entrypoint: "set_available_withdrawal",
        calldata: CallData.compile({
          campaign_address,
          amount: cairo.uint256(
            (formatCurrency(current_withdrawal.toString()) + Number(amount)) *
              1e18
          )
        })
      },
      // Set donation
      {
        contractAddress: CAMPAIGN_CONTRACT_ADDRESS,
        entrypoint: "set_donations",
        calldata: CallData.compile({
          campaign_address,
          amount: cairo.uint256(
            (formatCurrency(current_donation.toString()) + Number(amount)) *
              1e18
          )
        })
      }
    ]);
    if (!multiCall) {
      return;
    }
    await provider.waitForTransaction(multiCall.transaction_hash);
    setSendingState("sent");
    // handleRouteToCampaign();
  } catch (err: any) {
    console.log(err.message);
    setSendingState("failed");
    setTimeout(() => {
      setSendingState("send");
    }, 2000);
  }
};

/////////////

export const searchCampaigns = async ({
  campaigns,
  search
}: {
  search: string;
  campaigns: Campaign[];
}) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const lowerCaseSearch = search.toLocaleLowerCase();

  return campaigns.filter(
    (campaign) =>
      campaign.name.toLocaleLowerCase().includes(lowerCaseSearch) ||
      campaign.organizer.toLocaleLowerCase().includes(lowerCaseSearch) ||
      campaign.location.toLocaleLowerCase().includes(lowerCaseSearch)
  );
};

export const toUnixTimestamp = ({
  year,
  month,
  day,
  hour = 0,
  minute = 0,
  second = 0,
  timezoneOffset = null
}: {
  year: number;
  month: number;
  day: number;
  hour?: number;
  minute?: number;
  second?: number;
  timezoneOffset?: number | null;
}): number => {
  const date =
    timezoneOffset !== null
      ? new Date(Date.UTC(year, month - 1, day, hour, minute, second))
      : new Date(year, month - 1, day, hour, minute, second);

  const adjustedTime =
    date.getTime() -
    (timezoneOffset ?? new Date().getTimezoneOffset()) * 60 * 1000;

  return Math.floor(adjustedTime / 1000);
};
