// *************************************************************************
//                            ERRORS
// *************************************************************************
pub mod Errors {
    pub const NOT_CAMPAIGN_OWNER: felt252 = 'Karst: not campaign owner!';
    pub const ALREADY_MINTED: felt252 = 'Karst: user already minted!';
    pub const INITIALIZED: felt252 = 'Karst: already initialized!';
    pub const INVALID_OWNER: felt252 = 'Karst: caller is not owner!';
    pub const INVALID_CAMPAIGN: felt252 = 'Karst: campaign is not owner!';
}
