import { OrgAccountSetupProps } from "@/types/general";
import { AggAddress, AggBioData, AggDocumentation } from "./forms/aggregator";

const OrganizationSetupForm = ({
  currentStep = 1,
  accountType,
  formState,
  setFormState,
  addressFormState,
  setAddressFormState,
  DocInfoState,
  setDocInfoState,
}: OrgAccountSetupProps) => {
  if (accountType !== "HOME_OCCUPANT") {
    const step = currentStep >= 4 ? 3 : currentStep;
    switch (step) {
      case 1:
        return <AggBioData formState={formState} setFormState={setFormState} />;
      case 2:
        return (
          <AggAddress
            formState={addressFormState}
            setFormState={setAddressFormState}
          />
        );
      case 3:
        return (
          <AggDocumentation
            formState={DocInfoState}
            setFormState={setDocInfoState}
          />
        );
      default:
        break;
    }
  }
};

export default OrganizationSetupForm;
