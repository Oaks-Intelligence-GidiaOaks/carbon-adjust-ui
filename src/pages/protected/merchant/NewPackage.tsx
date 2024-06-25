import { IoArrowBack } from "react-icons/io5";

import ProductCard from "@/components/reusables/ProductCard";
import { Button, CountryRegionDropdown, DropBox, Input } from "@/components/ui";
import SelectInput from "@/components/ui/SelectInput";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import TextArea from "@/components/ui/TextArea";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  createPackageQuery,
  getPackageCategories,
  getRecentPackagesQuery,
} from "@/services/merchant";
import { Country, State } from "country-state-city";
import Select, {
  CSSObjectWithLabel,
  GroupBase,
  MenuListProps,
  MultiValue,
  OptionProps,
} from "react-select";
import { PiPlus } from "react-icons/pi";
import { BiTrash, BiX } from "react-icons/bi";
import {
  cn,
  convertFormattedStringToNumber,
  formatLargeNumber,
  formatNumberWithCommas,
} from "@/utils";
import { Oval } from "react-loader-spinner";
import { questionTypes } from "@/constants";
import { SelectItem } from "@/types/formSelect";

type Props = {};
export type QuestionType = {
  label:
    | ""
    | "Binary Response Question"
    | "Open-Ended Question"
    | "Single-Choice Question"
    | "Multiple-Choice Question"
    | "File Upload Response"
    | string;
  value:
    | ""
    | "Binary Response Question"
    | "Open-Ended Question"
    | "Single-Choice Question"
    | "Multiple-Choice Question"
    | "File Upload Response"
    | string;
};

export type Question = {
  title: string;
  questionType: QuestionType;
  options?: string[];
  _id?: string;
};
export type PackageState = {
  title: string;
  category: {
    label: string;
    value: string;
  };
  packageType: {
    label: string;
    value: string;
  };
  description: string;
  country: {
    label: string;
    value: string;
  };
  price: string;
  discount: string;
  regions: MultiValue<any>;
  allowPartPayment: boolean;
  percentPayment: string;
  hasSchedule: boolean;
  hasQuestion: boolean;
  questions: Question[];
  askPurchaserQuote: boolean;
  hasDownloadedableFile: boolean;
};
export const customStyles = {
  container: (provided: CSSObjectWithLabel) => ({
    ...provided,
    height: "45px",
  }),
  control: (provided: CSSObjectWithLabel) => ({
    ...provided,
    height: "45px",
    minHeight: "40px",
    border: "none",
    boxShadow: "none",
    backgroundColor: "#E4E7E8",
    borderRadius: "0.75rem", // equivalent to rounded-xl
    paddingRight: "12px",
    color: "hsl(210,9%,31%) !important",
    outline: "none !important", // Ensure no outline with important
  }),
  placeholder: (provided: CSSObjectWithLabel) => ({
    ...provided,
    fontSize: "14px",
    fontFamily: "Poppins, sans-serif",
    color: "hsla(210,9%,31%,.7) !important",
  }),
  option: (
    provided: CSSObjectWithLabel,
    state: OptionProps<SelectItem, false, GroupBase<SelectItem>>
  ) => ({
    ...provided,
    width: "98.5%",
    margin: "0 auto",
    borderRadius: state.isFocused || state.isSelected ? "0.25rem" : "none",
    fontWeight:
      state.isFocused || state.isSelected ? "400 !important" : "400 !important",
    padding: "11px",
    fontSize: "0.875rem", // 14px
    lineHeight: "21px",
    color: state.isFocused || state.isSelected ? "white" : "inherit",
    background: state.isFocused || state.isSelected ? "#2196F3" : "inherit",
  }),
  valueContainer: (
    provided: CSSObjectWithLabel,
    state: MenuListProps<SelectItem, false, GroupBase<SelectItem>>
  ) => ({
    ...provided,
    height: "40px",
    minHeight: "40px",
    color: state.hasValue ? "hsl(210,9%,31%) !important" : "inherit",
    border: "none",
    outline: "none",
    borderRadius: "0.75rem", // equival
    backgroundColor: state.hasValue ? "inherit" : "#E4E7E8",
  }),
  menuList: (
    provided: CSSObjectWithLabel,
    state: MenuListProps<SelectItem, false, GroupBase<SelectItem>>
  ) => ({
    ...provided,
    background: state.hasValue ? "transparent" : "inherit",
    borderRadius: "0.75rem",
  }),
  menuPortal: (
    provided: CSSObjectWithLabel,
    state: MenuListProps<SelectItem, false, GroupBase<SelectItem>>
  ) => ({
    ...provided,
    background: state.hasValue ? "transparent" : "inherit",
    borderRadius: "0.75rem",
  }),
};

const NewPackage = (_: Props) => {
  const navigate = useNavigate();

  const getCategories = useQuery({
    queryKey: ["get categories"],
    queryFn: getPackageCategories,
  });

  // let inputClassName = ` bg-[#E4E7E863] bg-opacity-30 text-xs text-black-main !font-[400]`;
  let labelStyle = `!fonty-[400] !text-sm !leading-[23.97px] !text-[#333333] !mb-[10px]`;

  const [option, setOption] = useState("");

  const [file, setFile] = useState<File[] | null>([]);
  const [downloadableFile, setDownloadableFile] = useState<File[] | null>([]);

  const [packageState, setPackageState] = useState<PackageState>({
    title: "",
    category: {
      label: "",
      value: "",
    },
    packageType: {
      label: "",
      value: "",
    },
    description: "",
    country: {
      label: "",
      value: "",
    },
    price: "",
    discount: "",

    regions: [] as MultiValue<any>,
    allowPartPayment: false,
    percentPayment: "",
    hasSchedule: false,
    hasQuestion: false,
    questions: [],
    askPurchaserQuote: false,
    hasDownloadedableFile: false,
  });

  const createPackageMutation = useMutation({
    mutationKey: ["create package"],
    mutationFn: (data: any) => createPackageQuery(data),
    onSuccess: (data) => {
      console.log(data);
      if (data.data.data.hasSchedule) {
        navigate(`/merchant/packages/schedule/${data.data.data._id}`);
        toast.success("Package created successfully");
      } else {
        navigate("/merchant/packages");
        toast.success("Package created successfully");
      }
    },
    onError: () => {
      toast.error("Error creating package");
    },
  });

  const handleSubmit = () => {
    const formData = new FormData();

    if (file) {
      file.forEach((f) => formData.append("file", f));
    }
    if (downloadableFile) {
      downloadableFile.forEach((f) => formData.append("downloadedDoc", f));
    }
    if (packageState.title) {
      formData.append("title", packageState.title);
    }
    if (packageState.category) {
      formData.append("category", packageState.category.value);
    }
    if (packageState.packageType) {
      formData.append("packageType", packageState.packageType.value);
    }
    if (packageState.country) {
      formData.append("country", packageState.country.label);
    }
    if (packageState.description) {
      formData.append("description", packageState.description);
    }
    if (Boolean(packageState.price)) {
      formData.append(
        "price",
        convertFormattedStringToNumber(packageState.price).toString()
      );
    }
    if (Boolean(packageState.discount)) {
      formData.append(
        "discount",
        convertFormattedStringToNumber(packageState.discount).toString()
      );
    }
    if (packageState.regions) {
      formData.append(
        "regions",
        JSON.stringify(packageState.regions.map((region) => region.label))
      );
    }
    // allowPartPayment: false,
    // percentPayment: "",
    // hasSchedule: false,
    // hasQuestion: false,
    // questions: [],
    // askPurchaserQuote: false,
    if (packageState.allowPartPayment) {
      formData.append(
        "allowPartPayment",
        String(packageState.allowPartPayment)
      );
    }
    if (packageState.percentPayment) {
      formData.append("percentPayment", String(packageState.percentPayment));
    }
    if (packageState.hasSchedule) {
      formData.append("hasSchedule", String(packageState.hasSchedule));
    }
    if (packageState.hasDownloadedableFile) {
      formData.append(
        "hasDownloadedableFile",
        String(packageState.hasDownloadedableFile)
      );
    }
    if (packageState.hasQuestion) {
      formData.append("hasQuestion", String(packageState.hasQuestion));
    }
    if (Boolean(packageState.questions.length)) {
      const formattedQuestions = packageState.questions.map((q) => ({
        title: q.title,
        questionType: q.questionType.value,
        ...(q.options ? { options: q.options } : {}),
      }));
      formData.append("questions", JSON.stringify(formattedQuestions));
    }
    if (packageState.askPurchaserQuote) {
      formData.append(
        "askPurchaserQuote",
        String(packageState.askPurchaserQuote)
      );
    }

    createPackageMutation.mutate(formData);
  };

  const recentPackages = useQuery({
    queryKey: ["get-recent-packages"],
    queryFn: getRecentPackagesQuery,
  });

  console.log(recentPackages.data);

  return (
    <div className="px-2 xl:px-8">
      <div className="flex-center gap-2">
        <Link to={`/merchant/packages`}>
          <IoArrowBack color="#333333" />
        </Link>

        <h2 className="text-[#333333] font-[600] text-lg">
          Create new package
        </h2>
      </div>

      <div className="flex items-start mt-[28px]">
        <div className="md:flex-[0.7] flex flex-col gap-[20px] bg-white px-6 text-[#575757] text-sm font-[400] ">
          {/* image upload */}
          <div className="flex flex-col">
            <h2 className="text-black-main font-[400] ">Package Image</h2>
            <DropBox value={file} setSelectedFiles={setFile} />
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
            value={packageState.title}
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
            // value={packageState.category}
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
            onChange={(val) =>
              setPackageState((prev) => ({
                ...prev,
                packageType: val ? val : { label: "", value: "" },
              }))
            }
            // value={packageState.packageType}
            placeholder="Select specific service"
          />
          {packageState.packageType.value.toLowerCase() === "product" && (
            <div className="flex-center gap-[11px]">
              <input
                type="checkbox"
                name=""
                id=""
                checked={packageState.hasDownloadedableFile}
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
          {packageState.hasDownloadedableFile && (
            <DropBox
              value={downloadableFile}
              setSelectedFiles={setDownloadableFile}
            />
          )}

          <div className="flex-center gap-[11px]">
            <input
              type="checkbox"
              name=""
              id=""
              checked={packageState.askPurchaserQuote}
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
          {!packageState.askPurchaserQuote && (
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

          <CountryRegionDropdown
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
            value={packageState.country}
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
                  (c) => c.isoCode === packageState.country.value
                ).length
              )
                ? State.getStatesOfCountry(
                    Country.getAllCountries().filter(
                      (c) => c.isoCode === packageState.country.value
                    )[0]?.isoCode
                  ).map((state) => ({
                    label: state.name,
                    value: state.isoCode,
                  }))
                : []
            }
            className="-mt-2"
            classNamePrefix="select"
            value={packageState.regions}
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
              className="border border-[#575757] h-[19px] w-[19px] "
              onChange={() => {
                setPackageState((prev) => ({
                  ...prev,
                  questions: !prev.hasQuestion
                    ? [{ title: "", questionType: { label: "", value: "" } }]
                    : [],
                  hasQuestion: !prev.hasQuestion,
                }));
              }}
            />

            <p>Additional Questions</p>
          </div>

          {packageState.hasQuestion && (
            <div className="mt-4 flex flex-col gap-y-6">
              {packageState.questions.map((q, i: number) => (
                <div className="flex gap-x-4 items-end">
                  <div className="flex flex-col flex-1">
                    <Input
                      name=""
                      label={`Question ${i + 1}`}
                      labelClassName="pb-[10px]"
                      value={q.title}
                      inputClassName="border p-3 bg-[#E4E7E8] rounded-[12px] placeholder:text-left placeholder:align-top"
                      placeholder={`Enter question`}
                      onChange={(e) => {
                        const list = [...packageState.questions];
                        list[i].title = e.target.value;
                        setPackageState((prev) => ({
                          ...prev,
                          questions: list,
                        }));
                      }}
                    />
                    <SelectInput
                      options={questionTypes}
                      className="border border-none mt-4"
                      // label="Category"
                      // value={packageState.category}
                      onChange={(val) => {
                        let newList = [...packageState.questions];
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
                      q.questionType.value === "Multiple-Choice Question") && (
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
                              const list = [...packageState.questions];
                              const options = [
                                ...(packageState.questions[i]?.options ?? []),
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
                                  const list = [...packageState.questions];
                                  const options = [
                                    ...(packageState.questions[i]?.options ??
                                      []),
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
                  {packageState.questions.length > 1 && (
                    <Button
                      variant={"ghost"}
                      className="flex justify-center items-center p-0 h-10 hover:bg-transparent mb-1"
                      onClick={() => {
                        let newList = [...packageState.questions];
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
                <PiPlus className="text-ca-blue" /> <span>Add question</span>
              </Button>
            </div>
          )}

          <Button
            onClick={handleSubmit}
            className="blue-gradient rounded-[12px] h-[46px] text-[#F8F9FA] font-[500] text-sm text-center mt-6"
          >
            {createPackageMutation.isPending ? (
              <Oval
                visible={createPackageMutation.isPending}
                height="20"
                width="20"
                color="#ffffff"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            ) : (
              <span>Create</span>
            )}
          </Button>
        </div>

        <div className="hidden md:block md:flex-[0.3] lg:px-[20px] xl:px-[40px] ">
          <h2 className="text-sm font-[600] ">Previously created packages</h2>

          <div className="mt-[19px] flex flex-col gap-[20px]">
            {Boolean(recentPackages.data?.data.data.packages.length) &&
              recentPackages.data?.data.data.packages
                .slice(0, 3)
                .map((p: any) => (
                  <ProductCard
                    {...p}
                    _id={p?._id}
                    questions={p?.question}
                    // slug=""
                    price={
                      p?.price
                        ? `${p?.currency ?? "£"}${formatLargeNumber(p?.price)}`
                        : 0
                    }
                    attachments={p?.attachments}
                    title={p?.title}
                    // rating={0}
                    discount={p?.discount}
                    // isHot={false}
                    isMerchant={true}
                  />
                ))}

            {/* {Array.from(recentPackages.data?.data.) => (
              <ProductCard
                cost="$24.99
                $400.00"
                image="/assets/graphics/paste-img.svg"
                name="Solar installation"
                rating={2}
                discount=""
                isHot={true}
              />
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPackage;
