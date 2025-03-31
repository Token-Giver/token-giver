import { gql } from "@apollo/client";

export const CREATE_CAMPAIGN = gql`
  mutation CreateCampaign($campaignData: CampaignCreateInput!) {
    createCampaign(campaignData: $campaignData) {
      campaign_id
      campaign_name
      campaign_description
      cover_photo
      social_links
      target_amount
      total_donations
      organizer
      beneficiary
      category_id
    }
  }
`;
