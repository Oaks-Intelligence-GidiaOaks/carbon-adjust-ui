import AccountActionHeader from "@/components/reusables/account-setup/AccountActionHeader";
import AccountSetupInfo from "@/components/reusables/account-setup/AccountSetupInfo";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountSetUpForm from "./AccountSetUpForm";
import { Button } from "@/components/ui";
import ScrollToTop from "@/components/reusables/ScrollToTop";
import { useDispatch, useSelector } from "react-redux";
import { persistor, RootState } from "@/app/store";
import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import toast from "react-hot-toast";
import { VerifyPhoneNumber } from "@/components/dialogs";
import { Oval } from "react-loader-spinner";
import { AccountSetupForm, DocInfoForm } from "@/types/general";
import { getMe } from "@/services/homeOccupant";
import { setUser } from "@/features/userSlice";

type Props = {};

const HomeOwnerAccountSetup = (_: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData = useSelector((state: RootState) => state.user.user);

  const initialStep = userData?.step ? userData?.step + 1 : 1;
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [verifyPhoneNumber, setVerifyPhoneNumber] = useState(false);

  const logOut = async () => {
    persistor.pause();
    persistor.flush().then(() => {
      return persistor.purge();
    });
    window.location.assign("/");
  };

  const freshUserData = useQuery({
    queryKey: ["user-data", currentStep],
    queryFn: getMe,
  });

  useEffect(() => {
    if (freshUserData.isSuccess) {
      const data = freshUserData.data.data.data;

      dispatch(setUser(data));

      if (data.step) {
        setCurrentStep(data.step + 1);
      } else {
        setCurrentStep(1);
      }
    }
  }, [freshUserData.isSuccess]);

  const setUserBioData = useMutation({
    mutationFn: (bioData: {
      email: string | undefined;
      name: string | undefined;
      phoneNos: string | undefined;
      dob: string | undefined;
    }) => axiosInstance.patch(`/users/biodata`, bioData),
    mutationKey: ["register_account"],
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
    onSuccess: (data) => {
      toast.success(`${data.data.message}. Please verify your phone number`, {
        duration: 10000,
      });
      setVerifyPhoneNumber(true);
    },
  });

  const setUserAddress = useMutation({
    mutationFn: (address: {
      address: {
        country: string;
        cityOrProvince: string;
        firstLineAddress: string;
        zipcode: string;
      };
      epcRating: string;
    }) => axiosInstance.patch(`/users/address`, address),
    mutationKey: ["address-setup"],
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
    onSuccess: (data) => {
      toast.success(`${data.data.message}`, {
        duration: 10000,
      });
      setCurrentStep(3);
    },
  });

  const setHomeInfo = useMutation({
    mutationFn: (homeInfo: {
      houseType: string;
      yearOfConstruction: string;
      ownershipStatus: string;
      moveInDate: string;
      nosOfRoom: number;
      nosOfOccupant: {
        adult: number;
        children: number;
      };
    }) => axiosInstance.patch(`/users/homeinfo`, homeInfo),
    mutationKey: ["homeinfo-setup"],
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
    onSuccess: (data) => {
      toast.success(`${data.data.message}`, {
        duration: 10000,
      });
      setCurrentStep(4);
    },
  });

  const setUserDoc = useMutation({
    mutationFn: (docData: FormData) =>
      axiosInstance.post(`/users/upload/doc`, docData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    mutationKey: ["doc-submission"],
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
    onSuccess: (data) => {
      toast.success(`${data.data.message}`, {
        duration: 10000,
      });
      navigate("/pending-verification");
    },
  });

  const handleDocSubmission = () => {
    const formData = new FormData();

    if (DocInfoState.doc === null) {
      return;
    }
    if (DocInfoState.doc !== null) {
      formData.append("idType", DocInfoState.idType.value);
      formData.append("file", DocInfoState.doc[0]);
    }

    // console.log(formData);
    // for (const [key, value] of formData.entries()) {
    //   console.log(key, value);
    // }

    setUserDoc.mutate(formData);
  };

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

  const goToNext = async () => {
    switch (currentStep) {
      case 1:
        setUserBioData.mutate({
          dob: formState.dateOfBirth,
          email: formState.emailAddress,
          name: formState.fullName,
          phoneNos: formState.phoneNumber,
        });
        break;
      case 2:
        setUserAddress.mutate({
          address: {
            cityOrProvince: addressFormState.cityOrProvince.label,
            country: addressFormState.country.label,
            firstLineAddress: addressFormState.firstLineAddress,
            zipcode: addressFormState.zipcode,
          },
          epcRating: addressFormState.epcRating.value,
        });
        break;
      case 3:
        setHomeInfo.mutate({
          houseType: homeInfoState.houseType?.value,
          moveInDate: homeInfoState.moveInDate,
          ownershipStatus: homeInfoState.ownershipStatus?.value,
          yearOfConstruction: homeInfoState.yearOfConstruction,
          nosOfOccupant: {
            adult: parseInt(homeInfoState.nosOfOccupant.adult),
            children: parseInt(homeInfoState.nosOfOccupant.children),
          },
          nosOfRoom: parseInt(homeInfoState.nosOfRoom),
        });
        break;
      case 4:
        handleDocSubmission();
        break;
      default:
        break;
    }
  };

  console.log(currentStep);

  useEffect(() => {
    console.log(addressFormState);
  }, [addressFormState]);

  return (
    <ScrollToTop dependentValue={currentStep}>
      {verifyPhoneNumber && (
        <VerifyPhoneNumber
          phone={setUserBioData.data?.data.data.phoneNos}
          nextStep={() => setCurrentStep(2)}
          closeVerifyPhoneNumber={() => setVerifyPhoneNumber(false)}
        />
      )}
      <AccountActionHeader
        actionTitle="Log out"
        action={logOut}
        className={"bg-white"}
      />
      <AccountSetupInfo
        accountType="home-occupant"
        currentStep={currentStep}
        // formState={formState}
        // setFormState={setFormState}
        // addressFormState={addressFormState}
        // setAddressFormState={setAddressFormState}
        // homeInfoState={homeInfoState}
        // setHomeInfoState={setHomeInfoState}
        // DocInfoState={DocInfoState}
        // setDocInfoState={setDocInfoState}
      />
      <div className="flex bg-gray-100 justify-center min-h-screen pb-20 bg-account-setup-image bg-cover bg-fixed">
        <div className="max-w-[760px] w-full">
          <AccountSetUpForm
            accountType={"HOME_OCCUPANT"}
            currentStep={currentStep}
            formState={formState}
            setFormState={setFormState}
            addressFormState={addressFormState}
            setAddressFormState={setAddressFormState}
            homeInfoState={homeInfoState}
            setHomeInfoState={setHomeInfoState}
            DocInfoState={DocInfoState}
            setDocInfoState={setDocInfoState}
          />
          <Button
            disabled={
              setUserBioData.isPending ||
              setUserAddress.isPending ||
              setHomeInfo.isPending ||
              setUserDoc.isPending
            }
            onClick={goToNext}
            className="rounded-lg text-white mt-4 w-full h-11"
          >
            {setUserBioData.isPending ||
            setUserAddress.isPending ||
            setHomeInfo.isPending ||
            setUserDoc.isPending ? (
              <Oval
                visible={
                  setUserBioData.isPending ||
                  setUserAddress.isPending ||
                  setHomeInfo.isPending ||
                  setUserDoc.isPending
                }
                height="20"
                width="20"
                color="#ffffff"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            ) : (
              <span>Next</span>
            )}
          </Button>
        </div>
      </div>
    </ScrollToTop>
  );
};

export default HomeOwnerAccountSetup;
