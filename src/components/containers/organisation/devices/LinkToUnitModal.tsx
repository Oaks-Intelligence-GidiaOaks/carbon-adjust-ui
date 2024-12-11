import Modal from "@/components/dialogs/Modal";
import { Button } from "@/components/ui";
import SelectInput from "@/components/ui/SelectInput";
import { VehicleDetailProps } from "@/interfaces/transport.interface";

type LinkToUnitModalProps = {
  setShowModal: (value: boolean) => void;
};

const LinkToUnitModal = ({ setShowModal }: LinkToUnitModalProps) => {
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
            onClick={() => setShowModal(false)}
          >
            ✕
          </button>
              </div>


              <div className="flex flex-col gap-5">        
        {[...Array(3)].map((_, index) => (
            <div key={index} className="flex  bg-[#Fff] border rounded-lg py-2 px-5">
            <div className="flex-1 flex-col p-5">
              <div className="border-b">
                <h3 className="font-semibold mb-2 text-base text-[#091E42] font-poppins">
                            {"Building" + " " + index}
                </h3>
              </div>
              <div className="space-y-2 my-5 w-full">
                <h2 className="text-[12px] text-[#141516]">Link to sub-unit</h2>

                <SelectInput
                  options={[{ label: "test", value: "test" }]}
                  // value={formData.durationOfTravelWindow}
                  // onChange={(e) =>
                  //   handleSelectInputChange(e, "durationOfTravelWindow")
                  // }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <UnitDetail title="No of Staff" des={"N/A"} />
                <UnitDetail title="No of Devices" des={"N/A"} />
                <UnitDetail title="Climate transition score" des={"N/A"} />
                <UnitDetail title="Voltage level" des={"N/A"} />
              </div>
              <Button className="rounded-[20px] mt-3 w-[100px] h-[20px] p-3">
                <span>link</span>
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
