export enum WalletType {
  CASH_WALLET = "CASH_WALLET",
  COIN_WALLET = "COIN_WALLET",
  CARBON_CREDIT = "CARBON_CREDIT",
}

export enum TransactionType {
  CREDIT = "CREDIT",
  DEBIT = "DEBIT",
}

export interface ITransaction {
  _id: string;
  cashWalletId: string;
  userId: string;
  amount: number;
  date: string;
  walletType: WalletType;
  transactionType: TransactionType;
  description: string;
  createdAt: string;
  updatedAt: string;
  __v: 0;
}
