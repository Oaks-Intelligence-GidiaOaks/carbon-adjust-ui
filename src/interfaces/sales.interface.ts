import { SelectItem } from "@/types/formSelect";
import { PropsValue } from "react-select";

export enum SalesTabs {
  Sales = "Sales",
  Inventory = "Inventory",
}

export enum InventoryTabs {
  All = "All",
  History = "History",
}

interface PackageCategory {
  _id: string;
  name: string;
}

interface PackageDetails {
  _id: string;
  title: string;
  category: PackageCategory;
  packageType: string;
  quantity: number;
  quantityLeft: number;
  reOrderPoint: number;
  color: string;
  price: string;
}

interface CustomerDetails {
  _id: string;
  name: string;
}

export interface Isales {
  id: number;
  _id: string;
  package: PackageDetails;
  status: string;
  customer: CustomerDetails;
  createdAt: string;
}

export interface ProductForm {
  productPhoto: string | null;
  title: string;
  description: string;
  action?: string;
  category:  PropsValue<SelectItem>;
  packageType:  PropsValue<SelectItem>;
  quantity: string;
  askPurchaserQuote: boolean;
  colors: string[];
  price: string;
}

export interface UProductForm {
  title: string;
  description: string;
  action:  PropsValue<SelectItem>;
  quantity: string;
  price: string;
}

interface PackageCategory {
  _id: string;
  name: string;
}

interface Package {
  _id: string;
  title: string;
  owner: string;
  category: PackageCategory;
  status: string;
  packageType: string;
  price: number;
  sku: string;
  quantity: number;
  color: string[];
  quantityLeft: number;
  inventoryStatus: string;
}

interface Creator {
  _id: string;
  name: string;
}

export interface InventoryAction {
  _id: string;
  packageId: Package;
  creator: Creator;
  action: string;
  createdAt: string;
  updatedAt: string;
  comment: string;
}

