import { useNavigate } from "react-router-dom";
import { Button } from "../ui";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";

type Props = {};

const BackButton = (_: Props) => {
  const navigate = useNavigate();
  return (
    <div className="my-4">
      <Button
        onClick={() => navigate(-1)}
        variant={"ghost"}
        className="flex items-center gap-x-2 h-5 p-0 hover:bg-transparent"
      >
        <ChevronLeftIcon className="size-4" />
        <p>Back</p>
      </Button>
    </div>
  );
};

export default BackButton;
