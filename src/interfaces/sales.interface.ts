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
  category:  PropsValue<SelectItem>;
  packageType:  PropsValue<SelectItem>;
  quantity: string;
  askPurchaserQuote: boolean;
  colors: string[];
  price: string;
  sku: string;
  reOrderPoint: string;
}

export interface UProductForm {
  title: string;
  comment: string;
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

// {
//   "_id": "67504c6a93741a78e4e189c9",
//   "title": "yoga",
//   "owner": "6662281bfa9153dfc09b7cb2",
//   "category": {
//       "_id": "66648d839619f2263c4e4d27",
//       "name": "Complimentary Benefits"
//   },
//   "price": 5000,
//   "quantity": 56,
//   "color": [],
//   "createdAt": "2024-12-04T12:34:50.785Z",
//   "inventoryStatus": "In-Stock",
//   "quantityLeft": 56
// },