import { IQuestion } from "@/interfaces/product.interface";

export type Product = {
  _id: string;
  isHot: boolean;
  image: string;
  rating: number;
  title: string;
  price: string;
  slug: string;
  discount?: string | number;
  discount?: string;
  questions: IQuestion[];
  // checkout?: (it: Product) => void;
};

export type Package = {
  _id: string;
  title: string;
  price: string;
  rating?: number;
  status: string;
  packageType: string;
  image?: string;
  catgeory?: string;
  publish?: () => void;
};
