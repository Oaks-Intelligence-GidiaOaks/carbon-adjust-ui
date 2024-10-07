import { Button, DropBox, Input } from "@/components/ui";
import SelectInput from "@/components/ui/SelectInput";
import TextArea from "@/components/ui/TextArea";
import { IClaimDataForm } from "@/interfaces/claim.interface";
import { getPackageCategories } from "@/services/merchant";
import { createClaim } from "@/services/merchantService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import { IoArrowBack } from "react-icons/io5";
import { Oval } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";

const NewClaim = () => {
  const navigate = useNavigate();

  const [claimData, setClaimData] = useState<IClaimDataForm>({
    name: "",
    description: "",
    category: { label: "", value: "" },
    amount: 0,
  });

  const [file, setFile] = useState<File[] | null>(null);

  let labelStyle = `!fonty-[400] !text-sm !leading-[23.97px] !text-[#333333] !mb-[10px]`;

  const { data: catData, isSuccess } = useQuery({
    queryKey: ["get categories"],
    queryFn: getPackageCategories,
  });

  const CreateClaim = useMutation({
    mutationKey: ["create-claim"],
    mutationFn: (arg: { inputData: FormData; packageId: string }) =>
      createClaim(arg),
    onSuccess: (sx) => {
      toast.success(sx.message);
      navigate(`/merchant/claims`);
    },
    onError: (ex: any) => {
      toast.error(ex.response.data.message);
    },
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;

    setClaimData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const allCategories: any = [];

  console.log(allCategories, "all categories");

  const inputCategories = isSuccess
    ? catData.data.data.categories
        .filter((item: any) => item.isDefault === false)
        .map((it: any) => {
          allCategories.push({
            packageId: it.packageId,
            categoryId: it._id,
          });

          return {
            label: it.name,
            value: it._id,
          };
        })
    : [];

  const handleSubmit = () => {
    const isValidated = !Boolean(
      Object.entries(claimData).filter(([key, val]) => {
        if (key === "category") {
          return !val.value.length;
        }

        if (key === "amount") {
          return val === 0 || val < 0 || !val;
        }

        return !val.length;
      }).length
    );

    if (!isValidated) return toast.error(`Not Validated`);

    const formData = new FormData();

    if (file) {
      formData.append("file", file[0]);
    }

    Object.entries(claimData).map(([key, val]) => {
      if (key === "category") {
        let value = val.value;
        formData.append(key, value);
      } else {
        formData.append(key, val);
      }
    });

    // let packageId = allCategories.filter((it)=> it._)

    CreateClaim.mutateAsync({
      inputData: formData,
      packageId: allCategories.filter(
        (it: any) => it.categoryId === claimData.category.value
      )?.[0].packageId,
    });
  };

  return (
    <div className="px-2 xl:px-8">
      <div className="flex-center gap-2">
        <Link to={`/merchant/claims`}>
          <IoArrowBack color="#333333" />
        </Link>

        <h2 className="text-[#333333] font-[600] text-lg">Create Claim</h2>
      </div>

      <div className="flex items-start mt-[28px]">
        <div className="md:flex-[0.7] flex flex-col gap-[20px] bg-white px-6 text-[#575757] text-sm font-[400] ">
          {/* image upload */}
          <div className="flex flex-col">
            <h2 className="text-black-main font-[400] ">Document attachment</h2>
            <DropBox value={file} setSelectedFiles={setFile} />
          </div>

          <Input
            name="name"
            label="Claim Name"
            inputClassName="border p-3 bg-[#E4E7E8] rounded-[12px] placeholder:text-left placeholder:align-top"
            labelClassName={labelStyle}
            placeholder="Enter claim name"
            value={claimData.name}
            onChange={handleInputChange}
          />

          <TextArea
            rows={4}
            name="description"
            label="Claim Description"
            labelClassName="pb-[10px]"
            inputClassName="border p-3 bg-[#E4E7E8] resize-none h-[100px] rounded-[12px] placeholder:text-left placeholder:align-top"
            placeholder="Write a brief Description of the Package"
            onChange={handleInputChange}
            value={claimData.description}
          />

          <SelectInput
            options={inputCategories}
            className="border border-none"
            label="Category"
            // value={packageState.category}
            onChange={(val) =>
              setClaimData((prev) => ({
                ...prev,
                category: val ? val : { label: "", value: "" },
              }))
            }
            placeholder="Select Category"
          />

          <Input
            name="amount"
            type="number"
            placeholder="Amount"
            value={claimData.amount}
            onChange={handleInputChange}
            label="Amount"
            inputClassName="border p-3 bg-[#E4E7E8] rounded-[12px] placeholder:text-left placeholder:align-top"
          />

          <Button
            disabled={CreateClaim.isPending}
            onClick={() => handleSubmit()}
          >
            {CreateClaim.isPending ? (
              <Oval
                visible={true}
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
      </div>
    </div>
  );
};

export default NewClaim;
