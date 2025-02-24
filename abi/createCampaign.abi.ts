export const CREATE_CAMPAIGN_ABI = [
  {
    name: "CampaignImpl",
    type: "impl",
    interface_name: "tokengiver::interfaces::ICampaign::ICampaign"
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
    name: "tokengiver::base::types::Campaign",
    type: "struct",
    members: [
      {
        name: "campaign_address",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        name: "campaign_id",
        type: "core::integer::u256"
      },
      {
        name: "campaign_owner",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        name: "nft_token_uri",
        type: "core::byte_array::ByteArray"
      },
      {
        name: "token_id",
        type: "core::integer::u256"
      }
    ]
  },
  {
    name: "core::bool",
    type: "enum",
    variants: [
      {
        name: "False",
        type: "()"
      },
      {
        name: "True",
        type: "()"
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
          },
          {
            name: "campaign_id",
            type: "core::integer::u256"
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
        name: "donate",
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
        name: "withdraw",
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
        name: "upgrade",
        type: "function",
        inputs: [
          {
            name: "new_class_hash",
            type: "core::starknet::class_hash::ClassHash"
          }
        ],
        outputs: [],
        state_mutability: "external"
      },
      {
        name: "lock_campaign",
        type: "function",
        inputs: [
          {
            name: "campaign_address",
            type: "core::starknet::contract_address::ContractAddress"
          },
          {
            name: "lock_until",
            type: "core::integer::u64"
          }
        ],
        outputs: [],
        state_mutability: "external"
      },
      {
        name: "update_token_giver_nft",
        type: "function",
        inputs: [
          {
            name: "token_giver_nft_class_hash",
            type: "core::starknet::class_hash::ClassHash"
          },
          {
            name: "token_giver_nft_contract_address",
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        outputs: [],
        state_mutability: "external"
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
      },
      {
        name: "is_locked",
        type: "function",
        inputs: [
          {
            name: "campaign_address",
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        outputs: [
          {
            type: "(core::bool, core::integer::u64)"
          }
        ],
        state_mutability: "view"
      }
    ]
  },
  {
    name: "OwnableImpl",
    type: "impl",
    interface_name: "openzeppelin_access::ownable::interface::IOwnable"
  },
  {
    name: "openzeppelin_access::ownable::interface::IOwnable",
    type: "interface",
    items: [
      {
        name: "owner",
        type: "function",
        inputs: [],
        outputs: [
          {
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        state_mutability: "view"
      },
      {
        name: "transfer_ownership",
        type: "function",
        inputs: [
          {
            name: "new_owner",
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        outputs: [],
        state_mutability: "external"
      },
      {
        name: "renounce_ownership",
        type: "function",
        inputs: [],
        outputs: [],
        state_mutability: "external"
      }
    ]
  },
  {
    name: "constructor",
    type: "constructor",
    inputs: [
      {
        name: "token_giver_nft_class_hash",
        type: "core::starknet::class_hash::ClassHash"
      },
      {
        name: "token_giver_nft_contract_address",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        name: "strk_address",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        name: "owner",
        type: "core::starknet::contract_address::ContractAddress"
      }
    ]
  },
  {
    kind: "struct",
    name: "tokengiver::campaign::TokengiverCampaigns::CreateCampaign",
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
      },
      {
        kind: "data",
        name: "campaign_id",
        type: "core::integer::u256"
      },
      {
        kind: "data",
        name: "nft_token_uri",
        type: "core::byte_array::ByteArray"
      },
      {
        kind: "data",
        name: "token_giver_nft_address",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        kind: "data",
        name: "block_timestamp",
        type: "core::integer::u64"
      }
    ]
  },
  {
    kind: "struct",
    name: "tokengiver::campaign::TokengiverCampaigns::DonationMade",
    type: "event",
    members: [
      {
        kind: "key",
        name: "campaign_address",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        kind: "key",
        name: "donor_address",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        kind: "data",
        name: "amount",
        type: "core::integer::u256"
      },
      {
        kind: "data",
        name: "token_id",
        type: "core::integer::u256"
      },
      {
        kind: "data",
        name: "block_timestamp",
        type: "core::integer::u64"
      }
    ]
  },
  {
    kind: "struct",
    name: "tokengiver::campaign::TokengiverCampaigns::DeployedTokenGiverNFT",
    type: "event",
    members: [
      {
        kind: "data",
        name: "campaign_id",
        type: "core::integer::u256"
      },
      {
        kind: "data",
        name: "token_giver_nft_contract_address",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        kind: "data",
        name: "block_timestamp",
        type: "core::integer::u64"
      }
    ]
  },
  {
    kind: "struct",
    name: "tokengiver::campaign::TokengiverCampaigns::WithdrawalMade",
    type: "event",
    members: [
      {
        kind: "key",
        name: "campaign_address",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        kind: "key",
        name: "recipient",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        kind: "data",
        name: "amount",
        type: "core::integer::u256"
      },
      {
        kind: "data",
        name: "block_timestamp",
        type: "core::integer::u64"
      }
    ]
  },
  {
    kind: "struct",
    name: "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferred",
    type: "event",
    members: [
      {
        kind: "key",
        name: "previous_owner",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        kind: "key",
        name: "new_owner",
        type: "core::starknet::contract_address::ContractAddress"
      }
    ]
  },
  {
    kind: "struct",
    name: "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferStarted",
    type: "event",
    members: [
      {
        kind: "key",
        name: "previous_owner",
        type: "core::starknet::contract_address::ContractAddress"
      },
      {
        kind: "key",
        name: "new_owner",
        type: "core::starknet::contract_address::ContractAddress"
      }
    ]
  },
  {
    kind: "enum",
    name: "openzeppelin_access::ownable::ownable::OwnableComponent::Event",
    type: "event",
    variants: [
      {
        kind: "nested",
        name: "OwnershipTransferred",
        type: "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferred"
      },
      {
        kind: "nested",
        name: "OwnershipTransferStarted",
        type: "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferStarted"
      }
    ]
  },
  {
    kind: "struct",
    name: "openzeppelin_upgrades::upgradeable::UpgradeableComponent::Upgraded",
    type: "event",
    members: [
      {
        kind: "data",
        name: "class_hash",
        type: "core::starknet::class_hash::ClassHash"
      }
    ]
  },
  {
    kind: "enum",
    name: "openzeppelin_upgrades::upgradeable::UpgradeableComponent::Event",
    type: "event",
    variants: [
      {
        kind: "nested",
        name: "Upgraded",
        type: "openzeppelin_upgrades::upgradeable::UpgradeableComponent::Upgraded"
      }
    ]
  },
  {
    kind: "enum",
    name: "tokengiver::campaign::TokengiverCampaigns::Event",
    type: "event",
    variants: [
      {
        kind: "nested",
        name: "CreateCampaign",
        type: "tokengiver::campaign::TokengiverCampaigns::CreateCampaign"
      },
      {
        kind: "nested",
        name: "DonationMade",
        type: "tokengiver::campaign::TokengiverCampaigns::DonationMade"
      },
      {
        kind: "nested",
        name: "DeployedTokenGiverNFT",
        type: "tokengiver::campaign::TokengiverCampaigns::DeployedTokenGiverNFT"
      },
      {
        kind: "nested",
        name: "WithdrawalMade",
        type: "tokengiver::campaign::TokengiverCampaigns::WithdrawalMade"
      },
      {
        kind: "flat",
        name: "OwnableEvent",
        type: "openzeppelin_access::ownable::ownable::OwnableComponent::Event"
      },
      {
        kind: "flat",
        name: "UpgradeableEvent",
        type: "openzeppelin_upgrades::upgradeable::UpgradeableComponent::Event"
      }
    ]
  }
] as const;
