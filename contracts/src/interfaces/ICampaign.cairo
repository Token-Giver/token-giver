use starknet::ContractAddress;
use tokengiver::base::types::Campaign;
// *************************************************************************
//                              INTERFACE of TOKEN GIVER NFT
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
    fn set_donation_count(ref self: TState, campaign_address: ContractAddress);
    fn get_campaign_metadata(self: @TState, campaign_address: ContractAddress) -> ByteArray;
    fn get_campaign(self: @TState, campaign_address: ContractAddress) -> Campaign;
    fn get_campaigns(self: @TState) -> Array<ByteArray>;
    fn get_user_campaigns(self: @TState, user: ContractAddress) -> Array<ByteArray>;
    fn get_donation_count(self: @TState, campaign_address: ContractAddress) -> u16;
}
