import { SelectItem } from "@/types/formSelect";
import { PropsValue } from "react-select";

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

interface Location {
  address?: string;
  latitude: number | null;
  longitude: number | null;
}

export interface TravelDetails {
  startLocation: Location;
  destinationLocation: Location;
  modeOfTransport: string;
  transportDetails: PropsValue<SelectItem>;
  plateNumber?: string;
  transportation?: PropsValue<SelectItem>;
  startTimeWindow: string;
  durationOfTravelWindow: number | string;
  routePreference: PropsValue<SelectItem>;
  latestArrivalTime: string;
}

export interface Trips {
  _id: string;
  startLocation: Location;
  destinationLocation: Location;
  modeOfTransport: string;
  transportDetails: string;
  plateNumber?: string;
  startTimeWindow: string;
  durationOfTravelWindow: string;
  routePreference: string;
  latestArrivalTime: string;
}
