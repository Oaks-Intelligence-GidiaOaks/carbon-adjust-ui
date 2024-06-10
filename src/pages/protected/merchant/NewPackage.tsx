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
import Select, { MultiValue } from "react-select";
import { PiPlus } from "react-icons/pi";
import { BiTrash } from "react-icons/bi";
import {
  convertFormattedStringToNumber,
  formatLargeNumber,
  formatNumberWithCommas,
} from "@/utils";
import { Oval } from "react-loader-spinner";

type Props = {};
type PackageState = {
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
  questions: { title: string }[];
  askPurchaserQuote: boolean;
};

const NewPackage = (_: Props) => {
  const navigate = useNavigate();

  const getCategories = useQuery({
    queryKey: ["get categories"],
    queryFn: getPackageCategories,
  });

  // let inputClassName = ` bg-[#E4E7E863] bg-opacity-30 text-xs text-black-main !font-[400]`;
  let labelStyle = `!fonty-[400] !text-sm !leading-[23.97px] !text-[#333333] !mb-[10px]`;

  const [file, setFile] = useState<File[] | null>([]);

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
    if (packageState.hasQuestion) {
      formData.append("hasQuestion", String(packageState.hasQuestion));
    }
    if (Boolean(packageState.questions.length)) {
      formData.append("questions", JSON.stringify(packageState.questions));
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
        <div className=" flex-[0.7] flex flex-col gap-[20px] bg-white px-6 text-[#575757] text-sm font-[400] ">
          {/* image upload */}
          <div className="flex flex-col">
            <h2 className="text-black-main font-[400] ">Package attachment</h2>
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
            value={packageState.category}
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
            placeholder="Select specific service"
          />

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
            wrapperClassName="bg-gray-100 w-full font-poppins"
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
            isMulti
            name="colors"
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
            className="basic-multi-select"
            classNamePrefix="select"
            value={packageState.regions}
            // isDisabled={formData.regions.length >= 5}
            onChange={(value) => {
              // if (value.length > 5) return;
              setPackageState((prev) => ({
                ...prev,
                regions: value,
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
                  questions: !prev.hasQuestion ? [{ title: "" }] : [],
                  hasQuestion: !prev.hasQuestion,
                }));
              }}
            />

            <p>Additional Questions</p>
          </div>

          {packageState.hasQuestion && (
            <div className="mt-4 flex flex-col gap-y-6">
              {packageState.questions.map((q: { title: string }, i: number) => (
                <div className="flex gap-x-4 items-end">
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
                      setPackageState((prev) => ({ ...prev, questions: list }));
                    }}
                  />
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
                    questions: [...prev.questions, { title: "" }],
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

        <div className="flex-[0.3] lg:px-[20px] xl:px-[40px] ">
          <h2 className="text-sm font-[600] ">Previously created packages</h2>

          <div className="mt-[19px] flex flex-col gap-[20px]">
            {Boolean(recentPackages.data?.data.data.packages.length) &&
              recentPackages.data?.data.data.packages.map((p: any) => (
                <ProductCard
                  cost={
                    p.price ? `${p.currency}${formatLargeNumber(p.price)}` : ""
                  }
                  image={p.attachments[0]}
                  name={p.title}
                  rating={0}
                  discount={p.discount}
                  isHot={false}
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
