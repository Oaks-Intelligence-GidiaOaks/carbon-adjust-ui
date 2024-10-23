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
  licensePlateNumber: string;
  address: string;
  city: string;
}

export interface VehicleDetailProps {
  title: string;
  des: string;
}
