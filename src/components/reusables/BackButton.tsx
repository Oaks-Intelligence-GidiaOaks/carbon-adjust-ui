import { useNavigate } from "react-router-dom";
import { Button } from "../ui";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

const BackButton: React.FC<Props> = ({ className }) => {
  const navigate = useNavigate();

  return (
    <div className="my-4">
      <Button
        onClick={() => navigate(-1)}
        variant={"ghost"}
        className={cn(
          "flex items-center gap-x-2 h-5 p-0 hover:bg-transparent",
          className
        )}
      >
        <ChevronLeftIcon className="size-4" />
        <p>Back</p>
      </Button>
    </div>
  );
};

export default BackButton;
