import { SelectItem } from "@/types/formSelect";
import { Dispatch, SetStateAction } from "react";
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
  licensePlateNumber: string;
  setIds: Dispatch<SetStateAction<string[]>>;
  ids: string[];
  totalEmission: string;
  totalProjectedCarbonOffset: string;
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
  des: string | number;
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
  carName: string;
  tripQueueResponse: {
    response: {
      transport_id?: string;
      coordinate?: string;
      estimated_arrival_time: string;
      min_emission: string;
      projected_arbitrage: string;
      best_time?: string;
      status: string;
      best_route?: {
        route_emission?: number;
        factor?: {
          base_emission_factor?: number;
          vehicle_factor?: number;
          weather_factor?: number;
          seasonal_factor?: number;
        };
        estimated_arrival_time?: number;
        estimated_distance?: number;
        route_coordinate: {
          position: any[];
        }[];
      };
    };
    status?: string;
  };
}
