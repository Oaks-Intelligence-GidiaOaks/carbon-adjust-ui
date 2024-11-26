export enum WalletType {
  CASH_WALLET = "CASH_WALLET",
  COIN_WALLET = "COIN_WALLET",
  CARBON_CREDIT = "CARBON_CREDIT",
}

export enum TransactionType {
  CREDIT = "CREDIT",
  DEBIT = "DEBIT",
}

export enum TransactionStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  FAILED = "failed",
}

export interface ITransaction {
  _id: string;
  cashWalletId: string;
  userId: string;
  date: string;
  walletType: WalletType;
  transactionType: TransactionType;
  amount: number;
  status: TransactionStatus;
  description: string;
  createdAt: string;
  updatedAt: string;
  __v: 0;
}
