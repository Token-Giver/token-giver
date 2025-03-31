export const CREATE_CAMPAIGN_ABI = [
  {
    name: "CampaignImpl",
    type: "impl",
    interface_name: "tokengiver::interfaces::ICampaign::ICampaign"
  },
  {
    name: "core::byte_array::ByteArray",
    type: "struct",
    members: [
      {
        name: "data",
        type: "core::array::Array::<core::bytes_31::bytes31>"
      },
      {
        name: "pending_word",
        type: "core::felt252"
      },
      {
        name: "pending_word_len",
        type: "core::integer::u32"
      }
    ]
  },
  {
    name: "core::integer::u256",
    type: "struct",
    members: [
      {
        name: "low",
        type: "core::integer::u128"
      },
      {
        name: "high",
        type: "core::integer::u128"
      }
    ]
  },
  {
    name: "tokengiver::base::types::Campaign",
    type: "struct",
    members: [
      {
        name: "campaign_address",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        name: "campaign_owner",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        name: "metadata_URI",
        type: "core::byte_array::ByteArray"
      }
    ]
  },
  {
    name: "tokengiver::interfaces::ICampaign::ICampaign",
    type: "interface",
    items: [
      {
        name: "create_campaign",
        type: "function",
        inputs: [
          {
            name: "token_giverNft_contract_address",
            type: "core::starknet::contract_address::ContractAddress"
          },
          {
            name: "registry_hash",
            type: "core::felt252"
          },
          {
            name: "implementation_hash",
            type: "core::felt252"
          },
          {
            name: "salt",
            type: "core::felt252"
          },
          {
            name: "recipient",
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        outputs: [
          {
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        state_mutability: "external"
      },
      {
        name: "set_campaign_metadata_uri",
        type: "function",
        inputs: [
          {
            name: "campaign_address",
            type: "core::starknet::contract_address::ContractAddress"
          },
          {
            name: "metadata_uri",
            type: "core::byte_array::ByteArray"
          }
        ],
        outputs: [],
        state_mutability: "external"
      },
      {
        name: "set_donation_count",
        type: "function",
        inputs: [
          {
            name: "campaign_address",
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        outputs: [],
        state_mutability: "external"
      },
      {
        name: "set_available_withdrawal",
        type: "function",
        inputs: [
          {
            name: "campaign_address",
            type: "core::starknet::contract_address::ContractAddress"
          },
          {
            name: "amount",
            type: "core::integer::u256"
          }
        ],
        outputs: [],
        state_mutability: "external"
      },
      {
        name: "set_donations",
        type: "function",
        inputs: [
          {
            name: "campaign_address",
            type: "core::starknet::contract_address::ContractAddress"
          },
          {
            name: "amount",
            type: "core::integer::u256"
          }
        ],
        outputs: [],
        state_mutability: "external"
      },
      {
        name: "get_campaign_metadata",
        type: "function",
        inputs: [
          {
            name: "campaign_address",
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        outputs: [
          {
            type: "core::byte_array::ByteArray"
          }
        ],
        state_mutability: "view"
      },
      {
        name: "get_campaign",
        type: "function",
        inputs: [
          {
            name: "campaign_address",
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        outputs: [
          {
            type: "tokengiver::base::types::Campaign"
          }
        ],
        state_mutability: "view"
      },
      {
        name: "get_campaigns",
        type: "function",
        inputs: [],
        outputs: [
          {
            type: "core::array::Array::<core::byte_array::ByteArray>"
          }
        ],
        state_mutability: "view"
      },
      {
        name: "get_user_campaigns",
        type: "function",
        inputs: [
          {
            name: "user",
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        outputs: [
          {
            type: "core::array::Array::<core::byte_array::ByteArray>"
          }
        ],
        state_mutability: "view"
      },
      {
        name: "get_donation_count",
        type: "function",
        inputs: [
          {
            name: "campaign_address",
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        outputs: [
          {
            type: "core::integer::u16"
          }
        ],
        state_mutability: "view"
      },
      {
        name: "get_available_withdrawal",
        type: "function",
        inputs: [
          {
            name: "campaign_address",
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        outputs: [
          {
            type: "core::integer::u256"
          }
        ],
        state_mutability: "view"
      },
      {
        name: "get_donations",
        type: "function",
        inputs: [
          {
            name: "campaign_address",
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        outputs: [
          {
            type: "core::integer::u256"
          }
        ],
        state_mutability: "view"
      }
    ]
  },
  {
    kind: "struct",
    name: "tokengiver::campaign::CampaignComponent::CreateCampaign",
    type: "event",
    members: [
      {
        kind: "key",
        name: "owner",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        kind: "key",
        name: "campaign_address",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        kind: "data",
        name: "token_id",
        type: "core::integer::u256"
      }
    ]
  },
  {
    kind: "enum",
    name: "tokengiver::campaign::CampaignComponent::Event",
    type: "event",
    variants: [
      {
        kind: "nested",
        name: "CreateCampaign",
        type: "tokengiver::campaign::CampaignComponent::CreateCampaign"
      }
    ]
  },
  {
    kind: "enum",
    name: "tokengiver::presets::campaign::TokenGiverCampaign::Event",
    type: "event",
    variants: [
      {
        kind: "flat",
        name: "CampaignEvent",
        type: "tokengiver::campaign::CampaignComponent::Event"
      }
    ]
  }
] as const;
