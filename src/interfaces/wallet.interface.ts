export enum PointWalletDialog {
  TRANSFER = "transfer",
  SUCCESS = "success",
  P2P = "p2p",
  CONFIRM_TRANSACTION = "confirm_transaction",
  P2P_SUCCESS = "p2p_success",
}

export enum CashWalletDialog {
  TRANSFER = "transfer",
  SUCCESS = "success",
  CONFIRM_TRANSACTION = "confirm_transaction",
}

export enum WithdrawalWalletDialog {
  WITHDRAWAL_METHOD = "withdrawal_method",
  BANK_PAYOUT = "bank_payout",
  CARD_PAYOUT = "card_payout",
  SUCCESS = "withdrawal_success",
}

export interface WalletCoinSettingsInput {
  coinConversionRate: number;
  defaultLoginCoinReward: number;
  minimumAmountOfCoin: number;
  yearlyCarbonOffset: number;
  firstPurchaseForMarketPlaceReward: number;
}
