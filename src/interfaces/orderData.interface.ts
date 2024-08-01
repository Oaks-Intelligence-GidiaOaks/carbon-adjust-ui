export interface IResponse {
  question: string;
  response: string;
  isRequired?: boolean;
}

export interface ISelectInput {
  label: string;
  value: string;
}

export interface IAddress {
  country: ISelectInput;
  cityOrProvince: ISelectInput;
  firstLineAddress: string;
  zipcode: string;
}

export interface IOrder {
  package?: string;
  customerAddress: IAddress;
  price?: number | string;
  customerEmail?: string;
  customerPhone: string;
  quantity?: number | string;
  requiredExtraProd?: boolean;
  responses: IResponse[];
  _id?: string;
}
