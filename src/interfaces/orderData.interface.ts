export interface IResponse {
  question: string;
  response: string;
}

export interface IOrder {
  package: string;
  customerAddress: string;
  price: number;
  customerEmail: string;
  customerPhone: string;
  requiredExtraProd: boolean;
  responses: IResponse[];
}
