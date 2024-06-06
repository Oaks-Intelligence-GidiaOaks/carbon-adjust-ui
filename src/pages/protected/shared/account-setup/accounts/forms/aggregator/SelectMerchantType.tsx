import MerchantTypeCard from "@/components/reusables/MerchantTypeCard";
import { OrgAccountSetupForm } from "@/types/general";
import { useState } from "react";

type Props = {
  formState: OrgAccountSetupForm;
  setFormState: React.Dispatch<React.SetStateAction<OrgAccountSetupForm>>;
};

const SelectMerchantType = ({ setFormState }: Props) => {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  return (
    <div className="mb-20">
      <div className="my-10 text-center font-poppins text-medium">
        Choose account type
      </div>
      <div className="flex flex-wrap gap-6">
        <MerchantTypeCard
          setFormState={setFormState}
          index={1}
          value="SELF_EMPLOYED"
          setCurrentIndex={setCurrentIndex}
          isSelected={currentIndex === 1}
          title="Self Employed"
          subTitle="Are you self employed with
your own business?"
          imagePath="/assets/graphics/self-employed.svg"
        />
        <MerchantTypeCard
          value="SELF_EMPLOYED_LICENSE"
          setFormState={setFormState}
          index={2}
          setCurrentIndex={setCurrentIndex}
          isSelected={currentIndex === 2}
          title="Self Employed with Licence"
          subTitle="Are you self employed with
          your own business and have a licence?"
          imagePath="/assets/graphics/self-employed-with-license.svg"
        />
        <MerchantTypeCard
          value="LIMITED_LIABILITY"
          setFormState={setFormState}
          index={3}
          setCurrentIndex={setCurrentIndex}
          isSelected={currentIndex === 3}
          title="Limited Liability"
          subTitle="Are you a limited liability company?"
          imagePath="/assets/graphics/limited-liability.svg"
        />
        <MerchantTypeCard
          value="LIMITED_LIABILITY_LICENSE"
          setFormState={setFormState}
          index={4}
          setCurrentIndex={setCurrentIndex}
          isSelected={currentIndex === 4}
          title="Limited Liability with licence"
          subTitle="Are you a limited liability company and you have a licence?"
          imagePath="/assets/graphics/limited-liability-with-license.svg"
        />
      </div>
    </div>
  );
};

export default SelectMerchantType;
