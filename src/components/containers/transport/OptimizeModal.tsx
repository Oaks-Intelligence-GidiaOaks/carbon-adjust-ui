//@ts-nocheck
import { Button, Input } from "../../ui";
import toast from "react-hot-toast";
import { FaLocationDot, FaLocationCrosshairs } from "react-icons/fa6";
import { TbArrowsExchange2 } from "react-icons/tb";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Modal from "../../dialogs/Modal";
import { useState } from "react";
import TransportMap from "./TransportMap";
import taxi from "../../../assets/taxi3.png";
import train from "../../../assets/emojione_train.png";
import bus from "../../../assets/noto_bus.png";
import { useQuery, useMutation } from "@tanstack/react-query";
import CustomMapInput from "@/components/ui/customMapInput";
import SelectInput from "@/components/ui/SelectInput";
import { useDebounce } from "@/hooks/useDebounce";
import { getSuggestions, getTransports, Optimize } from "@/services/homeOwner";
import {
  TravelDetails,
  VehicleDetailProps,
} from "@/interfaces/transport.interface";
import {
  OptimizeBy,
  TransportDetails,
  TravelWindow,
} from "@/constants/transport";
import { formatTimeToISO, validateOptimizeInputs } from "@/lib/utils";
import { RotatingLines } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { setTransportTab } from "@/features/assetSlice";
import { useLocation } from "react-router-dom";
import { OpTabs } from "@/interfaces/device.interface";
import TabToggler from "../TabToggler";
import VehicleDetail from "./TransportDetail";

const Modes = [
  { name: "Car", Icon: taxi },
  { name: "Train", Icon: train },
  { name: "Bus", Icon: bus },
];

type Position = {
  name: "start" | "destination";
  text: string;
  position: [number, number];
  address: string;
};

type OptimizeModalProps = {
  setShowModal: (value: boolean) => void;
};

const OptimizeModal = ({ setShowModal }: OptimizeModalProps) => {
  const dispatch = useDispatch();
  const [mode, setMode] = useState<string>("Car");
  const [optBy, setOptBy] = useState({
    label: "Start time of travel window",
    value: "start",
  });
  const [start, setStart] = useState("");
  const [destination, setDestination] = useState("");
  const [positions, setPositions] = useState([]);
  const tabs: OpTabs[] = [OpTabs.Individual, OpTabs.Staff, OpTabs.Fleet];
  const [activeTab, setActiveTab] = useState<OpTabs>(tabs[0]);

  const { pathname } = useLocation();
  const isOrganization = pathname.includes("/organisation");
  const initialState: TravelDetails = {
    startLocation: {
      address: "",
      latitude: null,
      longitude: null,
    },
    destinationLocation: {
      address: "",
      latitude: null,
      longitude: null,
    },
    modeOfTransport: "Car",
    transportDetails: { label: "", value: "" },
    plateNumber: "",
    transportation: { label: "", value: "" },
    startTimeWindow: "",
    durationOfTravelWindow: "",
    latestArrivalTime: "",
  };

  const [formData, setFormData] = useState<TravelDetails>(initialState);

  const debouncedStart = useDebounce(start, 500);
  const debouncedDestination = useDebounce(destination, 500);

  const { data: transports } = useQuery({
    queryKey: ["transports"],
    queryFn: () => getTransports(""),
  });

  const transformedTransports =
    transports?.data?.transportations?.map((record: any) => ({
      label: record.licensePlateNumber,
      value: record._id,
    })) || [];

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

  const OptimizeTransport = useMutation({
    mutationKey: ["optimize-transport"],
    mutationFn: (transportData: any) => Optimize(transportData),
    onSuccess: (sx: any) => {
      toast.success(sx.message);
      resetForm();
      setShowModal(false);
      dispatch(setTransportTab("Travel History"));
    },
    onError: (ex: any) => {
      toast.error(ex.response.data.message);
    },
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

    if (type === "start") {
      setFormData((prev: TravelDetails) => ({
        ...prev,
        startLocation: {
          address: location.address.freeformAddress,
          latitude: location.position.lat,
          longitude: location.position.lon,
        },
      }));
    } else {
      setFormData((prev: TravelDetails) => ({
        ...prev,
        destinationLocation: {
          address: location.address.freeformAddress,
          latitude: location.position.lat,
          longitude: location.position.lon,
        },
      }));
    }
  };

  const handleSelectInputChange = (e: any, fieldName: string) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: e,
    }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Destructure transportation out of formData
    const {
      transportation,
      plateNumber,
      startTimeWindow,
      latestArrivalTime,
      ...restOfFormData
    } = formData;

    const Payload: any = {
      ...restOfFormData,
      transportDetails: restOfFormData.transportDetails.value,
      durationOfTravelWindow: restOfFormData.durationOfTravelWindow.value,
    };
    if (startTimeWindow) {
      Payload.startTimeWindow = formatTimeToISO(startTimeWindow);
    }

    if (latestArrivalTime) {
      Payload.latestArrivalTime = formatTimeToISO(latestArrivalTime);
    }

    if (transportation && transportation.value.trim() !== "") {
      Payload.transportation = transportation.value;
    }

    if (plateNumber !== "") {
      Payload.plateNumber = plateNumber;
    }

    if (!latestArrivalTime && !startTimeWindow) {
      return toast.error("Provide a start time window or latest arrival time");
    }

    const error = validateOptimizeInputs(Payload);

    if (error) {
      return toast.error(error);
    }

    if (!plateNumber && !transportation.value) {
      return toast.error("Provide a plate number or pick transport");
    }

    OptimizeTransport.mutate(Payload);
  };

  const resetForm = () => {
    setFormData(initialState);
  };

  const handleTabSwitch = (tab: string) => {
    setActiveTab(tab);
  };

  // @ts-ignore
  if (OptimizeTransport.isPending) {
    return (
      <Modal>
        <div className=" w-[90%] sm:w-[60%] bg-white sm:h-[70%] h-[30%] flex justify-center flex-col items-center text-cyan-600">
          <RotatingLines
            visible={true}
            height="96"
            width="96"
            strokeWidth="3"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
            strokeColor="#0891b2"
            wrapperClass=""
          />
          <h2 className="text-2xl font-medium uppercase mt-10 font-poppins">
            optimizing Trip . . .
          </h2>
        </div>
      </Modal>
    );
  }

  return (
    <>
      <Modal>
        <div className="w-[90%] lg:w-[50%] bg-white h-[90%] rounded-lg p-5 overflow-y-scroll">
          <div className="sticky top-0 flex justify-end  p-5">
            <button
              className="text-gray-500 text-2xl"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>
          </div>
          <div className="flex  flex-col justify-start sm:p-10 p-2">
            <h2 className="text-2xl font-medium text-[#495057] capitalize mb-5 font-poppins">
              optimize trip
            </h2>
            {isOrganization && (
              <div className="w-full">
                <TabToggler
                  activeTab={activeTab}
                  onClick={handleTabSwitch}
                  tabs={tabs}
                />
              </div>
            )}
            <form className="mt-5" action="" onSubmit={handleSubmit}>
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
                  handleOptionClick={(location: any) => {
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
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            modeOfTransport: item.name,
                          }));
                          setMode(item.name);
                        }}
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

              {activeTab === "Staff" && (
                <>
                  <div className="flex  bg-[#Fff] border rounded-lg p-5">
                    <div className="grid grid-cols-3 gap-4 w-full">
                      <VehicleDetail title="Staff" des={"N/A"} />
                      <VehicleDetail title="Start" des={"N/A"} />
                      <VehicleDetail title="Destination" des={"N/A"} />
                    </div>
                  </div>
                  <Button
                    //onClick={() => setShowModal(true)}
                    variant={"outline"}
                    className="rounded-[20px] border-cyan-700 h-[20px] p-3 !text-cyan-700 hover:text-cyan-700 flex justify-center items-center gap-1 mt-3 ml-auto text-[12px]"
                  >
                    add new batch
                  </Button>

                  <div className="flex sm:flex-row flex-col justify-between w-full sm:items-center items-start  gap-5 mt-3 sm:mt-10">
                    <div className="space-y-2 w-full">
                      <h2 className="pl-2 text-sm">Batch</h2>

                      <SelectInput
                        options={TravelWindow}
                        value={formData.durationOfTravelWindow}
                        onChange={(e) =>
                          handleSelectInputChange(e, "durationOfTravelWindow")
                        }
                      />
                    </div>

                    <div className="space-y-2 w-full">
                      <h2 className="pl-2 text-sm">Staff</h2>

                      <SelectInput
                        options={TransportDetails}
                        value={formData.transportDetails}
                        onChange={(e) =>
                          handleSelectInputChange(e, "transportDetails")
                        }
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="flex sm:flex-row flex-col justify-between w-full sm:items-center items-start  gap-5 mt-3 sm:mt-10">
                <div className="space-y-2 w-full">
                  <h2 className="pl-2 text-sm">Optimize By</h2>
                  <SelectInput
                    options={OptimizeBy}
                    value={optBy}
                    onChange={(e) => setOptBy(e)}
                  />
                </div>
                {optBy.value === "start" ? (
                  <div className="space-y-2 w-full">
                    <h2 className="pl-2 text-sm">
                      Start time of Travel window
                    </h2>
                    <Input
                      className="border rounded-xl px-2 text-sm w-[100%]"
                      type="time"
                      name="startTimeWindow"
                      inputClassName="w-full"
                      value={formData.startTimeWindow}
                      onChange={handleInputChange}
                    />
                  </div>
                ) : (
                  <div className="space-y-2 w-full">
                    <h2 className="pl-2 text-sm">Latest arrival time</h2>

                    <Input
                      className="border rounded-xl px-2 text-sm w-[100%]"
                      type="time"
                      name="latestArrivalTime"
                      inputClassName="w-full"
                      value={formData.latestArrivalTime}
                      onChange={handleInputChange}
                    />
                  </div>
                )}
              </div>

              <div className="flex sm:flex-row flex-col justify-between w-full sm:items-center items-start  gap-5 mt-3 sm:mt-10">
                <div className="space-y-2 w-full">
                  <h2 className="pl-2 text-sm">Travel window (hours)</h2>

                  <SelectInput
                    options={TravelWindow}
                    value={formData.durationOfTravelWindow}
                    onChange={(e) =>
                      handleSelectInputChange(e, "durationOfTravelWindow")
                    }
                  />
                </div>

                <div className="space-y-2 w-full">
                  <h2 className="pl-2 text-sm">Transport Details</h2>

                  <SelectInput
                    options={TransportDetails}
                    value={formData.transportDetails}
                    onChange={(e) =>
                      handleSelectInputChange(e, "transportDetails")
                    }
                  />
                </div>
              </div>
              <div className="flex sm:flex-row flex-col justify-between w-full lg:w-1/2 sm:items-center items-start  gap-5 mt-3 sm:mt-10">
                {formData.transportDetails.value === "Other" ? (
                  <div className="space-y-2 w-full">
                    <h2 className="pl-2 text-sm">Plate Number</h2>

                    <Input
                      className="border rounded-xl px-2 text-sm w-[100%]"
                      type="text"
                      name="plateNumber"
                      inputClassName="w-full"
                      value={formData.plateNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                ) : (
                  <div className="space-y-2 w-full">
                    <h2 className="pl-2 text-sm">Transportation</h2>

                    <SelectInput
                      options={transformedTransports}
                      value={formData.transportation}
                      onChange={(e) =>
                        handleSelectInputChange(e, "transportation")
                      }
                    />
                  </div>
                )}

                {/* {formData.transportDetails.value === "Other" && (
                  <div className="space-y-2 w-full">
                    <h2 className="pl-2 text-sm">Plate Number</h2>

                    <Input
                      className="border rounded-xl px-2 text-sm w-[100%]"
                      type="text"
                      name="plateNumber"
                      inputClassName="w-full"
                      value={formData.plateNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                )} */}
              </div>
              <div className="h-[500px] my-10">
                <TransportMap positions={positions} />
              </div>

              <div className="w-full mx-auto ">
                <Button className="w-full">
                  <span>Optimize</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default OptimizeModal;
