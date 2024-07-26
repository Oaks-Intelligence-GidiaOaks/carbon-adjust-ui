// import React from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPackageDetails } from "@/services/merchantService";
import { Package } from "@/types/general";
import {
  convertFormattedStringToNumber,
  formatNumberWithCommas,
  isValidQuestionsArray,
} from "@/utils";
import { Button, DropBox, Input } from "@/components/ui";
import Loading from "@/components/reusables/Loading";
import { IoArrowBack } from "react-icons/io5";
import { DocumentCheckIcon } from "@heroicons/react/24/outline";
import Select, { MultiValue } from "react-select";
import { getPackageCategories, updatePackageQuery } from "@/services/merchant";
import { useEffect, useState } from "react";
import {
  customStyles,
  PackageState,
  Question,
  QuestionType,
} from "./NewPackage";
import TextArea from "@/components/ui/TextArea";
import SelectInput from "@/components/ui/SelectInput";
import CountryRegionDropDown from "@/components/ui/CountryRegionDropDown";
import { Country, State } from "country-state-city";
import { questionTypes } from "@/constants";
import { cn } from "@/lib/utils";
import { BiTrash, BiX } from "react-icons/bi";
import { PiPlus } from "react-icons/pi";
import { Oval } from "react-loader-spinner";
import toast from "react-hot-toast";
import { PackageImageUpload } from ".";
import VideoUploader from "@/components/reusables/VideoUploader";
import AIModal from "@/components/merchants/AIModal";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

type Props = {};

const UpdatePackage = (_: Props) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { packageId } = useParams<{ packageId: string }>();

  const user = useSelector((state: RootState) => state.user.user);

  const packageDetails = useQuery({
    queryKey: [packageId],
    queryFn: () => getPackageDetails(packageId as string),
  });

  console.log(packageDetails.data?.data.package);

  const getCategories = useQuery({
    queryKey: ["get categories"],
    queryFn: getPackageCategories,
    gcTime: 0,
  });

  // let inputClassName = ` bg-[#E4E7E863] bg-opacity-30 text-xs text-black-main !font-[400]`;
  let labelStyle = `!fonty-[400] !text-sm !leading-[23.97px] !text-[#333333] !mb-[10px]`;

  const [option, setOption] = useState("");

  // const [file, setFile] = useState<File[] | null>([]);
  const [downloadableFile, setDownloadableFile] = useState<File[] | null>([]);

  const [showAIModal, setShowAIModal] = useState(false);

  console.log(
    getCategories.data?.data.data.categories.length &&
      getCategories.data?.data.data.categories.filter(
        (c: any) =>
          c._id === (packageDetails.data?.data.package as Package)?.category._id
      )[0]?._id
  );

  const handleCloseAIModal = () => {
    setShowAIModal(false);
  };

  const handleValueChange = (val: boolean) => {
    packageState.isAiEnergyPackage = val;
  };

  const [packageState, setPackageState] = useState<PackageState>({
    title: (packageDetails.data?.data.package as Package)?.title,
    category: {
      label:
        getCategories.data?.data.data.categories.length &&
        getCategories.data?.data.data.categories.filter(
          (c: any) =>
            c._id ===
            (packageDetails.data?.data.package as Package)?.category._id
        )[0]?.name,
      value:
        getCategories.data?.data.data.categories.length &&
        getCategories.data?.data.data.categories.filter(
          (c: any) =>
            c._id ===
            (packageDetails.data?.data.package as Package)?.category._id
        )[0]?._id,
    },
    packageType: {
      label: (packageDetails.data?.data.package as Package)?.packageType,
      value: (packageDetails.data?.data.package as Package)?.packageType,
    },
    description: (packageDetails.data?.data.package as Package)?.description,
    country: {
      label: "",
      value: "",
    },
    price: (packageDetails.data?.data.package as Package)?.price ?? "",
    discount: (packageDetails.data?.data.package as Package)?.discount ?? "",

    regions: [] as MultiValue<any>,
    allowPartPayment:
      (packageDetails.data?.data.package as Package)?.allowPartPayment ?? false,
    percentPayment:
      (packageDetails.data?.data.package as Package)?.percentPayment ?? "",
    hasSchedule: (packageDetails.data?.data.package as Package)?.hasSchedule,
    hasQuestion:
      (packageDetails.data?.data.package as Package)?.hasQuestion ?? false,
    questions: [],
    askPurchaserQuote:
      (packageDetails.data?.data.package as Package)?.askPurchaserQuote ??
      false,
    hasDownloadedableFile:
      (packageDetails.data?.data.package as Package)?.hasDownloadedableFile ??
      false,
    isAiEnergyPackage:
      (packageDetails.data?.data.package as Package)?.isAiEnergyPackage ??
      false,
    aiPackageType: {
      label:
        (packageDetails.data?.data.package as Package)?.aiPackageType
          ?.split("-")
          ?.map((w) => w[0]?.toUpperCase() + w?.slice(1))
          ?.join(" ") ?? "",
      value:
        (packageDetails.data?.data.package as Package)?.aiPackageType ?? "",
    },
  });

  const updatePackageMutation = useMutation({
    mutationKey: ["update package"],
    mutationFn: (data: any) => updatePackageQuery(data, packageId!),
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: [packageId] });
      if (data.data.data.hasSchedule) {
        // navigate(`/merchant/packages/schedule/update/${data.data.data._id}`);
        navigate(`/merchant/packages`);
        toast.success("Package updated successfully");
      } else {
        navigate("/merchant/packages");
        toast.success("Package updated successfully");
      }
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message ?? "Error updating package");
    },
  });

  const handleSubmit = () => {
    // const formData = new FormData();

    const submissionObject: any = {};

    // if (downloadableFile) {
    //   downloadableFile.forEach((f) => formData.append("downloadedDoc", f));
    // }
    if (packageState?.title) {
      submissionObject.title = packageState?.title;
    }
    if (packageState?.category) {
      submissionObject.category = packageState?.category.value;
      // formData.append("category", packageState?.category.value);
    }
    if (packageState?.packageType) {
      submissionObject.packageType = packageState?.packageType.value;
      // formData.append("packageType", packageState?.packageType.value);
    }

    submissionObject.isAiEnergyPackage = packageState.isAiEnergyPackage;

    if (packageState.isAiEnergyPackage) {
      submissionObject.aiPackageType = packageState.aiPackageType.value;
    }
    if (packageState?.country) {
      submissionObject.country = packageState?.country.label;
      // formData.append("country", packageState?.country.label);
    }
    if (packageState?.description) {
      submissionObject.description = packageState?.description;
      // formData.append("description", packageState?.description);
    }
    if (Boolean(packageState?.price)) {
      submissionObject.price = convertFormattedStringToNumber(
        String(packageState?.price)
      );
      // formData.append(
      //   "price",
      //   convertFormattedStringToNumber(packageState?.price).toString()
      // );
    }
    if (Boolean(packageState?.discount)) {
      submissionObject.discount = convertFormattedStringToNumber(
        String(packageState?.discount)
      );
      // formData.append(
      //   "discount",
      //   convertFormattedStringToNumber(packageState?.discount).toString()
      // );
    }
    if (packageState?.regions) {
      submissionObject.regions = packageState?.regions.map(
        (region) => region.label
      );
      // formData.append(
      //   "regions",
      //   JSON.stringify(packageState?.regions.map((region) => region.label))
      // );
    }
    // allowPartPayment: false,
    // percentPayment: "",
    // hasSchedule: false,
    // hasQuestion: false,
    // questions: [],
    // askPurchaserQuote: false,
    // if (packageState?.allowPartPayment) {
    submissionObject.allowPartPayment = packageState?.allowPartPayment;
    // formData.append(
    //   "allowPartPayment",
    //   String(packageState?.allowPartPayment)
    // );
    // }
    if (packageState?.percentPayment) {
      submissionObject.percentPayment = packageState?.percentPayment;
      // formData.append("percentPayment", String(packageState?.percentPayment));
    }
    // if (packageState?.hasSchedule) {
    submissionObject.hasSchedule = packageState?.hasSchedule;
    // formData.append("hasSchedule", String(packageState?.hasSchedule));
    // }
    if (packageState?.hasDownloadedableFile) {
      submissionObject.hasDownloadedableFile =
        packageState?.hasDownloadedableFile;
      // formData.append(
      //   "hasDownloadedableFile",
      //   String(packageState?.hasDownloadedableFile)
      // );
    }
    // if (packageState?.hasQuestion) {
    submissionObject.hasQuestion = packageState?.hasQuestion;
    // formData.append("hasQuestion", String(packageState?.hasQuestion));
    // }
    // if (packageState?.askPurchaserQuote) {
    submissionObject.askPurchaserQuote = packageState?.askPurchaserQuote;
    // formData.append(
    //   "askPurchaserQuote",
    //   String(packageState?.askPurchaserQuote)
    // );
    // }
    if (packageState.hasQuestion) {
      if (isValidQuestionsArray(packageState?.questions)) {
        const formattedQuestions = packageState?.questions.map((q) => ({
          title: q.title,
          questionType: q.questionType.value,
          ...(q.options ? { options: q.options } : {}),
          ...(q._id ? { _id: q._id } : {}),
        }));
        submissionObject.questions = formattedQuestions;
        if (
          (packageDetails.data?.data.package as Package).energyBillQuestionId &&
          !formattedQuestions.some(
            (q: any) =>
              q._id ===
              (packageDetails.data?.data.package as Package)
                .energyBillQuestionId
          )
        ) {
          const formattedQuestions = (
            packageDetails.data?.data.package as Package
          )?.questions
            .filter(
              (q) =>
                q._id ===
                (packageDetails.data?.data.package as Package)
                  .energyBillQuestionId
            )
            .map((q: Question) => ({
              title: "Upload your energy bill",
              questionType: "File Upload Response Question",
              ...(q.questionType.value === "Single-Choice Question" ||
              q.questionType.value === "Multiple-Choice Question"
                ? { options: q.options }
                : {}),
              ...(q._id ? { _id: q._id } : {}),
            }));
          submissionObject.questions = [
            ...(submissionObject.questions ?? []),
            ...formattedQuestions,
          ];
        }
        // formData.append("questions", JSON.stringify(formattedQuestions));
      } else {
        return;
      }
    }
    console.log(packageState);

    if (
      !packageState.hasQuestion &&
      packageState.questions.some(
        (q) =>
          q._id ===
          (packageDetails.data?.data.package as Package).energyBillQuestionId
      )
    ) {
      const formattedQuestions = (
        packageDetails.data?.data.package as Package
      )?.questions
        .filter(
          (q) =>
            q._id ===
            (packageDetails.data?.data.package as Package).energyBillQuestionId
        )
        .map((q: Question) => ({
          title: q.title,
          questionType: q.questionType as any,
          ...(q.questionType.value === "Single-Choice Question" ||
          q.questionType.value === "Multiple-Choice Question"
            ? { options: q.options }
            : {}),
          ...(q._id ? { _id: q._id } : {}),
        }));
      submissionObject.questions = [
        ...(submissionObject.questions ?? []),
        ...formattedQuestions,
      ];
    }

    if (
      !packageState.hasQuestion &&
      !packageState.questions.some(
        (q) =>
          q._id ===
          (packageDetails.data?.data.package as Package).energyBillQuestionId
      )
    ) {
      const formattedQuestions = [
        {
          title: "Upload your energy bill",
          questionType: "File Upload Response Question",
          _id: (packageDetails.data?.data.package as Package)
            .energyBillQuestionId,
        },
      ];
      submissionObject.questions = [
        ...(submissionObject.questions ?? []),
        ...formattedQuestions,
      ];
    }

    console.log(submissionObject);

    updatePackageMutation.mutate(submissionObject);
  };

  useEffect(() => {
    if (getCategories.isSuccess && packageDetails.isSuccess) {
      setTimeout(() => {
        setPackageState((prev) => ({
          ...prev,
          title: (packageDetails.data?.data.package as Package)?.title,
          category: {
            label:
              getCategories.data?.data.data.categories.length &&
              getCategories.data?.data.data.categories.filter(
                (c: any) =>
                  c._id ===
                  (packageDetails.data?.data.package as Package)?.category._id
              )[0]?.name,
            value:
              getCategories.data?.data.data.categories.length &&
              getCategories.data?.data.data.categories.filter(
                (c: any) =>
                  c._id ===
                  (packageDetails.data?.data.package as Package)?.category._id
              )[0]?._id,
          },
          packageType: {
            label: (packageDetails.data?.data.package as Package)?.packageType,
            value: (packageDetails.data?.data.package as Package)?.packageType,
          },
          description: (packageDetails.data?.data.package as Package)
            ?.description,
          country: {
            label: (packageDetails.data?.data.package as Package)?.country,
            value: (packageDetails.data?.data.package as Package)?.country,
          },
          price: (packageDetails.data?.data.package as Package)?.price ?? "",
          discount:
            (packageDetails.data?.data.package as Package)?.discount ?? "",

          regions: (packageDetails.data?.data.package as Package)?.regions.map(
            (v) => ({ label: v, value: v })
          ),
          allowPartPayment:
            (packageDetails.data?.data.package as Package)?.allowPartPayment ??
            false,
          percentPayment:
            (packageDetails.data?.data.package as Package)?.percentPayment ??
            "",
          hasSchedule: (packageDetails.data?.data.package as Package)
            ?.hasSchedule,
          hasQuestion:
            ((packageDetails.data?.data.package as Package)?.hasQuestion ||
              Boolean(
                (packageDetails.data?.data.package as Package)?.questions.length
              )) ??
            false,
          questions: (packageDetails.data?.data.package as Package)?.questions
            .length
            ? (packageDetails.data?.data.package as Package)?.questions.map(
                (q: Question) => ({
                  title: q.title,
                  questionType: {
                    label: q.questionType as any,
                    value: q.questionType as any,
                  },
                  ...((q.questionType as any) === "Single-Choice Question" ||
                  (q.questionType as any) === "Multiple-Choice Question"
                    ? { options: q.options }
                    : {}),
                  ...(q._id ? { _id: q._id } : {}),
                })
              )
            : [],

          askPurchaserQuote:
            (packageDetails.data?.data.package as Package)?.askPurchaserQuote ??
            false,
          hasDownloadedableFile:
            (packageDetails.data?.data.package as Package)
              ?.hasDownloadedableFile ?? false,

          isAiEnergyPackage:
            (packageDetails.data?.data.package as Package)?.isAiEnergyPackage ??
            false,
          aiPackageType: {
            label:
              (packageDetails.data?.data.package as Package)?.aiPackageType
                ?.split("-")
                ?.map((w) => w[0]?.toUpperCase() + w?.slice(1))
                ?.join(" ") ?? "",
            value:
              (packageDetails.data?.data.package as Package)?.aiPackageType ??
              "",
          },
        }));
      }, 1000);
    }
  }, [getCategories.isSuccess, packageDetails.isSuccess]);

  console.log(packageState.questions);
  console.log(packageDetails.data?.data.package);

  return (
    <>
      {(packageDetails.isLoading || getCategories.isLoading) && (
        <div className="mt-6">
          <Loading message="" />
        </div>
      )}
      {packageDetails.isSuccess && getCategories.isSuccess && (
        <div className="px-2 xl:px-8">
          <div className="flex-center gap-2">
            <Link to={`/merchant/packages`}>
              <IoArrowBack color="#333333" />
            </Link>

            <h2 className="text-[#333333] font-[600] text-lg">Edit package</h2>
          </div>

          <div className="flex items-start mt-[28px]">
            <div className="md:flex-[0.7] flex flex-col gap-[20px] bg-white px-6 text-[#575757] text-sm font-[400] ">
              {/* image upload */}

              <div className="flex justify-between flex-wrap gap-4">
                <div className="flex flex-col">
                  <h2 className="text-black-main font-[400] ">Package Image</h2>

                  {/* <DropBox value={file} setSelectedFiles={setFile} />
                {(packageDetails.data?.data.package as Package)
                  .attachments[0] &&
                  file?.length === 0 && (
                    <div className="mt-2 border rounded-md p-2 flex gap-x-3">
                      <DocumentCheckIcon className="size-5" />
                      <p>
                        {(
                          packageDetails.data?.data.package as Package
                        ).attachments[0]
                          ?.split("/")
                          .pop()}
                      </p>
                    </div>
                  )} */}

                  <div>
                    <PackageImageUpload
                      packageId={packageId!}
                      defaultUrl={
                        (packageDetails.data?.data.package as Package)
                          .attachments
                          ? (packageDetails.data?.data.package as Package)
                              .attachments[0]
                          : "/assets/graphics/pkg-1.png}"
                      }
                    />
                  </div>
                  {/* <div className="h-[150px] flex  flex-col  items-center justify-center gap-[] w-full border border-dotted ">
                <div className="h-[42px] w-[42px] rounded-full bg-[#F2F4F7] grid place-items-center">
                  <img src="/assets/icons/upload-cloud.svg" alt="" />
                </div>
  
                <h2 className="font-[400] text-sm mt-[20px] text-center text-[#333333]">
                  Click to Upload your image or Video
                </h2>
  
                <h4 className="text-[#828282] mt-1 font-[400] text-sm">
                  or drag and drop
                </h4>
              </div> */}
                </div>
                <div className="flex-1 flex flex-col justify-stretch">
                  <h2 className="text-black-main font-normal mb-2">
                    Video Description
                  </h2>
                  <VideoUploader
                    packageId={packageId!}
                    videoUrl={packageDetails.data?.data?.package?.videoUrl}
                    uploadEndpoint={`packages/${packageId}/video/upload`}
                  />
                </div>
              </div>

              {/* <Input
              name=""
              label="Package ID"
              labelClassName="pb-[10px]"
              inputClassName="border p-3 bg-[#E4E7E8]"
              placeholder="Window Retrofitting"
            /> */}

              <Input
                name="name"
                label="Package name"
                inputClassName="border p-3 bg-[#E4E7E8] rounded-[12px] placeholder:text-left placeholder:align-top"
                labelClassName={labelStyle}
                placeholder="Enter package name"
                value={packageState?.title}
                onChange={(e) =>
                  setPackageState((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
              />

              <TextArea
                rows={4}
                name=""
                label="Package Description"
                labelClassName="pb-[10px]"
                value={packageState?.description}
                inputClassName="border p-3 bg-[#E4E7E8] resize-none h-[100px] rounded-[12px] placeholder:text-left placeholder:align-top"
                placeholder="Write a brief Description of the Package"
                onChange={(e) =>
                  setPackageState((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />

              <SelectInput
                options={
                  Boolean(getCategories.data?.data.data.categories.length)
                    ? getCategories.data?.data.data.categories.map(
                        (cat: { name: string; _id: string }) => ({
                          label: cat.name,
                          value: cat._id,
                        })
                      )
                    : []
                }
                className="border border-none"
                label="Category"
                value={packageState?.category}
                onChange={(val) =>
                  setPackageState((prev) => ({
                    ...prev,
                    category: val ? val : { label: "", value: "" },
                  }))
                }
                placeholder="Select Category"
              />

              <SelectInput
                options={[
                  { label: "Service", value: "Service" },
                  { label: "Product", value: "Product" },
                ]}
                className=""
                label="Package Type"
                value={packageState?.packageType}
                onChange={(val) =>
                  setPackageState((prev) => ({
                    ...prev,
                    packageType: val ? val : { label: "", value: "" },
                  }))
                }
                // value={packageState?.packageType}
                placeholder="Select specific service"
              />

              {/* Only show this for internal merchants */}
              {user?.isInternalMerchant === true && (
                <>
                  <div className="flex-center gap-[11px]">
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      checked={packageState.isAiEnergyPackage}
                      onChange={() =>
                        setPackageState((prev) => ({
                          ...prev,
                          isAiEnergyPackage: !prev.isAiEnergyPackage,
                        }))
                      }
                      className="border border-[#575757] h-[19px] w-[19px]"
                    />

                    <p>AI Energy Package</p>
                  </div>

                  {packageState.isAiEnergyPackage && (
                    <SelectInput
                      options={[
                        {
                          label: "Transition Score",
                          value: "transition-score",
                        },
                        {
                          label: "Carbon Footprint",
                          value: "carbon-footprint",
                        },
                        { label: "Decarbonization", value: "decarbonization" },
                      ]}
                      className=""
                      label="AI Energy Package Type"
                      onChange={(val) =>
                        setPackageState((prev) => ({
                          ...prev,
                          aiPackageType: val ? val : { label: "", value: "" },
                        }))
                      }
                      value={packageState.aiPackageType}
                      placeholder="Select AI Energy package type"
                    />
                  )}

                  <AIModal
                    showModal={showAIModal}
                    onClose={() => {
                      handleCloseAIModal();
                    }}
                    onValueChange={handleValueChange}
                  />
                </>
              )}

              {packageState?.packageType?.value?.toLowerCase() ===
                "product" && (
                <div className="flex-center gap-[11px]">
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    checked={packageState?.hasDownloadedableFile}
                    onChange={() =>
                      setPackageState((prev) => ({
                        ...prev,
                        hasDownloadedableFile: !prev.hasDownloadedableFile,
                      }))
                    }
                    className="border border-[#575757] h-[19px] w-[19px]"
                  />

                  <p>Has downloadable file</p>
                </div>
              )}

              {/* optional content starts here */}
              {packageState?.hasDownloadedableFile && (
                <>
                  <DropBox
                    value={downloadableFile}
                    setSelectedFiles={setDownloadableFile}
                    disabled
                  />
                  {(packageDetails.data?.data.package as Package)
                    .attachments[0] &&
                    downloadableFile?.length === 0 && (
                      <div className="border rounded-md p-2 flex gap-x-3">
                        <DocumentCheckIcon className="size-5" />
                        <p>
                          {(
                            packageDetails.data?.data.package as Package
                          ).media[0]
                            ?.split("/")
                            .pop()}
                        </p>
                      </div>
                    )}
                </>
              )}

              <div className="flex-center gap-[11px]">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  checked={packageState?.askPurchaserQuote}
                  onChange={() =>
                    setPackageState((prev) => ({
                      ...prev,
                      askPurchaserQuote: !prev.askPurchaserQuote,
                    }))
                  }
                  className="border border-[#575757] h-[19px] w-[19px]"
                />

                <p>Purchasers should ask for a quote</p>
              </div>

              {/* optional content starts here */}
              {!packageState?.askPurchaserQuote && (
                <div className="flex-center">
                  <div className="w-1/2 pr-[20px]">
                    <Input
                      name="price"
                      label="Price"
                      labelClassName="mb-4 font-poppins text-black-main"
                      inputClassName="border p-3 bg-[#E4E7E8] rounded-[12px] placeholder:text-left placeholder:align-top"
                      placeholder="Enter amount"
                      prependIcon={<p className="font-medium pl-2">£</p>}
                      value={packageState!.price}
                      onChange={(e) =>
                        setPackageState!((prev) => {
                          // const newValue = e.target.value.replace(/[^0-9]/g, "");
                          return {
                            ...prev,
                            price: formatNumberWithCommas(e.target.value),
                          };
                        })
                      }
                    />
                  </div>

                  <div className="w-1/2">
                    <Input
                      name="discount"
                      label="Discount"
                      labelClassName="mb-4 font-poppins text-black-main"
                      inputClassName="border p-3 bg-[#E4E7E8] rounded-[12px] placeholder:text-left placeholder:align-top"
                      placeholder="Enter percentage"
                      appendIcon={<p className="font-medium pl-2">%</p>}
                      value={packageState!.discount}
                      onChange={(e) =>
                        setPackageState!((prev) => {
                          // const newValue = e.target.value.replace(/[^0-9]/g, "");
                          return {
                            ...prev,
                            discount: formatNumberWithCommas(e.target.value),
                          };
                        })
                      }
                    />
                  </div>
                </div>
              )}

              <CountryRegionDropDown
                name="country"
                labelClassName={labelStyle}
                options={Country.getAllCountries().map((country) => ({
                  label: country.name,
                  value: country.isoCode,
                  prefixIcon: country.flag,
                }))}
                searchable={true}
                label="Location"
                wrapperClassName="bg-gray-100 w-full font-poppins bg-[#E4E7E8]"
                placeholder="Select country"
                value={packageState?.country}
                countryChange={(value) => {
                  setPackageState((prev) => ({
                    ...prev,
                    regions: [],
                    country: value,
                  }));
                }}
              />

              <h2 className="text-black-main font-[400] ">City</h2>
              <Select
                isMulti={true as any}
                name="city"
                styles={customStyles as any}
                options={
                  Boolean(
                    Country.getAllCountries().filter(
                      (c) => c.isoCode === packageState?.country.value
                    ).length
                  )
                    ? State.getStatesOfCountry(
                        Country.getAllCountries().filter(
                          (c) => c.isoCode === packageState?.country.value
                        )[0]?.isoCode
                      ).map((state) => ({
                        label: state.name,
                        value: state.isoCode,
                      }))
                    : []
                }
                className="-mt-2"
                classNamePrefix="select"
                value={packageState?.regions}
                // isDisabled={formData.regions.length >= 5}
                onChange={(value) => {
                  // if (value.length > 5) return;
                  setPackageState((prev) => ({
                    ...prev,
                    regions: value || [], // Ensure it's always an array, even if value is null
                  }));
                }}
              />

              {/* optional checkbox */}
              <div className="flex-center gap-[11px]">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  className="border border-[#575757] h-[19px] w-[19px] "
                  checked={packageState?.hasSchedule}
                  onChange={() =>
                    setPackageState((prev) => ({
                      ...prev,
                      hasSchedule: !prev.hasSchedule,
                    }))
                  }
                />

                <p>Schedule Availability</p>
              </div>

              <div className="flex-center gap-[11px]">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  checked={packageState?.hasQuestion}
                  className="border border-[#575757] h-[19px] w-[19px] "
                  onChange={() => {
                    setPackageState((prev) => ({
                      ...prev,
                      questions: !prev.hasQuestion
                        ? [
                            ...(
                              packageDetails.data?.data.package as Package
                            )?.questions
                              .filter(
                                (q) =>
                                  q._id ===
                                  (packageDetails.data?.data.package as Package)
                                    .energyBillQuestionId
                              )
                              .map((q: Question) => ({
                                title: q.title,
                                questionType: {
                                  label: q.questionType as any,
                                  value: q.questionType as any,
                                },
                                ...(q.questionType.value ===
                                  "Single-Choice Question" ||
                                q.questionType.value ===
                                  "Multiple-Choice Question"
                                  ? { options: q.options }
                                  : {}),
                                ...(q._id ? { _id: q._id } : {}),
                              })),
                            {
                              title: "",
                              questionType: { label: "", value: "" },
                            },
                          ]
                        : [
                            ...((packageDetails.data?.data.package as Package)
                              ?.energyBillQuestionId
                              ? (
                                  packageDetails.data?.data.package as Package
                                )?.questions
                                  .filter(
                                    (q) =>
                                      q._id ===
                                      (
                                        packageDetails.data?.data
                                          .package as Package
                                      ).energyBillQuestionId
                                  )
                                  .map((q: Question) => ({
                                    title: q.title,
                                    questionType: {
                                      label: q.questionType as any,
                                      value: q.questionType as any,
                                    },
                                    ...(q.questionType.value ===
                                      "Single-Choice Question" ||
                                    q.questionType.value ===
                                      "Multiple-Choice Question"
                                      ? { options: q.options }
                                      : {}),
                                    ...(q._id ? { _id: q._id } : {}),
                                  }))
                              : []),
                          ],
                      hasQuestion: !prev.hasQuestion,
                    }));
                  }}
                />

                <p>Additional Questions</p>
              </div>

              {packageState?.hasQuestion && (
                <div className="mt-4 flex flex-col gap-y-6">
                  {packageState?.questions.map((q, i: number) => (
                    <div key={i} className="flex gap-x-4 items-end">
                      <div className="flex flex-col flex-1">
                        <Input
                          name=""
                          label={`Question ${i + 1}`}
                          labelClassName="pb-[10px]"
                          value={q.title}
                          inputClassName="border p-3 bg-[#E4E7E8] rounded-[12px] placeholder:text-left placeholder:align-top"
                          placeholder={`Enter question`}
                          onChange={(e) => {
                            const list = [...packageState?.questions];
                            list[i].title = e.target.value;
                            setPackageState((prev) => ({
                              ...prev,
                              questions: list,
                            }));
                          }}
                        />
                        <SelectInput
                          options={questionTypes}
                          disabledCallback={() => {}}
                          disabled={
                            q._id
                              ? q._id ===
                                (packageDetails.data?.data.package as Package)
                                  ?.energyBillQuestionId
                              : false
                          }
                          className="border border-none mt-4"
                          // label="Category"
                          value={q.questionType}
                          onChange={(val) => {
                            let newList = [...packageState?.questions];
                            newList[i].questionType = val
                              ? {
                                  label: val.label as QuestionType["label"],
                                  value: val.value as QuestionType["value"],
                                }
                              : { label: "", value: "" };
                            setPackageState((prev) => ({
                              ...prev,
                              questions: newList,
                            }));
                          }}
                          placeholder="Select question type"
                        />

                        {(q.questionType.value === "Single-Choice Question" ||
                          q.questionType.value ===
                            "Multiple-Choice Question") && (
                          <div className="rounded-xl mt-4">
                            <div className="flex justify-between">
                              <Input
                                name="option"
                                value={option}
                                inputClassName={cn(
                                  "border p-3 bg-[#E4E7E8] rounded-l-[12px] !rounded-r-[0] !rounded-b-[0] placeholder:text-left placeholder:align-top"
                                )}
                                placeholder={`Enter option`}
                                onChange={(e) => setOption(e.target.value)}
                              />
                              <Button
                                variant={"outline"}
                                onClick={() => {
                                  const list = [...packageState?.questions];
                                  const options = [
                                    ...(packageState?.questions[i]?.options ??
                                      []),
                                  ];
                                  options.push(option);
                                  list[i].options = options;
                                  setPackageState((prev) => ({
                                    ...prev,
                                    questions: list,
                                  }));
                                  setOption("");
                                }}
                                className="h-12 border-ca-blue !bg-ca-blue rounded-[12px] !rounded-b-[0] !rounded-l-[0] text-white"
                              >
                                Add
                              </Button>
                            </div>
                            {/* options container */}

                            <div className="min-h-10 border border-border rounded-b-[12px] p-2 flex flex-wrap gap-4">
                              {q.options?.map((op: string, ind: number) => (
                                <div className="pl-2 gap-1 flex items-center bg-gray-100 rounded-md">
                                  <span>{op}</span>
                                  <Button
                                    variant={"outline"}
                                    onClick={() => {
                                      const list = [...packageState?.questions];
                                      const options = [
                                        ...(packageState?.questions[i]
                                          ?.options ?? []),
                                      ];
                                      options.splice(ind, 1);
                                      list[i].options = options;
                                      setPackageState((prev) => ({
                                        ...prev,
                                        questions: list,
                                      }));
                                    }}
                                    className="bg-gray-200 hover:bg-gray-400 p-0 h-6 rounded-l-none"
                                  >
                                    <BiX />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      {packageState?.questions.length > 1 && (
                        <Button
                          variant={"ghost"}
                          className="flex justify-center items-center p-0 h-10 hover:bg-transparent mb-1"
                          onClick={() => {
                            let newList = [...packageState?.questions];
                            newList.splice(i, 1);
                            setPackageState((prev) => ({
                              ...prev,
                              questions: newList,
                            }));
                          }}
                        >
                          <BiTrash className="text-2xl hover:text-red-500" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    variant={"ghost"}
                    className="text-ca-blue flex gap-x-2 items-center px-0 mt-4"
                    onClick={() => {
                      setPackageState((prev) => ({
                        ...prev,
                        questions: [
                          ...prev.questions,
                          { title: "", questionType: { label: "", value: "" } }, // Correctly initialize questionType as an object
                        ],
                      }));
                    }}
                  >
                    <PiPlus className="text-ca-blue" />{" "}
                    <span>Add question</span>
                  </Button>
                </div>
              )}

              <Button
                onClick={handleSubmit}
                className="blue-gradient rounded-[12px] h-[46px] text-[#F8F9FA] font-[500] text-sm text-center mt-6"
              >
                {updatePackageMutation.isPending ? (
                  <Oval
                    visible={updatePackageMutation.isPending}
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

            <div className="hidden md:block md:flex-[0.3] lg:px-[20px] xl:px-[40px] "></div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdatePackage;
