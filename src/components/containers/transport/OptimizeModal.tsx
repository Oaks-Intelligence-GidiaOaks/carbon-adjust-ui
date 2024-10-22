import { Button } from "../../ui";
import { FaLocationDot, FaLocationCrosshairs } from "react-icons/fa6";
import { TbArrowsExchange2 } from "react-icons/tb";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Modal from "../../dialogs/Modal";
import { useState } from "react";
import TransportMap from "./TransportMap";
import taxi from "../../../assets/taxi3.png";
import train from "../../../assets/emojione_train.png";
import bus from "../../../assets/noto_bus.png";
import { useQuery } from "@tanstack/react-query";
import CustomMapInput from "@/components/ui/customMapInput";
import SelectInput from "@/components/ui/SelectInput";
import { useDebounce } from "@/utils/debounce";
import { getSuggestions } from "@/services/homeOwner";
// import arrows from "../../../assets/arrows.png";

const Modes = [
  { name: "car", Icon: taxi },
  { name: "train", Icon: train },
  { name: "bus", Icon: bus },
];

type Position = {
  name: "start" | "destination";
  text: string;
  position: [number, number];
  address: string;
};

type OptimizeModalProps = {
  onClick: () => void;
};

const OptimizeModal = ({ onClick }: OptimizeModalProps) => {
  const [mode, setMode] = useState<string | undefined>("car");
  const [start, setStart] = useState("");
  const [destination, setDestination] = useState("");
  const [positions, setPositions] = useState([]);

  const debouncedStart = useDebounce(start, 500);
  const debouncedDestination = useDebounce(destination, 500);

  const { data: startSuggestions } = useQuery({
    queryKey: ["suggestions", debouncedStart],
    queryFn: () => getSuggestions(debouncedStart),
    enabled: debouncedStart.length >= 3,
    staleTime: 5 * 60 * 1000,
  });

  const { data: destinationSuggestions } = useQuery({
    queryKey: ["suggestions", debouncedDestination],
    queryFn: () => getSuggestions(debouncedDestination),
    enabled: debouncedDestination.length >= 3,
    staleTime: 5 * 60 * 1000,
  });

  const handleOptionClick = (
    type: "start" | "destination",
    location: {
      address: {
        freeformAddress: string;
      };
      position: {
        lon: number;
        lat: number;
      };
    }
  ) => {
    if (type === "start") {
      setStart(location.address.freeformAddress);
    } else {
      setDestination(location.address.freeformAddress);
    }

    const newPosition: Position = {
      name: type,
      text: type === "start" ? "S" : "D",
      position: [location.position.lon, location.position.lat],
      address: location.address.freeformAddress,
    };
    // @ts-ignore
    setPositions((prev: Position[]) => {
      const updatedPositions = prev.filter((p) => p.name !== type);
      return [...updatedPositions, newPosition];
    });
  };

  return (
    <>
      <Modal>
        <div className="w-[90%] sm:w-[50%] bg-white h-[90%] rounded-lg p-5 overflow-y-scroll">
          <div className="sticky top-0 flex justify-end  p-5">
            <button className="text-gray-500 text-2xl" onClick={onClick}>
              ✕
            </button>
          </div>
          <div className="flex  flex-col justify-start sm:p-10 p-2">
            <h2 className="text-2xl font-medium text-[#495057] capitalize mb-5 font-poppins">
              optimize trip
            </h2>
            <form className="mt-5">
              <div className="flex sm:flex-row flex-col justify-between w-full sm:items-center items-start  gap-5 ">
                <CustomMapInput
                  inputName="start"
                  label="start"
                  value={start}
                  icon={<FaLocationDot size={20} color="#3465AF" />}
                  onChange={(e) => setStart(e.target.value)}
                  options={startSuggestions}
                  handleOptionClick={(location: any) => {
                    handleOptionClick("start", location);
                  }}
                />

                <div className="sm:flex hidden items-center justify-center mt-10 text-gray-600">
                  <TbArrowsExchange2 size={30} />
                </div>
                <div className="flex sm:hidden items-center justify-start ml-2 text-gray-600">
                  <HiOutlineDotsVertical size={20} />
                </div>

                <CustomMapInput
                  inputName="destination"
                  label="destination"
                  value={destination}
                  icon={<FaLocationCrosshairs size={20} color="#3465AF" />}
                  onChange={(e) => setDestination(e.target.value)}
                  options={destinationSuggestions}
                  handleOptionClick={(location:any) => {
                    handleOptionClick("destination", location);
                  }}
                />
              </div>

              <div className="flex flex-col sm:justify-center justify-start my-5">
                <div className="sm:flex hidden items-center justify-start text-gray-600 w-[80%] mx-auto">
                  <h2 className="text-sm font-medium text-[#495057] capitalize mb-3 font-poppins">
                    Mode of transport
                  </h2>
                </div>

                <div className="flex justify-center w-full">
                  <div className="flex flex-col sm:flex-row  sm:w-[80%] w-full justify-start ">
                    {Modes.map((item, index) => (
                      <div
                        key={index}
                        className={`w-full sm:max-w-[250px] h-[80px] border rounded-lg p-2 m-2 cursor-pointer ${
                          mode === item.name ? "bg-gray-200" : ""
                        }`}
                        onClick={() => setMode(item.name)}
                      >
                        <div>
                          <img
                            src={item.Icon}
                            alt=""
                            className="rounded-md object-cover"
                          />
                          <p className="w-full text-xs sm:text-sm text-gray-700">
                            {item.name}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex sm:flex-row flex-col justify-between w-full sm:items-center items-start  gap-5 mt-3 sm:mt-10">
                <div className="space-y-2 w-full">
                  <h2 className="pl-2 text-sm">Start time of Travel window</h2>

                  <SelectInput
                    options={[]}
                    // value={formData.energySource}
                    // onChange={(e) => handleSelectInputChange(e, "energySource")}
                  />
                </div>

                <div className="space-y-2 w-full">
                  <h2 className="pl-2 text-sm">Route</h2>

                  <SelectInput
                    options={[]}
                    // value={formData.energySource}
                    // onChange={(e) => handleSelectInputChange(e, "energySource")}
                  />
                </div>
              </div>

              <div className="flex sm:flex-row flex-col justify-between w-full sm:items-center items-start  gap-5 mt-3 sm:mt-10">
                <div className="space-y-2 w-full">
                  <h2 className="pl-2 text-sm">Duration of Travel window</h2>

                  <SelectInput
                    options={[]}
                    // value={formData.energySource}
                    // onChange={(e) => handleSelectInputChange(e, "energySource")}
                  />
                </div>

                <div className="space-y-2 w-full">
                  <h2 className="pl-2 text-sm">Latest arrival time</h2>

                  <SelectInput
                    options={[]}
                    // value={formData.energySource}
                    // onChange={(e) => handleSelectInputChange(e, "energySource")}
                  />
                </div>
              </div>
            </form>

            <TransportMap positions={positions} />

            <div className="w-full mx-auto ">
              <Button className="w-full">
                <span>Optimize</span>
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default OptimizeModal;
