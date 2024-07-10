use starknet::ContractAddress;
use tokengiver::base::types::Campaign;
// *************************************************************************
//                              INTERFACE of KARST NFT
// *************************************************************************

#[starknet::interface]
pub trait ICampaign<TState> {
    fn create_campaign(
        ref self: TState,
        token_giverNft_contract_address: ContractAddress,
        registry_hash: felt252,
        implementation_hash: felt252,
        salt: felt252,
        recipient: ContractAddress
    ) -> ContractAddress;
    fn set_campaign_metadata_uri(
        ref self: TState, campaign_address: ContractAddress, metadata_uri: ByteArray
    );
    fn get_campaign_metadata(self: @TState, campaign_address: ContractAddress) -> ByteArray;
    fn get_campaign(ref self: TState, campaign_address: ContractAddress) -> Campaign;
}
