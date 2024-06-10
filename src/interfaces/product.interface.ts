export interface IQuestion {
  title: string;
  _id: string;
}

// for energy efficient products
export interface IProduct {
  _id: string;
  title: string;
  attachments: string[];
  owner: string;
  category: string;
  regions: string[];
  country: string;
  status: string;
  packageType: string;
  price: number;
  discount: number;
  hasQuestion: boolean;
  hasSchedule: boolean;
  allowPartPayment: boolean;
  currency: string;
  questions: IQuestion[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ICategory {
  name: string;
  slug: string;
}
