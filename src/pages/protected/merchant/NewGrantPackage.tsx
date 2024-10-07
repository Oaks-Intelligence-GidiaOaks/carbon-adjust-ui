import { IoArrowBack } from "react-icons/io5";

import ProductCard from "@/components/reusables/ProductCard";
import { Button, DropBox, Input } from "@/components/ui";
import SelectInput from "@/components/ui/SelectInput";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import TextArea from "@/components/ui/TextArea";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  createGrantPackage,
  getPackageCategories,
  getRecentPackagesQuery,
} from "@/services/merchant";

import { PiPlus } from "react-icons/pi";
import { BiTrash, BiX } from "react-icons/bi";
import { cn, formatLargeNumber } from "@/utils";
import { Oval } from "react-loader-spinner";
import { questionTypes } from "@/constants";
import SwitchButton from "@/components/ui/Switch";
import {
  PackageDomain,
  PackageState,
  QuestionType,
} from "@/interfaces/product.interface";
import AddMerchantModal from "@/components/dialogs/AddMerchantModal";
import InviteFacilitatorModal from "@/components/dialogs/InviteFacilitatorModal";
import { SubUserCard } from "@/components/reusables/SubUserCard";

type Props = {};

interface IPackageState extends Partial<PackageState> {
  grantCode: string;
  minAmount: number;
  maxAmount: number;
  facilitators: Array<{ name: string; email: string; _id: string }>;
  merchant: Array<{ name: string; email: string; _id: string }>;
  packageDomain: PackageDomain;
}

const NewGrantPackage = (_: Props) => {
  const navigate = useNavigate();

  const getCategories = useQuery({
    queryKey: ["get categories"],
    queryFn: getPackageCategories,
  });

  const grantCategory =
    getCategories?.data?.data?.data?.categories.filter(
      (it: any) => it.name === "Grant"
    ) || [];

  let labelStyle = `!fonty-[400] !text-sm !leading-[23.97px] !text-[#333333] !mb-[10px]`;

  const [option, setOption] = useState("");

  const [file, setFile] = useState<File[] | null>([]);
  const [downloadableFile, setDownloadableFile] = useState<File[] | null>([]);

  const [showMerchantModal, setShowMerchantModal] = useState(false);
  const [showFacilitatorModal, setShowFacilitatorModal] = useState(false);

  const [packageState, setPackageState] = useState<IPackageState>({
    title: "",
    category: {
      label: "",
      value: "",
    },
    grantCode: "",
    description: "",
    packageDomain: PackageDomain.GRANT_PACKAGE,
    minAmount: 0,
    maxAmount: 0,
    facilitators: [],
    merchant: [],
    hasQuestion: false,
    questions: [],
    hasDownloadedableFile: false,
    isAiEnergyPackage: false,
  });

  const createPackageMutation = useMutation({
    mutationKey: ["create-grant-package"],
    mutationFn: (data: any) => createGrantPackage(data),
    // @ts-ignore
    onSuccess: (sx: any) => {
      toast.success(sx.message);
      navigate("/merchant/packages");
    },
    // @ts-ignore
    onError: (ex: any) => {
      toast.error(ex.response.data.message);
    },
  });

  const handleSubmit = () => {
    const formData = new FormData();

    if (file) {
      formData.append("file", file[0]);
    }

    const iterators = ["category", "facilitators", "merchant", "questions"];

    Object.entries(packageState).forEach(([key, val]) => {
      if (!iterators.includes(key)) {
        formData.append(key, val);
      }

      switch (key) {
        case iterators[0]:
          formData.append(key, val.value);
          break;
        case iterators[1]:
          for (let i of val) {
            formData.append(key, i._id);
          }
          break;
        case iterators[2]:
          for (let i of val) {
            formData.append(key, i._id);
          }
          break;
        case iterators[3]:
          if (packageState.hasQuestion) {
            const formattedQuestions = packageState.questions?.map(
              (q, index) => {
                // Prepare the question structure
                const questionStructure: any = {
                  [`questions[${index}][title]`]: q.title,
                  [`questions[${index}][isRequired]`]: q.isRequired,
                  [`questions[${index}][questionType]`]: q.questionType.value,
                };

                // Handle options for each question
                const options =
                  !Boolean(q.options?.length) &&
                  q.questionType.value === "Binary Response Question"
                    ? ["Yes", "No"]
                    : q.options || [];

                options.forEach((option, optIndex) => {
                  questionStructure[
                    `questions[${index}][options][${optIndex}]`
                  ] = option;
                });

                return questionStructure;
              }
            );

            // Append each question and options to formData
            formattedQuestions!.forEach((formattedQuestion) => {
              Object.keys(formattedQuestion).forEach((key) => {
                formData.append(key, JSON.stringify(formattedQuestion[key]));
              });
            });
          }
          break;
      }
    });

    createPackageMutation.mutate(formData);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setPackageState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addMerchants = (
    merchant: Array<{ name: string; email: string; _id: string }>
  ) => {
    setPackageState((prev) => ({
      ...prev,
      merchant,
    }));

    setShowMerchantModal(false);
  };

  const addFacilitators = (
    facilitators: Array<{ name: string; email: string; _id: string }>
  ) => {
    setPackageState((prev) => ({
      ...prev,
      facilitators,
    }));

    setShowFacilitatorModal(false);
  };

  const recentPackages = useQuery({
    queryKey: ["get-recent-packages"],
    queryFn: getRecentPackagesQuery,
  });

  const removeMerchant = (merchantId: string) => {
    let merchants = packageState.merchant.filter((it) => it._id !== merchantId);

    setPackageState((prev) => ({
      ...prev,
      merchant: merchants,
    }));
  };
  const removeFacilitator = (facilitatorId: string) => {
    let facilitators = packageState.facilitators.filter(
      (it) => it._id !== facilitatorId
    );

    setPackageState((prev) => ({
      ...prev,
      facilitators,
    }));
  };

  return (
    <div className="px-2 xl:px-8">
      <div className="flex-center gap-2">
        <Link to={`/merchant/packages`}>
          <IoArrowBack color="#333333" />
        </Link>

        <h2 className="text-[#333333] font-[600] text-lg">
          Create New Package
        </h2>
      </div>

      <div className="flex items-start mt-[28px]">
        <div className="md:flex-[0.7] flex flex-col gap-[20px] bg-white px-6 text-[#575757] text-sm font-[400] ">
          {/* image upload */}
          <div className="flex flex-col">
            <h2 className="text-black-main font-[400] ">Package Image</h2>
            <DropBox value={file} setSelectedFiles={setFile} />
          </div>

          <Input
            name="title"
            label="Package title"
            inputClassName="border p-3 bg-[#E4E7E8] rounded-[12px] placeholder:text-left placeholder:align-top"
            labelClassName={labelStyle}
            placeholder="Enter package title"
            value={packageState.title}
            onChange={handleInputChange}
          />

          <TextArea
            rows={4}
            name="description"
            label="Package Description"
            labelClassName="pb-[10px]"
            inputClassName="border p-3 bg-[#E4E7E8] resize-none h-[100px] rounded-[12px] placeholder:text-left placeholder:align-top"
            placeholder="Write a brief Description of the Package"
            onChange={handleInputChange}
          />

          <Input
            name="grantCode"
            label="Grant Code"
            placeholder="Code"
            inputClassName="border p-3 bg-[#E4E7E8] rounded-[12px] placeholder:text-left placeholder:align-top"
            value={packageState.grantCode}
            onChange={handleInputChange}
          />

          <SelectInput
            options={
              Boolean(grantCategory.length)
                ? grantCategory.map((cat: { name: string; _id: string }) => ({
                    label: cat.name,
                    value: cat._id,
                  }))
                : []
            }
            className="border border-none"
            label="Category"
            onChange={(val) =>
              setPackageState((prev) => ({
                ...prev,
                category: val ? val : { label: "", value: "" },
              }))
            }
            placeholder="Select Category"
          />

          {/* <div className="flex-center gap-[11px]">
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
              className="border accent-ca-blue border-[#575757] h-[19px] w-[19px]"
            />

            <p>Has downloadable file</p>
          </div> */}

          {/* optional content starts here */}
          {packageState.hasDownloadedableFile && (
            <DropBox
              value={downloadableFile}
              setSelectedFiles={setDownloadableFile}
            />
          )}

          <div>
            <div className="pb-3">
              <label htmlFor="">Amount</label>
            </div>

            <div className="flex-center">
              <div className="w-1/2 pr-[20px]">
                <Input
                  min={0}
                  name="minAmount"
                  type="number"
                  label=""
                  labelClassName="mb-4 font-poppins text-black-main"
                  inputClassName="border p-3 bg-[#E4E7E8] rounded-[12px] placeholder:text-left placeholder:align-top"
                  placeholder="Min amount"
                  prependIcon={<p className="font-medium pl-2">£</p>}
                  value={packageState.minAmount}
                  onChange={handleInputChange}
                />
              </div>

              <div className="w-1/2">
                <Input
                  min={0}
                  type="number"
                  name="maxAmount"
                  label=""
                  labelClassName="mb-4 font-poppins text-black-main"
                  inputClassName="border p-3 bg-[#E4E7E8] rounded-[12px] placeholder:text-left placeholder:align-top"
                  placeholder="Max amount"
                  prependIcon={<p className="font-medium pl-2">£</p>}
                  value={packageState.maxAmount}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* Sub merchants  */}
          <div className="">
            <h2
              onClick={() => setShowMerchantModal(true)}
              className="underline text-[#0E89F7] text-sm font-[400] cursor-pointer"
            >
              Add Merchant
            </h2>

            <div className="flex-center flex-wrap gap-2 mt-3">
              {Array.from(packageState.merchant, (it, i) => (
                <div
                  onClick={() => removeMerchant(it._id)}
                  className="cursor-pointer"
                >
                  <SubUserCard key={i} {...it} />
                </div>
              ))}
            </div>
          </div>

          {/* Sub Facilitators */}
          <div className="">
            <h2
              onClick={() => setShowFacilitatorModal(true)}
              className="underline text-[#0E89F7] text-sm font-[400] cursor-pointer"
            >
              Add Facilitator
            </h2>

            <div className="flex-center flex-wrap gap-2 mt-3">
              {Array.from(packageState.facilitators, (it, i) => (
                <div
                  onClick={() => removeFacilitator(it._id)}
                  className="cursor-pointer"
                >
                  <SubUserCard {...it} key={i} />
                </div>
              ))}
            </div>
          </div>

          <div className="flex-center gap-[11px]">
            <input
              type="checkbox"
              name=""
              id=""
              className="border accent-ca-blue border-[#575757] h-[19px] w-[19px] "
              onChange={() => {
                setPackageState((prev) => ({
                  ...prev,
                  questions: !prev.hasQuestion
                    ? [
                        {
                          title: "",
                          questionType: { label: "", value: "" },
                          isRequired: false,
                        },
                      ]
                    : [],
                  hasQuestion: !prev.hasQuestion,
                }));
              }}
            />

            <p>Additional Questions</p>
          </div>

          {packageState.hasQuestion && (
            <div className="mt-4 flex flex-col gap-y-6">
              {packageState?.questions?.map((q, i: number) => (
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
                        const list = [...packageState.questions!];
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
                      onChange={(val) => {
                        let newList = [...packageState.questions!];
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
                              const list = [...packageState.questions!];
                              const options = [
                                ...(packageState?.questions?.[i]?.options ??
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
                            <div
                              key={ind}
                              className="pl-2 gap-1 flex items-center bg-gray-100 rounded-md"
                            >
                              <span>{op}</span>
                              <Button
                                variant={"outline"}
                                onClick={() => {
                                  const list = [...packageState.questions!];
                                  const options = [
                                    ...(packageState.questions?.[i]?.options ??
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
                    {/* required */}
                    <div className="flex justify-start gap-4 mt-3 items-center">
                      <SwitchButton
                        value={q.isRequired}
                        onCheckedChange={(val) => {
                          const list = [...packageState.questions!];
                          list[i].isRequired = val;
                          setPackageState((prev) => ({
                            ...prev,
                            questions: list,
                          }));
                        }}
                      />
                      <p>Required</p>
                    </div>
                  </div>
                  {packageState.questions?.length! > 1 && (
                    <Button
                      variant={"ghost"}
                      className="flex justify-center items-center p-0 h-10 hover:bg-transparent mb-1"
                      onClick={() => {
                        let newList = [...packageState.questions!];
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
                      ...prev.questions!,
                      {
                        title: "",
                        questionType: { label: "", value: "" },
                        isRequired: false,
                      }, // Correctly initialize questionType as an object
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
                    price={
                      p?.price
                        ? `${p?.currency ?? "£"}${formatLargeNumber(p?.price)}`
                        : 0
                    }
                    attachments={p?.attachments}
                    title={p?.title}
                    discount={p?.discount}
                    isMerchant={true}
                  />
                ))}
          </div>
        </div>
      </div>

      {showMerchantModal && (
        <AddMerchantModal
          addSubUsers={addMerchants}
          merchants={packageState.merchant}
          setShowModal={setShowMerchantModal}
          showModal={showMerchantModal}
        />
      )}

      {showFacilitatorModal && (
        <InviteFacilitatorModal
          facilitators={packageState.facilitators}
          addSubUsers={addFacilitators}
          setShowModal={setShowFacilitatorModal}
          showModal={showFacilitatorModal}
        />
      )}
    </div>
  );
};

export default NewGrantPackage;
