import useContactMap from "@/hooks/useContactMap";
import { useRef } from "react";

type Props = {};

const Map = (_: Props) => {
  const mapRef = useRef(null);

  useContactMap(mapRef.current);
  return (
    <div
      // src={mapPlaceholder}
      ref={mapRef}
      id="myMap"
      // alt="map"
      className="relative z-[2] object-cover w-full h-full bg-gray-100"
    />
  );
};

export default Map;
