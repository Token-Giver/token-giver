export type InputDateType = {
  name: string;
  description: string;
  image: null | File;
  target: string;
  organizer: string;
  beneficiary: string;
  location: string;
  day: string,
  hour: string,
  minute: string,
  second: string,
  timezone: string,
  instagram: string;
  linkedin: string;
  x: string;
  youtube: string;
  website: string;
  github: string;
};

export interface Campaign {
  beneficiary: string;
  campaign_address: string;
  cid: string;
  created_at: string;
  description: string;
  id: string;
  image: string;
  location: string;
  name: string;
  category?: string
  amountRaised: string;
  organizer: string;
  target: string;
}
