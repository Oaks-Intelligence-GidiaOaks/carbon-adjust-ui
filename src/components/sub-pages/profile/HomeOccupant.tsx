import { RootState } from "@/app/store";
import ProfileInfo from "@/components/reusables/profile/ProfileInfo";
import ProfileTab from "@/components/reusables/profile/ProfileTab";
import {
  Address,
  BioData,
  Documentation,
  HomeInformation,
} from "@/pages/protected/shared/account-setup/accounts/forms/home-occupant";
import { AccountSetupForm, DocInfoForm } from "@/types/general";
import { useState } from "react";
import { useSelector } from "react-redux";

type Props = {};

const HomeOccupant = (_: Props) => {
  const [currentTab, setCurrentTab] = useState(1);

  const userData = useSelector((state: RootState) => state.user.user);

  const [formState, setFormState] = useState<AccountSetupForm>({
    fullName: userData?.name ?? "",
    emailAddress: userData?.email ?? "",
    phoneNumber: userData?.phoneNos ?? "",
    dateOfBirth: userData?.dob ?? "",
  });

  const [addressFormState, setAddressFormState] = useState({
    country: {
      label: "",
      value: "",
    },
    cityOrProvince: {
      label: "",
      value: "",
    },
    firstLineAddress: "",
    zipcode: "",
    epcRating: {
      label: "",
      value: "",
    },
  });

  const [homeInfoState, setHomeInfoState] = useState({
    houseType: {
      label: "",
      value: "",
    },
    yearOfConstruction: "",
    ownershipStatus: {
      label: "",
      value: "",
    },
    moveInDate: "",
    nosOfRoom: "",
    nosOfOccupant: {
      adult: "",
      children: "",
    },
  });

  const [DocInfoState, setDocInfoState] = useState<DocInfoForm>({
    idType: {
      label: "",
      value: "",
    },
    doc: null,
  });

  const generateTabComponent = () => {
    switch (currentTab) {
      case 1:
        return <BioData formState={formState} setFormState={setFormState} />;
      case 2:
        return (
          <Address
            formState={addressFormState}
            setFormState={setAddressFormState}
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
            formState={DocInfoState}
            setFormState={setDocInfoState}
          />
        );
      default:
        break;
    }
  };
  return (
    <div>
      <div className="sticky top-0 z-[100]">
        <ProfileInfo
          accountType="home-occupant"
          currentStep={currentTab}
          formState={formState}
          setFormState={setFormState}
          addressFormState={addressFormState}
          setAddressFormState={setAddressFormState}
          homeInfoState={homeInfoState}
          setHomeInfoState={setHomeInfoState}
          DocInfoState={DocInfoState}
          setDocInfoState={setDocInfoState}
        />
        <div className="absolute bottom-0 z-50 w-full">
          <ProfileTab
            accountType="home-occupant"
            currentTab={currentTab}
            setCurrentTab={(index) => setCurrentTab(index)}
          />
        </div>
      </div>
      <div className="max-w-[820px] mx-auto h-screen shadow-lg">
        {generateTabComponent()}
      </div>
    </div>
  );
};

export default HomeOccupant;
