import { gql } from "@apollo/client";

export const GET_ALL_CAMPAIGNS = gql`
  query GetAllCampaigns {
    getAllCampaigns {
      campaign_id
      token_id
      campaign_address
      campaign_owner
      nft_token_uri
      token_giver_nft_contract_address
      campaign_name
      campaign_description
      cover_photo
      social_links
      target_amount
      total_donations
      organizer
      beneficiary
      category_id
      updated_at
      created_at
      category {
        id
        name
      }
      campaign_images {
        id
        url
        campaign_id
        created_at
      }
    }
  }
`;
