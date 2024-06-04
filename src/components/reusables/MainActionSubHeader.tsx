import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { Button } from "../ui";
import { Link } from "react-router-dom";

type Props = {
  title: string;
  buttonText: string;
  subTitle: string;
  actionUrl: string;
};

const MainActionSubHeader = ({
  title,
  subTitle,
  actionUrl,
  buttonText,
}: Props) => {
  return (
    <div className="bg-gr font-poppins rounded-lg my-6 text-primary-foreground bg-gradient-to-br from-[#0B8DFF] to-[#2E599A] to-90% transition-all p-4 flex gap-4">
      <img src="/assets/icons/org-dashboard/box.svg" />

      <div className="flex flex-1 flex-wrap gap-4 justify-between items-center">
        <div>
          <p className="font-semibold text-base">{title}</p>
          <p className="text-sm">{subTitle}</p>
        </div>
        <Link to={actionUrl}>
          <Button
            variant={"outline"}
            className="bg-gradient-to-r h-[45px] gap-x-2 from-[#139EEC] to-[#3465AF] border-0 rounded-xl"
          >
            <span className="text-white">{buttonText}</span>
            <div className="bg-[#17A5E6] size-8 rounded-full flex justify-center items-center">
              <PlusCircleIcon className="text-white size-[19px]" />
            </div>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default MainActionSubHeader;
// "/assets/icons/org-dashboard/project.svg"
