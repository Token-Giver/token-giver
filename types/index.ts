export interface InputDateType {
  name: string;
  description: string;
  image: File | null;
  images: File[];
  target: string;
  organizer: string;
  beneficiary: string;
  location: string;
}

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
  organizer: string;
  target: string;
}
