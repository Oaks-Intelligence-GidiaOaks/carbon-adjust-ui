import { LogoAndBrand } from "@/assets/icons";
import { Button } from "../../ui";
import { AccountActionHeaderProps } from "@/types/general";
import { cn } from "@/utils";
import { useLocation, useNavigate } from "react-router-dom";

const AccountActionHeader = ({
  action,
  actionTitle,
  className,
}: AccountActionHeaderProps) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return (
    <div
      className={cn(
        "flex justify-between px-4 md:px-14 py-3 w-full max-w-[1440px] sticky top-0 z-50",
        className
      )}
    >
      <LogoAndBrand
        className="cursor-pointer"
        onClick={() => {
          if (pathname.includes("login") || pathname.includes("register")) {
            navigate("/");
          }
        }}
      />
      <Button
        onClick={() => {
          action && action();
        }}
        variant="tab"
        className="rounded-none px-8 text-blue-main hover:bg-gray-200"
      >
        {actionTitle}
      </Button>
    </div>
  );
};

export default AccountActionHeader;
