import { gql } from "@apollo/client";

export const GET_ALL_CAMPAIGNS = gql`
  query getAllCampaigns($cursor: String, $limit: Int) {
    getAllCampaigns(cursor: $cursor, limit: $limit) {
      hasNextPage
      endCursor
      items {
        campaign_name
        created_at
        campaign_id
        cover_photo
        campaign_owner
        campaign_description
        target_amount
        total_donations
        beneficiary
        organizer
        social_links
      }
    }
  }
`;
