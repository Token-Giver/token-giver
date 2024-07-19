use core::option::OptionTrait;
// *************************************************************************
//                              TYPES
// *************************************************************************
use starknet::ContractAddress;


// * @notice A struct containing profile data.
// * profile_address The profile ID of a karst profile 
// * profile_owner The address that created the profile_address
// * @param pub_count The number of publications made to this profile.
// * @param metadataURI MetadataURI is used to store the profile's metadata, for example: displayed name, description, interests, etc.
#[derive(Drop, Serde, starknet::Store)]
pub struct Campaign {
    campaign_address: ContractAddress,
    campaign_owner: ContractAddress,
    metadata_URI: ByteArray,
}
