import AccountActionHeader from "@/components/reusables/account-setup/AccountActionHeader";
import AccountSetupInfo from "@/components/reusables/account-setup/AccountSetupInfo";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import AccountSetUpForm from "./AccountSetUpForm";
import { Button } from "@/components/ui";
import ScrollToTop from "@/components/reusables/ScrollToTop";
import { useDispatch, useSelector } from "react-redux";
import { persistor, RootState } from "@/app/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import toast from "react-hot-toast";
import { VerifyPhoneNumber } from "@/components/dialogs";
import { Oval } from "react-loader-spinner";
import { OrgDocInfoForm } from "@/types/general";
import OrganizationSetupForm from "./OrganizationSetUpForm";
import { cn, uniqueObjectsByIdType } from "@/utils";
import { setUser } from "@/features/userSlice";
import { getMe } from "@/services/homeOccupant";
import Loading from "@/components/reusables/Loading";

type Props = {};

const MerchantAccountSetup = (_: Props) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData = useSelector((state: RootState) => state.user.user);

  const figureStepBasedOnAccountType = (step: number | undefined) => {
    if (!userData?.accountType) {
      return 0;
    }
    if (userData?.roles[0] !== "HOME_OCCUPANT") {
      return step ?? 1;
    }

    step ? step + 1 : 1;
  };
  const initialStep = figureStepBasedOnAccountType(userData?.step);

  const [currentStep, setCurrentStep] = useState(initialStep);
  const [verifyPhoneNumber, setVerifyPhoneNumber] = useState(false);

  useEffect(() => {
    if (userData?.merchantType === "FINANCIAL_MERCHANT") {
      setCurrentStep(userData?.step ?? 1);
    }
  }, [userData?.merchantType]);

  const logOut = async () => {
    persistor.pause();
    persistor.flush().then(() => {
      return persistor.purge();
    });
    window.location.assign("/");
  };

  const freshUserData = useQuery({
    queryKey: ["user-data-1", currentStep],
    queryFn: getMe,
    // enabled: !currentStep || Boolean(currentStep && currentStep > 1),
  });

  const isFileComplete = (fData: any) => {
    console.log(fData);
    console.log(fData.nonFinMerchantType);

    if (
      fData?.roles[0] === "MERCHANT" &&
      fData?.merchantType === "NON_FINANCIAL_MERCHANT"
    ) {
      if (
        fData.nonFinMerchantType === "SELF_EMPLOYED" &&
        uniqueObjectsByIdType(fData?.doc).length === 2
      ) {
        return true;
      }
      if (
        fData.nonFinMerchantType === "SELF_EMPLOYED_LICENSE" &&
        uniqueObjectsByIdType(fData?.doc).length === 3
      ) {
        return true;
      }
      if (
        fData.nonFinMerchantType === "LIMITED_LIABILITY" &&
        uniqueObjectsByIdType(fData?.doc).length === 3
      ) {
        return true;
      }
      if (
        fData.nonFinMerchantType === "LIMITED_LIABILITY_LICENSE" &&
        uniqueObjectsByIdType(fData?.doc).length === 4
      ) {
        return true;
      }
      return false;
    }
  };

  console.log(freshUserData);

  useEffect(() => {
    if (freshUserData.isSuccess && freshUserData.data?.data.data) {
      const data = freshUserData.data?.data.data;
      console.log(data.step);
      console.log(isFileComplete(data));
      console.log(data);

      dispatch(setUser(data));

      setFormState((prev) => ({ ...prev, entityName: data.name }));

      if (data.step) {
        if (
          data.step >= 3 &&
          data.status === "pending" &&
          isFileComplete(data)
        ) {
          console.log("Here");
          return navigate("/pending-verification");
        }
        if (
          data.step >= 3 &&
          data.status === "completed" &&
          isFileComplete(data)
        ) {
          console.log("Here");
          return navigate("/merchant");
        }
        console.log("Here");
        setCurrentStep(data.step + 1);
      } else {
        if (data.merchantType === "NON_FINANCIAL_MERCHANT") {
          if (formState.accountType !== "") {
            console.log("Here");
            console.log(formState.accountType);
            return setCurrentStep(1);
          }
          console.log("Here");
          return setCurrentStep(0);
        } else {
          console.log("Here");
          return setCurrentStep(1);
        }
      }
    }
  }, [freshUserData.isSuccess, freshUserData.data?.data.data]);

  console.log(userData);

  queryClient.getQueryCache().find({ queryKey: ["user-data"] });

  const setMerchantBioData = useMutation({
    mutationFn: (bioData: {
      // accountType: string;
      contactEmail: string;
      dateFormed: string;
      phoneNos: string;
      contactName: string;
      name: string;
      bio: string;
    }) => axiosInstance.patch(`/users/org/biodata`, bioData),
    mutationKey: ["set-biodata"],
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
    onSuccess: (data) => {
      toast.success(`${data.data.message}.`, {
        duration: 10000,
      });
      setUser(data.data.data);
      setCurrentStep(2);
      // setVerifyPhoneNumber(true);
    },
  });

  const setMerchantAddress = useMutation({
    mutationFn: (address: {
      address: {
        country: string;
        cityOrProvince: string;
        firstLineAddress: string;
        zipcode: string;
      };
    }) => axiosInstance.patch(`/users/address`, address),
    mutationKey: ["address-setup"],
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
    onSuccess: (data) => {
      toast.success(`${data.data.message}`, {
        duration: 10000,
      });
      setUser(data.data.data);
      setCurrentStep(3);
    },
  });

  const setContactDoc = useMutation({
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
      setUser(data.data.data);
      navigate("/dashboard");
    },
  });

  const setCertOfInc = useMutation({
    mutationFn: (docData: FormData) =>
      axiosInstance.post(`/users/org/upload/doc`, docData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    mutationKey: ["cert-of-inc-submission"],
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
    onSuccess: (data) => {
      toast.success(`${data.data.message}`, {
        duration: 10000,
      });
      setUser(data.data.data);
      navigate("/dashboard");
    },
  });

  const setCertOfAuth = useMutation({
    mutationFn: (docData: FormData) =>
      axiosInstance.post(`/users/org/upload/doc`, docData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    mutationKey: ["cert-of-auth-submission"],
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
    onSuccess: (data) => {
      toast.success(`${data.data.message}`, {
        duration: 10000,
      });
      setUser(data.data.data);
      navigate("/dashboard");
    },
  });

  const handleDocSubmission = () => {
    const formData = new FormData();

    if (DocInfoState.contactDoc === null) {
      return;
    }
    if (DocInfoState.contactDoc !== null) {
      formData.append("idType", DocInfoState.idType.value);
      formData.append("file", DocInfoState.contactDoc[0]);
    }
    setContactDoc.mutate(formData);
  };
  const handleCertOfIncSubmission = () => {
    const formData = new FormData();

    if (DocInfoState.certOfInc === null) {
      return;
    }
    if (DocInfoState.certOfInc !== null) {
      formData.append("idType", "Certificate of Incorporation");
      formData.append("file", DocInfoState.certOfInc[0]);
    }

    setCertOfInc.mutate(formData);
  };
  const handleCertOfAuthSubmission = () => {
    const formData = new FormData();

    if (DocInfoState.certOfAuth === null) {
      return;
    }
    if (DocInfoState.certOfAuth !== null) {
      formData.append("idType", DocInfoState.idType.value);
      formData.append("file", DocInfoState.certOfAuth[0]);
    }
    setCertOfAuth.mutate(formData);
  };

  console.log(userData?.name);
  const [formState, setFormState] = useState({
    accountType: userData?.merchantType ?? "",
    entityName: userData?.name ?? "",
    contactEmail: userData?.contactEmail ?? "",
    contactName: userData?.contactName ?? "",
    dateOfFormation: userData?.dateFormed ?? "",
    phoneNumber: userData?.phoneNos ?? "",
    bio: userData?.bio ?? "",
  });

  console.log(formState);

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
  });

  const [DocInfoState, setDocInfoState] = useState<OrgDocInfoForm>({
    idType: {
      label: "",
      value: "",
    },
    contactDoc: null,
    certOfInc: null,
    certOfAuth: null,
    letterOfAuth: null,
  });

  // const doc = uniqueObjectsByIdType(
  //   useSelector((state: RootState) => state.user?.user?.doc ?? [])
  // );

  //   console.log(doc);

  const goToNext = async () => {
    console.log(currentStep);

    switch (currentStep) {
      // case undefined:
      //   setCurrentStep(1);
      //   break;
      case 0:
        setCurrentStep(1);
        break;
      case 1:
        setMerchantBioData.mutate({
          // accountType: formState.contactEmail,
          contactEmail: formState.contactEmail,
          contactName: formState.contactName,
          dateFormed: formState.dateOfFormation,
          name: formState.entityName,
          phoneNos: formState.phoneNumber,
          bio: formState.bio,
          ...(userData?.merchantType === "NON_FINANCIAL_MERCHANT"
            ? {
                nonFinMerchantType: formState.accountType,
              }
            : {}),
        });
        break;
      case 2:
        setMerchantAddress.mutate({
          address: {
            cityOrProvince: addressFormState.cityOrProvince.label,
            country: addressFormState.country.label,
            firstLineAddress: addressFormState.firstLineAddress,
            zipcode: addressFormState.zipcode,
          },
        });
        break;
      case 3:
        // handleDocSubmission();
        if (
          userData?.roles[0] === "MERCHANT" &&
          userData?.merchantType === "NON_FINANCIAL_MERCHANT"
        ) {
          if (
            userData.nonFinMerchantType === "SELF_EMPLOYED" &&
            uniqueObjectsByIdType(userData?.doc).length === 2
          ) {
            return navigate("/pending-verification");
          }
          if (
            userData.nonFinMerchantType === "SELF_EMPLOYED_LICENSE" &&
            uniqueObjectsByIdType(userData?.doc).length === 3
          ) {
            return navigate("/pending-verification");
          }
          if (
            userData.nonFinMerchantType === "LIMITED_LIABILITY" &&
            uniqueObjectsByIdType(userData?.doc).length === 3
          ) {
            return navigate("/pending-verification");
          }
          if (
            userData.nonFinMerchantType === "LIMITED_LIABILITY_LICENSE" &&
            uniqueObjectsByIdType(userData?.doc).length === 4
          ) {
            return navigate("/pending-verification");
          }
          return navigate("/pending-verification");
        }

        if (
          userData?.roles[0] === "MERCHANT" &&
          userData?.merchantType === "FINANCIAL_MERCHANT" &&
          uniqueObjectsByIdType(userData?.doc).length === 4
        ) {
          navigate("/pending-verification");
        }
        return;
      // Same as case 3 because the data returning is not constant for organizations
      case 4:
        // handleDocSubmission();
        if (
          userData?.roles[0] === "MERCHANT" &&
          userData?.merchantType === "NON_FINANCIAL_MERCHANT"
        ) {
          if (
            userData.nonFinMerchantType === "SELF_EMPLOYED" &&
            uniqueObjectsByIdType(userData?.doc).length === 2
          ) {
            return navigate("/merchant");
          }
          if (
            userData.nonFinMerchantType === "SELF_EMPLOYED_LICENSE" &&
            uniqueObjectsByIdType(userData?.doc).length === 3
          ) {
            return navigate("/merchant");
          }
          if (
            userData.nonFinMerchantType === "LIMITED_LIABILITY" &&
            uniqueObjectsByIdType(userData?.doc).length === 3
          ) {
            return navigate("/merchant");
          }
          if (
            userData.nonFinMerchantType === "LIMITED_LIABILITY_LICENSE" &&
            uniqueObjectsByIdType(userData?.doc).length === 4
          ) {
            return navigate("/merchant");
          }
          return navigate("/merchant");
        }

        if (
          userData?.roles[0] === "MERCHANT" &&
          userData?.merchantType === "FINANCIAL_MERCHANT" &&
          uniqueObjectsByIdType(userData?.doc).length === 4
        ) {
          navigate("/merchant");
        }
        return;
      // Same as case 3 and 4 because the data returning is not constant for organizations
      case 5:
        // handleDocSubmission();
        if (
          userData?.roles[0] === "MERCHANT" &&
          userData?.merchantType === "NON_FINANCIAL_MERCHANT"
        ) {
          if (
            userData.nonFinMerchantType === "SELF_EMPLOYED" &&
            uniqueObjectsByIdType(userData?.doc).length === 2
          ) {
            return navigate("/merchant");
          }
          if (
            userData.nonFinMerchantType === "SELF_EMPLOYED_LICENSE" &&
            uniqueObjectsByIdType(userData?.doc).length === 3
          ) {
            return navigate("/merchant");
          }
          if (
            userData.nonFinMerchantType === "LIMITED_LIABILITY" &&
            uniqueObjectsByIdType(userData?.doc).length === 3
          ) {
            return navigate("/merchant");
          }
          if (
            userData.nonFinMerchantType === "LIMITED_LIABILITY_LICENSE" &&
            uniqueObjectsByIdType(userData?.doc).length === 4
          ) {
            return navigate("/merchant");
          }
          return navigate("/merchant");
        }

        if (
          userData?.roles[0] === "MERCHANT" &&
          userData?.merchantType === "FINANCIAL_MERCHANT" &&
          uniqueObjectsByIdType(userData?.doc).length === 4
        ) {
          navigate("/merchant");
        }
        return;
      default:
        if (
          userData?.roles[0] === "MERCHANT" &&
          userData?.merchantType === "NON_FINANCIAL_MERCHANT"
        ) {
          if (
            userData.nonFinMerchantType === "SELF_EMPLOYED" &&
            uniqueObjectsByIdType(userData?.doc).length === 2
          ) {
            return navigate("/merchant");
          }
          if (
            userData.nonFinMerchantType === "SELF_EMPLOYED_LICENSE" &&
            uniqueObjectsByIdType(userData?.doc).length === 3
          ) {
            return navigate("/merchant");
          }
          if (
            userData.nonFinMerchantType === "LIMITED_LIABILITY" &&
            uniqueObjectsByIdType(userData?.doc).length === 3
          ) {
            return navigate("/merchant");
          }
          if (
            userData.nonFinMerchantType === "LIMITED_LIABILITY_LICENSE" &&
            uniqueObjectsByIdType(userData?.doc).length === 4
          ) {
            return navigate("/merchant");
          }
          return navigate("/merchant");
        }

        if (
          userData?.roles[0] === "MERCHANT" &&
          userData?.merchantType === "FINANCIAL_MERCHANT" &&
          uniqueObjectsByIdType(userData?.doc).length === 4
        ) {
          navigate("/merchant");
        }
        break;
    }
  };

  useEffect(() => {
    console.log(addressFormState);
  }, [addressFormState]);

  return (
    <>
      {freshUserData.isLoading ? (
        <div className="pt-20">
          <Loading message="" />
        </div>
      ) : (
        <ScrollToTop dependentValue={currentStep}>
          {verifyPhoneNumber && (
            <VerifyPhoneNumber
              phone={setMerchantBioData.data?.data.data.phoneNos}
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
            accountType={userData?.roles[0]}
            currentStep={currentStep}
          />
          <div className="flex bg-gray-100 justify-center min-h-screen pb-20 bg-account-setup-image bg-cover bg-fixed">
            <div
              className={cn(
                "max-w-[760px] w-full",
                currentStep === 0 && "max-w-[1080px]"
              )}
            >
              <OrganizationSetupForm
                // accountType={userData?.roles[0]}
                accountType={"MERCHANT"}
                currentStep={currentStep}
                formState={formState}
                setFormState={setFormState}
                addressFormState={addressFormState}
                setAddressFormState={setAddressFormState}
                DocInfoState={DocInfoState}
                setDocInfoState={setDocInfoState}
                handleDocSubmission={handleDocSubmission}
                handleCertOfIncSubmission={handleCertOfIncSubmission}
                handleCertOfAuthSubmission={handleCertOfAuthSubmission}
              />
              <Button
                disabled={
                  (() => {
                    if (currentStep && currentStep >= 3) {
                      // NON_FINANCIAL MERCHANT PATH
                      if (
                        userData?.roles[0] === "MERCHANT" &&
                        userData?.merchantType === "NON_FINANCIAL_MERCHANT"
                      ) {
                        if (
                          userData.nonFinMerchantType === "SELF_EMPLOYED" &&
                          uniqueObjectsByIdType(userData?.doc).length < 2
                        ) {
                          return true;
                        }
                        if (
                          userData.nonFinMerchantType ===
                            "SELF_EMPLOYED_LICENSE" &&
                          uniqueObjectsByIdType(userData?.doc).length < 3
                        ) {
                          return true;
                        }
                        if (
                          userData.nonFinMerchantType === "LIMITED_LIABILITY" &&
                          uniqueObjectsByIdType(userData?.doc).length < 3
                        ) {
                          return true;
                        }
                        if (
                          userData.nonFinMerchantType ===
                            "LIMITED_LIABILITY_LICENSE" &&
                          uniqueObjectsByIdType(userData?.doc).length < 4
                        ) {
                          return true;
                        }
                        return false;
                      }
                      // FINANCIAL MERCHANT PATH
                      if (
                        userData?.roles[0] === "MERCHANT" &&
                        userData?.merchantType !== "NON_FINANCIAL_MERCHANT" &&
                        uniqueObjectsByIdType(userData?.doc).length < 4
                      ) {
                        if (uniqueObjectsByIdType(userData?.doc).length < 4) {
                          return true;
                        }
                        return false;
                      }
                    } else if (currentStep === 0 || !currentStep) {
                      return formState.accountType === "";
                    } else {
                      console.log(currentStep);
                      console.log(formState);
                      return (
                        setMerchantBioData.isPending ||
                        setMerchantAddress.isPending
                      );
                    }
                  })()
                  // setUserDoc.isPending
                }
                onClick={goToNext}
                className="rounded-lg text-white mt-4 w-full h-11"
              >
                {setMerchantBioData.isPending ||
                setMerchantAddress.isPending ? (
                  // setUserDoc.isPending ?
                  <Oval
                    visible={
                      setMerchantBioData.isPending ||
                      setMerchantAddress.isPending
                      // setUserDoc.isPending
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
      )}
    </>
  );
};

export default MerchantAccountSetup;
