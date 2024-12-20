import { MultiValue } from "react-select";

export enum PackageDomain {
  GRANT_PACKAGE = "Grant_Package",
  REGULAR_PACKAGE = "Regular_Package",
  SUB_PACKAGE = "Sub_Package",
}

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
  color:string[];
  media?: string[];
  hasDownloadedableFile?: boolean;
  owner?: {
    name: string;
    _id: string;
  };
  category?: {
    name: string;
    slug: string;
  };
  regions: string[];
  country: string;
  status: string;
  packageType: string;
  price: number | string;
  discount?: number;
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
  minAmount?: number;
  maxAmount?: number;
  hasGrantDoc?: boolean;
  rating?: number;
  packageDomain?: string;
  isHot?: boolean;
  isSoldOut?: boolean;
  isFavourite?: boolean
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

export type QuestionType = {
  label:
    | ""
    | "Binary Response Question"
    | "Open-Ended Question"
    | "Single-Choice Question"
    | "Multiple-Choice Question"
    | "File Upload Response"
    | string;
  value:
    | ""
    | "Binary Response Question"
    | "Open-Ended Question"
    | "Single-Choice Question"
    | "Multiple-Choice Question"
    | "File Upload Response"
    | string;
};

export interface Question {
  title: string;
  questionType: QuestionType;
  options?: string[];
  isRequired: boolean;
  _id?: string;
}

export interface PackageState {
  title: string;
  category: {
    label: string;
    value: string;
  };
  packageType: {
    label: string;
    value: string;
  };
  description: string;
  country: {
    label: string;
    value: string;
  };
  price: string;
  discount: string;
  regions: MultiValue<any>;
  allowPartPayment: boolean;
  percentPayment: string;
  hasSchedule: boolean;
  hasQuestion: boolean;
  questions: Question[];
  askPurchaserQuote: boolean;
  hasDownloadedableFile: boolean;
  isAiEnergyPackage: boolean;
  aiPackageType: {
    label: string;
    value: string;
  };
}

export interface IAddReview {
  packageId: string;
  description: string;
  rating: number;
}
