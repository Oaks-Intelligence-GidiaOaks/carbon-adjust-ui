// import { UploadDoc } from "@/assets/icons";
import { DropBox, Dropdown } from "@/components/ui";
import { idTypes } from "@/constants";
import { DocInfoForm } from "@/types/general";
// import { useQuery } from "@tanstack/react-query";
// import { CameraIcon } from "@heroicons/react/24/outline";

type Props = {
  formState: DocInfoForm;
  setFormState: React.Dispatch<React.SetStateAction<DocInfoForm>>;
};

const Documentation = ({ formState, setFormState }: Props) => {
  return (
    <div className="">
      <div className="p-6 px-14 pt-10 bg-white my-10 pb-20 rounded-xl flex flex-col gap-y-6">
        <p className="font-poppins font-semibold text-lg">
          Identity Verification
        </p>
        <div className="mb-10 pb-20 flex flex-col gap-y-6">
          <Dropdown
            name="idType"
            labelClassName="mb-4 text-[#000000_!important]"
            options={idTypes}
            label="ID Card type"
            wrapperClassName="bg-gray-100 w-full"
            placeholder="Select ID card type"
            value={formState.idType}
            onOptionChange={(value) =>
              setFormState((prev) => ({
                ...prev,
                idType: value,
              }))
            }
          />
          <div>
            <p className="text-black">
              Upload Valid ID card (Upload the front page of your ID)
            </p>
            <DropBox value={formState.doc} setFile={setFormState} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentation;
