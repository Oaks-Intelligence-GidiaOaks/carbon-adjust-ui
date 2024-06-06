import { OrgAccountSetupForm } from "@/types/general";
import { cn } from "@/utils";

type Props = {
  imagePath: string;
  title: string;
  subTitle: string;
  value: string;
  isSelected?: boolean;
  index: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number | null>>;
  setFormState: React.Dispatch<React.SetStateAction<OrgAccountSetupForm>>;
};

const MerchantTypeCard = ({
  index,
  setCurrentIndex,
  imagePath,
  title,
  subTitle,
  isSelected,
  value,
  setFormState,
}: Props) => {
  return (
    <div
      onClick={() => {
        setFormState((prev) => ({ ...prev, accountType: value }));
        setCurrentIndex(index);
      }}
      className={cn(
        "min-w-[250px] max-w-[250px] h-[290px] cursor-pointer bg-white shadow-lg hover:shadow-2xl transition-all flex flex-col gap-y-2",
        isSelected &&
          "outline-offset-4 outline-ca-blue outline-2 border-2 border-ca-blue"
      )}
    >
      <div className="flex flex-[0.5] justify-center items-end">
        <img src={imagePath} />
      </div>
      <div className="flex flex-[0.5] flex-col justify-start items-center px-4">
        <p className="text-center font-poppins font-semibold text-grey-swatch-110">
          {title}
        </p>
        <p className="text-center font-poppins text-grey-swatch-700 mt-2 text-sm">
          {subTitle}
        </p>
      </div>
    </div>
  );
};

export default MerchantTypeCard;
