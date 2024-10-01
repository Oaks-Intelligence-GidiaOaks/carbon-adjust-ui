export interface IQuestion {
  title: string;
  _id: string;
  questionType?: string;
  options?: string[];
  isRequired?: boolean;
}

// for energy efficient products
export interface IProduct {
  _id: string;
  title: string;
  attachments: string[];
  media?: string[];
  hasDownloadedableFile?: boolean;
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
  videoUrl?: string;
  __v: number;
  minAmount?: number,
  maxAmount?: number,
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

export interface IAddReview {  
  packageId: string;
  description: string;
  rating: number;
}