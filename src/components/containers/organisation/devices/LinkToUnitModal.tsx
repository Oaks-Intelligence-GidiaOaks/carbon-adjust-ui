import Modal from "@/components/dialogs/Modal";
import { Button } from "@/components/ui";
// import SelectInput from "@/components/ui/SelectInput";
import { VehicleDetailProps } from "@/interfaces/transport.interface";
import { groupDevices } from "@/services/homeOwner";
import {  AllUnitsAndDetails } from "@/services/organisation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { Oval } from "react-loader-spinner";

type LinkToUnitModalProps = {
  setShowModal: (value: any) => void;
  id: any;
};

const LinkToUnitModal = ({ setShowModal, id }: LinkToUnitModalProps) => {
  const [unitCheck, setUnitCheck] = useState("")
 const { data:units } = useQuery({
    queryKey: ["get-admin-units"],
    queryFn: () => AllUnitsAndDetails(),
  });

  

  const GroupDevice = useMutation({
    mutationKey: ["group-device"],
    mutationFn: (unit:string) => {
    setUnitCheck(unit)
      const payload = {
        unitId: unit,
        deviceIds: [id],
      };

      return groupDevices(payload);
    },
    onSuccess: () => {
      setShowModal("");
      toast.success("Device linked to unit successfully");
    },
    onError: (ex: any) => {
      console.log(ex)
      toast.error(ex.response?.data?.message || "An error occurred");
    },
  });
  return (
    <Modal>
      <div className="w-[90%] max-w-[553px] bg-white h-[90%] lg:h-[900px] rounded-lg flex flex-col px-2 overflow-y-auto">
        {/* Header */}
        <div className="p-5 flex justify-between items-center mb-5">
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg text-[#091E42] font-poppins">
              Available Units
            </h3>
          </div>
          <button
            className="bg-white rounded-full text-lg w-10 h-10 flex items-center justify-center"
            onClick={() => setShowModal("")}
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-5">
          {units?.data?.units.map((unit: any) => (
            <div
              key={unit._id}
              className="flex  bg-[#Fff] border rounded-lg py-2 px-5"
            >
              <div className="flex-1 flex-col p-5">
                <div className="border-b">
                  <h3 className="font-semibold mb-2 text-base text-[#091E42] font-poppins">
                    {unit.name}
                  </h3>
                </div>
                {/* <div className="space-y-2 my-5 w-full">
                <h2 className="text-[12px] text-[#141516]">Link to sub-unit</h2>

                <SelectInput
                  options={[{ label: "test", value: "test" }]}
                  value={formData.durationOfTravelWindow}
                  onChange={(e) =>
                    handleSelectInputChange(e, "durationOfTravelWindow")
                  }
                />
              </div> */}
              
                <div className="grid grid-cols-2 gap-4 my-3">
                  <UnitDetail
                    title="No of Staff"
                    des={unit.totalStaff || 0}
                  />
                  <UnitDetail
                    title="No of Assets"
                    des={unit.totalAssets|| 0}
                  />
                  {/* <UnitDetail title="Climate transition score" des={"N/A"} />
                <UnitDetail title="Voltage level" des={"N/A"} /> */}
                </div>
                <Button
                  className="rounded-lg gap-1"
                  onClick={() => GroupDevice.mutate(unit._id)}
                >
                  {GroupDevice.isPending && unitCheck === unit._id ? (
                    <Oval height={"15"} color="white" />
                  ) : (
                    <span className="text-center">Link</span>
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default LinkToUnitModal;

const UnitDetail = ({ title, des }: VehicleDetailProps) => (
  <div className="font-inter">
    <p className="text-[12px] font-normal capitalize text-[#767A85]">
      {" "}
      {title}
    </p>
    <p className="break-all text-[12px] font-semibold text-[#1F2026] ">{des}</p>
  </div>
);
