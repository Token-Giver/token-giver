export interface ICampaign {
  campaign_id: string;
  campaign_name: string;
  campaign_description: string;
  cover_photo: string;
  total_donations: number;
  target_amount: number;
  campaign_address: string;
  campaign_images: string[];
  organizer: string;
  beneficiary: string;
  location: string;
  created_at: string;
}
