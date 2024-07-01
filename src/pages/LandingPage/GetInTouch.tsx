import { Button } from "@/components/ui";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

type Props = {};

const GetInTouch = (_: Props) => {
  return (
    <div className="font-poppins bg-account-setup-image relative z-20">
      <div className="flex justify-between gap-[10%] px-6 lg:w-[70%] max-w-[1440px] mx-auto">
        <div className="h-[30vh] min-h-[420px] w-full flex flex-col justify-center">
          <p className="text-[2.5rem] leading-[2.75rem] font-bold gradient-text">
            Questions?
          </p>
          <p className="text-[2.5rem] leading-[2.75rem] font-bold">
            Get in touch.
          </p>
          <Link to={"mailto:support@carbon-adjust.com"}>
            <Button className="mt-4 w-fit flex items-center justify-center gap-x-2">
              <span>Send an Email</span>
              <ArrowRightIcon className="size-4 w-fit" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GetInTouch;
