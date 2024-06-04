import { Input } from "@/components/ui";
import Datepicker from "@/components/ui/DatePicker";
import Phoneinput from "@/components/ui/PhoneInput";
import { AccountSetupForm } from "@/types/general";
// import { Value } from "node_modules/react-date-picker/dist/esm/shared/types";
// import DatePicker from "@/components/ui/DatePicker";

type Props = {
  formState: AccountSetupForm;
  setFormState: React.Dispatch<React.SetStateAction<AccountSetupForm>>;
};

const BioData = ({ formState, setFormState }: Props) => {
  return (
    <div className="">
      <div className="p-6 px-14 pt-14 bg-white my-10 pb-20 rounded-xl flex flex-col gap-y-6">
        <Input
          name="fullName"
          label="Full Name"
          labelClassName="mb-4 text-[#000000]"
          inputClassName="bg-gray-100"
          placeholder="Jeffery Cooper"
          disabled
          value={formState.fullName}
          onChange={(e) =>
            setFormState((prev) => ({
              ...prev,
              [e.target.name]: e.target.value,
            }))
          }
        />
        <Input
          name="emailAddress"
          label="Email Address"
          labelClassName="mb-4 text-[#000000]"
          inputClassName="bg-gray-100"
          placeholder="jefferycooper@gmail.com"
          disabled
          value={formState.emailAddress}
          onChange={(e) =>
            setFormState((prev) => ({
              ...prev,
              [e.target.name]: e.target.value,
            }))
          }
        />
        {/* <Input
          name="phoneNumber"
          label="Phone Number"
          labelClassName="mb-4"
          inputClassName="bg-gray-100"
          placeholder="+234"
        /> */}
        <Phoneinput
          name="phoneNumber"
          label="Phone Number"
          labelClassName="mb-4"
          inputClassName="bg-gray-100 text-[#000000]"
          value={formState.phoneNumber}
          onInputChange={(formattedValue: string) =>
            setFormState((prev) => ({
              ...prev,
              ["phoneNumber"]: formattedValue,
            }))
          }
        />
        <Datepicker
          name="dateOfBirth"
          label="Date of birth"
          labelClassName="mb-4"
          inputClassName="bg-gray-100 text-sm"
          // placeholder="4th April 1956"
          dateValue={formState.dateOfBirth}
          onDateChange={(value: any) => {
            const dateString = value;
            setFormState((prev) => ({
              ...prev,
              ["dateOfBirth"]: new Date(dateString).toISOString(),
            }));
          }}
        />
      </div>
    </div>
  );
};

export default BioData;
