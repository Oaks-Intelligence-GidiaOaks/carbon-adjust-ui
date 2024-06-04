import {
  AccountSetupProps,
  AddressSetupForm,
  DocInfoForm,
} from "@/types/general";
import {
  BioData as HomeOccupantBioData,
  Address,
  Documentation,
  HomeInformation,
} from "./forms/home-occupant";

const AccountSetUpForm = ({
  currentStep,
  accountType,
  formState,
  setFormState,
  addressFormState,
  setAddressFormState,
  homeInfoState,
  setHomeInfoState,
  DocInfoState,
  setDocInfoState,
}: AccountSetupProps) => {
  console.log(currentStep);
  if (accountType === "HOME_OCCUPANT") {
    switch (currentStep) {
      case 1:
        return (
          <HomeOccupantBioData
            formState={formState}
            setFormState={setFormState}
          />
        );
      case 2:
        return (
          <Address
            formState={addressFormState || ({} as AddressSetupForm)}
            setFormState={setAddressFormState || (() => {})}
          />
        );
      case 3:
        return (
          <HomeInformation
            formState={homeInfoState}
            setFormState={setHomeInfoState}
          />
        );
      case 4:
        return (
          <Documentation
            formState={DocInfoState || ({} as DocInfoForm)}
            setFormState={setDocInfoState || (() => {})}
          />
        );
      default:
        <p>Hello</p>;
        break;
    }
  }
};

export default AccountSetUpForm;
