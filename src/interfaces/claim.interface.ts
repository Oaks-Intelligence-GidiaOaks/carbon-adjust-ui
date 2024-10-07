export enum ClaimStatus {
  pending = "pending",
}

export interface IClaim {
  _id: string;
  customerName: string;
  packageName: string;
  grants: string;
  bookingDate: Date;
  claim: number;
  summaryReport: string[];
  status: ClaimStatus;
}

export interface IClaimDataForm {
  name: string;
  description: string;
  category: { label: string; value: string };
  amount: number;
}
