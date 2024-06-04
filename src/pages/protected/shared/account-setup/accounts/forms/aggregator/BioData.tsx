import { Input } from "@/components/ui";
import Datepicker from "@/components/ui/DatePicker";
import Phoneinput from "@/components/ui/PhoneInput";
import TextArea from "@/components/ui/TextArea";
import { OrgAccountSetupForm } from "@/types/general";
// import { Value } from "node_modules/react-date-picker/dist/esm/shared/types";
// import DatePicker from "@/components/ui/DatePicker";

type Props = {
  formState: OrgAccountSetupForm;
  setFormState: React.Dispatch<React.SetStateAction<OrgAccountSetupForm>>;
};

const BioData = ({ formState, setFormState }: Props) => {
  return (
    <div className="">
      <div className="p-6 px-14 pt-14 bg-white my-10 pb-20 rounded-xl flex flex-col gap-y-6">
        <Input
          name="entityName"
          label="Entity Name"
          labelClassName="mb-4 text-[#000000]"
          inputClassName="bg-gray-100"
          placeholder="Enter entity name"
          value={formState.entityName}
          disabled
          onChange={(e) =>
            setFormState((prev) => ({
              ...prev,
              [e.target.name]: e.target.value,
            }))
          }
        />
        <Datepicker
          name="dateOfFormation"
          label="Date of formation"
          labelClassName="mb-4"
          inputClassName="bg-gray-100"
          placeholder="Select year"
          dateValue={formState!.dateOfFormation}
          onDateChange={(value: any) => {
            const dateString = value;
            setFormState!((prev) => ({
              ...prev,
              dateOfFormation: new Date(dateString).toISOString(),
            }));
          }}
        />
        <Phoneinput
          name="phoneNumber"
          label="Phone Number"
          labelClassName="mb-4"
          inputClassName="bg-gray-100 text-[#000000]"
          value={formState.phoneNumber}
          onInputChange={(_, __, ___, formattedValue: string) =>
            setFormState((prev) => ({
              ...prev,
              ["phoneNumber"]: formattedValue,
            }))
          }
        />
        <Input
          name="contactName"
          label="Contact name (Main)"
          labelClassName="mb-4 text-[#000000]"
          inputClassName="bg-gray-100"
          placeholder="Richard Moore"
          value={formState.contactName}
          onChange={(e) =>
            setFormState((prev) => ({
              ...prev,
              [e.target.name]: e.target.value,
            }))
          }
        />
        <Input
          name="contactEmail"
          label="Contact email (Main)"
          labelClassName="mb-4 text-[#000000]"
          inputClassName="bg-gray-100"
          placeholder="jefferycooper@gmail.com"
          value={formState.contactEmail}
          onChange={(e) =>
            setFormState((prev) => ({
              ...prev,
              [e.target.name]: e.target.value,
            }))
          }
        />
        <TextArea
          name="bio"
          label="Bio"
          labelClassName="mb-4 text-[#000000]"
          inputClassName="bg-gray-100 min-h-20"
          placeholder=""
          value={formState.bio}
          onChange={(e) =>
            setFormState((prev) => ({
              ...prev,
              [e.target.name]: e.target.value,
            }))
          }
        />
      </div>
    </div>
  );
};

export default BioData;
