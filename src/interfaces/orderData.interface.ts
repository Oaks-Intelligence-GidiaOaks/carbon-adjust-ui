export interface IResponse {
  question: string;
  response: string;
}

export interface IOrder {
  package?: string;
  customerAddress: string;
  price?: number | string;
  customerEmail: string;
  customerPhone: string;
  quantity?: number | string;
  requiredExtraProd?: boolean;
  responses: IResponse[];
  _id?: string;
}
