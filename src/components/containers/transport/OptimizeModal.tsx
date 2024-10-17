import { Button } from "../../ui";
import { FaLocationDot, FaLocationCrosshairs } from "react-icons/fa6";
import { TbArrowsExchange2 } from "react-icons/tb";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Modal from "../../dialogs/Modal";
import {  useState } from "react";
import TransportMap from "./TransportMap";
import taxi from "../../../assets/taxi3.png";
import train from "../../../assets/emojione_train.png";
import bus from "../../../assets/noto_bus.png";
import axios from "axios";
import CustomMapInput from "@/components/ui/customMapInput";
import SelectInput from "@/components/ui/SelectInput";
import { energySources } from "@/constants/devices";
// import arrows from "../../../assets/arrows.png";

const Modes = [
  { name: "car", Icon: taxi },
  { name: "train", Icon: train },
  { name: "bus", Icon: bus },
];


type OptimizeModalProps = {
  onClick: () => void;
};

const OptimizeModal = ({ onClick }: OptimizeModalProps) => {
  const [mode, setMode] = useState<string | undefined>("car");
  const [startSuggestions, setStartSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [start, setStart] = useState("");
  const [destination, setDestination] = useState("");
  const [positions, setPositions] = useState([]);
  const [isShow, setIsShow] = useState(false);

  

  const fetchSuggestions = async (query, setSuggestions) => {
    try {
      const requestUrl = import.meta.env.VITE_GEO_CODE_URL.replace(
        "{query}",
        encodeURIComponent(query)
      )
        .replace("{language}", "en-US")
        .replace("{subKey}", import.meta.env.VITE_AZURE_KEY);

      const response = await axios.get(requestUrl, {
        headers: {
          // "x-ms-client-id": clientId,
          // Authorization: `Bearer ${token}`,
          "Content-Type": "application/json; charset=utf-8",
        },
      });

      setSuggestions(response.data.results || []);
    } catch (err) {
      console.error("Error fetching suggestions:", err);
    }
  };

  const handleOptionClick = (
    type: "start" | "destination",
    location: any
    // closeModal: () => void
  ) => {
    setIsShow(false);
    
    if (type === "start") {
      setStart(location.address.freeformAddress);
    } else {
      setDestination(location.address.freeformAddress);
    }

  
    const newPosition = {
      name: type,
      text: type === "start" ? "S" : "D",
      position: [location.position.lon, location.position.lat],
      address: location.address.freeformAddress,
    };

    
    setPositions((prev) => {
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
                  isShow={isShow}
                  onChange={(e) => {
                    setIsShow(!isShow);
                    setStart(e.target.value);
                    if (e.target.value.length >= 3) {
                      fetchSuggestions(e.target.value, setStartSuggestions);
                    }
                  }}
                  options={startSuggestions}
                  handleOptionClick={(location) =>
                    handleOptionClick("start", location)
                  }
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
                  isShow={isShow}
                  icon={<FaLocationCrosshairs size={20} color="#3465AF" />}
                  onChange={(e) => {
                    setIsShow(!isShow);
                    setDestination(e.target.value);
                    if (e.target.value.length >= 3) {
                      fetchSuggestions(
                        e.target.value,
                        setDestinationSuggestions
                      );
                    }
                  }}
                  options={destinationSuggestions}
                  handleOptionClick={(location) =>
                    handleOptionClick("destination", location)
                  }
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
