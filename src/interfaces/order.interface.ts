import { IProduct } from "./product.interface";

export enum Activity {
  Quote = "REQUEST_QUOTE",
  Call = "SCEHDULE_CALL",
}

export enum InitiatorRole {
  HomeOwner = "HOME_OCCUPANT",
  Merchant = "MERCHANT",
}

export enum ActivityStatus {
  Completed = "completed",
  Pending = "pending",
  Cancelled = "cancelled",
}

export interface IOrderActivity {
  activity: Activity;
  initatedAt: string;
  initiator: string;
  initiatorRole: InitiatorRole;
  responder: string;
  response: string;
  responderRole: InitiatorRole;
  status: ActivityStatus;
  _id: string;
}

export enum OrderStatus {
  Pending = "pending",
  Initiated = "initiated",
  Completed = "completed",
  Cancelled = "cancelled",
}

export enum PaymentStatus {
  Paid = "paid",
  Unpaid = "unpaid",
}

export interface IPackageOrder {
  _id: string;
  customerAddress: string;
  customerEmail: string;
  customerPhone: string;
  paymentStatus: PaymentStatus;
  orderActivities: IOrderActivity[];
  package: IProduct;
  price: number | string;
  quantity?: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  aiOrderResponse: string;
  __v: number;
}
