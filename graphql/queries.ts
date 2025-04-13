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
        location
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

export const GET_CAMPAIGN_BY_ID = gql`
  query GetCampaignById($campaignId: Int!) {
    getCampaignById(campaignId: $campaignId) {
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
      campaign_images
      category {
        id
        name
        created_at
      }
      category_id
      location
      updated_at
      created_at
    }
  }
`;

export const GET_CAMPAIGNS_BY_CATEGORY = gql`
  query GetCampaignsByCategory($name: String!, $cursor: String, $limit: Int) {
    getCampaignsByCategory(name: $name, cursor: $cursor, limit: $limit) {
      hasNextPage
      endCursor
      items {
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
        campaign_images
        location
        updated_at
        created_at
      }
    }
  }
`;
