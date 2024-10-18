export enum TransportTabs {
  Transport = "Transport",
  TravelHistory = "Travel History",
}

export interface Transport {
  _id: string;
  transportPhoto: string;
  yearOfPurchase: string;
  vehicleManufacturer: string;
  carModel: string;
  fuelType: string;
  address: string;
  city: string;
  emissionFactor: string;
}

export interface ITransport {
  transportPhoto: File | null;
  driversLicense: File | null;
  transportId: File | null;
  yearOfPurchase: string;
  licensePlateNumber: string;
  address: string;
  city: string;
}
