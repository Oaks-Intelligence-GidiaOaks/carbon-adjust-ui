// import React from "react";

import TabToggler from "@/components/containers/TabToggler";
// import { Grid } from "@/components/grid";
import { Button, Input, Label } from "@/components/ui";
// import { IComponentMap } from "@/types/general";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { BiArrowBack } from "react-icons/bi";
import CheckBox from "@/components/ui/CheckBox";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getHIASpecializations,
  getHIASubcontractors,
  inviteSubcontractorService,
} from "@/services/hiaService";
import { Oval } from "react-loader-spinner";
import toast from "react-hot-toast";
// import PlaceholderActionCard from "@/components/reusables/PlaceholderActionCard";
// import axiosInstance from "@/api/axiosInstance";
import SubcontractorRegistrationGrid from "@/components/grid/SubcontractorGrid";

const Registration = () => {
  // const queryClient = useQueryClient();

  const [showAddSubcontractorForm, setShowAddSubcontractorForm] =
    useState(false);
  const databaseTabs = ["Registration", "Specialization"];
  const navigate = useNavigate();

  const [activeTab] = useState<string>(databaseTabs[0]);

  const [subcontractorFormState, setSubcontractorFormState] = useState({
    companyName: "",
    companyEmail: "",
    contactName: "",
  });

  const [selectedSpecializations, setSelectedSpecializations] = useState<
    string[]
  >([]);

  useEffect(() => {
    console.log(Object.values(subcontractorFormState));
  }, [subcontractorFormState]);

  const specializations = useQuery({
    queryKey: ["get-hia-specializations"],
    queryFn: getHIASpecializations,
  });

  const hiaSubcontractors = useQuery({
    queryKey: ["get-hia-subcontractors"],
    queryFn: getHIASubcontractors,
  });

  console.log(specializations.data?.data.data);
  console.log(hiaSubcontractors.data?.data.data);

  const toggleCheck = (value: string) => {
    if (selectedSpecializations.includes(value)) {
      const index = selectedSpecializations.indexOf(value);

      if (index !== -1) {
        const newArray = [...selectedSpecializations];
        newArray.splice(index, 1);
        setSelectedSpecializations(newArray);
      }
    } else {
      setSelectedSpecializations((prev) => [...prev, value]);
    }
  };

  //   const getCurrentTData: IComponentMap = {
  //     Registration: <Grid data={agg_app} pageSize={20} tableStyles="" />,
  //     Specialization: <Grid data={assigned_app} pageSize={20} tableStyles="" />,
  //   };

  const inviteSubcontractor: any = useMutation({
    mutationKey: ["invite-subcontractor"],
    mutationFn: (data: object) => inviteSubcontractorService(data),
    onSuccess: () => {
      toast.success("Subcontractor invite sent successfully");
      setSubcontractorFormState({
        companyName: "",
        companyEmail: "",
        contactName: "",
      });
      setSelectedSpecializations([]);
    },
    onError: () => {
      toast.error("Error sending invite to subcontractor");
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    inviteSubcontractor.mutate({
      email: subcontractorFormState.companyEmail,
      name: subcontractorFormState.companyName,
      specializations: selectedSpecializations,
      contactName: subcontractorFormState.contactName,
    });
  };

  return (
    <div className="">
      {!showAddSubcontractorForm && (
        <>
          <div className="flex-center justify-between mb-9">
            <h2 className="page-header">Subcontractors</h2>

            {/* <Link to={`/hia/staff/add`}>
          <Button className="flex-center gap-2">
            <span className="text-white">Add staff</span>
            <img
              src="/assets/icons/plus-circle.svg"
              className="h-6 w-6"
              alt="carbon-adjust icon"
            />
          </Button>
        </Link> */}
          </div>

          <div className="mb-4">
            <TabToggler
              tabs={databaseTabs}
              activeTab={activeTab}
              onClick={(text) =>
                navigate(
                  text === "Registration"
                    ? "/hia/subcontractors"
                    : "/hia/subcontractors/specialization"
                )
              }
            />
          </div>

          <div>
            <div>
              <Button
                className="flex-center gap-2"
                onClick={() => setShowAddSubcontractorForm(true)}
              >
                <span className="text-white font-poppins">
                  Add Subcontractor
                </span>
                <img
                  src="/assets/icons/plus-circle.svg"
                  className="h-6 w-6"
                  alt="carbon-adjust icon"
                />
              </Button>
            </div>
          </div>
          <div className="w-full flex flex-wrap gap-x-4 mt-0">
            {hiaSubcontractors.isSuccess &&
              hiaSubcontractors.data?.data.data.contractors.length >= 1 && (
                <SubcontractorRegistrationGrid
                  isUpdating={
                    hiaSubcontractors.isLoading || hiaSubcontractors.isFetching
                  }
                  data={hiaSubcontractors.data?.data.data.contractors}
                />
              )}
          </div>

          {hiaSubcontractors.isLoading && (
            <div className="flex mt-10 items-center justify-center top-10 gap-6">
              {hiaSubcontractors.isLoading && (
                <Oval
                  visible={specializations.isLoading}
                  height="20"
                  width="20"
                  color="#ffffff"
                  ariaLabel="oval-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              )}
            </div>
          )}
          {hiaSubcontractors.isSuccess &&
            Boolean(hiaSubcontractors.data?.data.data.contractors.length) && (
              <div className="flex flex-wrap gap-6 mt-10">
                {/* {specializations.data?.data.data.map(
                  (specialization: { name: string }, i: number) => (
                    <SpecializationCard name={specialization.name} key={i} />
                  )
                )} */}
                <div className="overflow-x-scroll w-full bg-red-100">
                  <div></div>
                </div>
              </div>
            )}
          {hiaSubcontractors.isSuccess &&
            !hiaSubcontractors.data?.data.data.contractors.length && (
              <div className="flex justify-center bg-white/80 min-h-screen">
                <div className="max-w-[500px] px-2 flex flex-col items-center pt-10">
                  <img src="/assets/graphics/handandphone.svg" />
                  <p className="text-center  font-poppins text-lg font-semibold px-[10%] text-black-main">
                    No registered sub-contractor
                  </p>
                  <p className="text-sm max-w-[360px] text-center text-black-main">
                    You are yet to add sub-contractors to your account
                  </p>
                </div>
              </div>
            )}
        </>
      )}
      {showAddSubcontractorForm && (
        <div
          onClick={() => setShowAddSubcontractorForm(false)}
          className="my-6 mb-10 cursor-pointer text-black-main flex items-center gap-x-3 "
        >
          <BiArrowBack />
          <span className="text-gray-900 font-semibold text-xl">
            Add Sub-contractor
          </span>
        </div>
      )}
      {showAddSubcontractorForm && (
        <div className="flex justify-center bg-white/80 min-h-screen pt-4 px-6">
          <div className="w-full max-w-[706px]">
            <p className="font-semibold font-poppins opacity-0 h-0">
              Sustainability Information
            </p>
            <p className="font-poppins mt-0 opacity-0 h-0">
              Please select the range of retrofitting activities you will be
              seeking Carbon Credit for.
            </p>

            <form className="mt-0" onSubmit={handleSubmit}>
              <Input
                name="companyName"
                label="Company Name"
                labelClassName="mb-4 mt-6 font-poppins text-black-main"
                inputClassName="bg-gray-100 font-poppins"
                placeholder="Enter company name"
                value={subcontractorFormState.companyName}
                onChange={(e) =>
                  setSubcontractorFormState((prev) => ({
                    ...prev,
                    companyName: e.target.value,
                  }))
                }
              />
              <Input
                name="companyEmail"
                label="Company Email"
                labelClassName="mb-4 mt-6 font-poppins text-black-main"
                inputClassName="bg-gray-100 font-poppins"
                placeholder="Enter company email"
                value={subcontractorFormState.companyEmail}
                onChange={(e) =>
                  setSubcontractorFormState((prev) => ({
                    ...prev,
                    companyEmail: e.target.value,
                  }))
                }
              />
              <Input
                name="contactName"
                label="Contact Name"
                labelClassName="mb-4 mt-6 font-poppins text-black-main"
                inputClassName="bg-gray-100 font-poppins"
                placeholder="Enter contact name"
                value={subcontractorFormState.contactName}
                onChange={(e) =>
                  setSubcontractorFormState((prev) => ({
                    ...prev,
                    contactName: e.target.value,
                  }))
                }
              />

              <div className="mt-6">
                <Label
                  className={cn(`block mb-4 mt-6 font-poppins text-black-main`)}
                >
                  Specializations
                </Label>

                {specializations.isLoading && (
                  <div className="flex items-center justify-center top-10 gap-6">
                    {specializations.isLoading && (
                      <Oval
                        visible={specializations.isLoading}
                        height="20"
                        width="20"
                        color="#ffffff"
                        ariaLabel="oval-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                      />
                    )}
                  </div>
                )}
                {specializations.isSuccess &&
                  Boolean(specializations.data?.data.data.length > 0) && (
                    <div className="flex flex-wrap gap-6">
                      {specializations.data?.data.data.map(
                        (
                          specialization: { name: string; _id: string },
                          i: number
                        ) => (
                          <div key={i} className="flex items-center gap-x-2">
                            <CheckBox
                              checked={selectedSpecializations.includes(
                                specialization._id
                              )}
                              iconStyle=""
                              className="border border-black-main"
                              customSetIsChecked={() =>
                                toggleCheck(specialization._id)
                              }
                            />
                            <span className="text-black-main">
                              {specialization.name}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  )}
                {/* {specializations.isSuccess &&
                  Boolean(specializations.data?.data.data.length <= 0) && (
                    <p>
                      There's no specialization to choose from. Please create
                      specialization
                    </p>
                  )} */}
                {specializations.isSuccess &&
                  !Boolean(specializations.data?.data.data.length) && (
                    <div className="flex justify-center bg-white/80 min-h-screen">
                      <div className="max-w-[500px] px-2 flex flex-col items-center pt-10">
                        <img src="/assets/graphics/empty-box.svg" />
                        <p className="text-center font-poppins text-lg font-semibold px-[10%] text-black-main">
                          No created specialization found
                        </p>
                      </div>
                    </div>
                  )}
                {/* {specializations.isSuccess && specializations.data.data.data} */}
                {/* <RadioGroupComponent
                  value={subcontractorFormState.specializations}
                  setValue={(value: string) =>
                    setSubcontractorFormState((prev) => ({
                      ...prev,
                      specializations: value,
                    }))
                  }
                  options={[
                    "Heating/Cooling",
                    "Insulation",
                    "Lighting",
                    "Flexible Dispatch",
                    "Others",
                  ]}
                /> */}
              </div>
              <div className="mt-8">
                <Button
                  disabled={
                    inviteSubcontractor.isPending ||
                    Object.values(subcontractorFormState).some(
                      (val) => val.trim() === ""
                    ) ||
                    Boolean(!selectedSpecializations.length)
                  }
                  className="rounded-lg text-white mt-4 w-full h-11"
                >
                  {inviteSubcontractor.isPending ? (
                    <Oval
                      visible={inviteSubcontractor.isPending}
                      height="20"
                      width="20"
                      color="#ffffff"
                      ariaLabel="oval-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  ) : (
                    <span>Submit</span>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
{
  /* table */
}
{
  /* <div>{getCurrentTData[activeTab]}</div> */
}

export default Registration;
