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
  category?: {
    name: string;
    slug: string;
  };
  regions: string[];
  country: string;
  status: string;
  packageType: string;
  price: number | string;
  discount: number;
  hasQuestion: boolean;
  hasSchedule: boolean;
  allowPartPayment: boolean;
  currency: string;
  description?: string;
  questions: IQuestion[];
  createdAt: string;
  updatedAt: string;
  isMerchant?: boolean;
  __v: number;
}

export interface ICategory {
  name: string;
  slug: string;
}

export interface IProdCategory {
  category: {
    name: string;
    slug: string;
  };
  packages: IProduct[];
}
