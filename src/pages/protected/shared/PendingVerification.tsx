import userService from "@/api/services/user";
import { persistor, RootState } from "@/app/store";
// import {
//   AccountSetupScribbleLeft,
//   AccountSetupScribbleRight,
//   JottingHand,
// } from "@/assets/icons";
import AccountActionHeader from "@/components/reusables/account-setup/AccountActionHeader";
import { Button } from "@/components/ui";
import { setUser } from "@/features/userSlice";
import { cn, uniqueObjectsByIdType } from "@/utils";
import { UserCircleIcon } from "@heroicons/react/20/solid";
import { useIsFetching, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { LuRefreshCcw } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

type Props = {};

const PendingVerification = (_: Props) => {
  // const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state: RootState) => state.user.user);
  const logOut = async () => {
    persistor.pause();
    persistor.flush().then(() => {
      return persistor.purge();
    });
    window.location.assign("/");
  };

  // const [verify, setVerify] = useState<boolean>(false);

  const verifyApp = useQuery({
    queryKey: ["fetch-user-info-2"],
    queryFn: userService().fetchUserInfo,
    // enabled: verify,
  });

  const isFetching = useIsFetching({
    queryKey: ["fetch-user-info-2"],
  });

  // ---------------------UNCOMMENT THIS CODE WHEN ADMIN STARTS VERIFYING USERS
  useEffect(() => {
    if (verifyApp.isSuccess) {
      dispatch(setUser(verifyApp.data.data.data));

      console.log(verifyApp.data.data.data);

      if (verifyApp.data.data.data.roles[0] === "ADMIN") {
        return navigate("/admin");
      }
      if (
        verifyApp.data.data.data.roles[0] !== "HOME_OCCUPANT" &&
        uniqueObjectsByIdType(verifyApp.data.data.data?.doc).length < 3
      ) {
        return navigate("/account-setup");
      }
      if (
        verifyApp.data.data.data.status === "pending" &&
        (verifyApp.data.data.data?.step < 4 || !verifyApp.data.data.data?.step)
      ) {
        return navigate("/account-setup");
      }
      if (verifyApp.data.data.data.status === "pending") {
        return navigate("/pending-verification");
      }
      if (verifyApp.data.data.data.roles[0] === "AGGREGATOR") {
        return navigate("/aggregator");
      }
      if (verifyApp.data.data.data.roles[0] === "HIA") {
        return navigate("/hia");
      }
      if (verifyApp.data.data.data.roles[0] === "FINANCE") {
        return navigate("/finance");
      }
      if (verifyApp.data.data.data.roles[0] === "INSURANCE") {
        return navigate("/insurance");
      }
      return navigate("/dashboard");
    }
  }, [verifyApp.isSuccess]);

  return (
    <div className="min-h-screen relative">
      <AccountActionHeader
        actionTitle="Log out"
        action={logOut}
        className={"bg-white mx-auto px-4 sm:px-14"}
      />
      <div className="p-6 flex justify-center bg-gradient-to-r z-50 sticky top-[64px] overflow-hidden bg-white">
        <div className="max-w-[820px] w-full mx-auto">
          <div className="flex justify-between w-full gap-x-6 flex-wrap gap-y-6 items-center">
            <div className="flex justify-between gap-x-3 items-center">
              <div className="w-fit h-fit rounded-full flex justify-center items-center">
                <UserCircleIcon className="h-10 w-10 sm:h-14 sm:w-14" />
              </div>
              <div className="text-black-main">
                <p className="font-medium font-poppins">{userData?.name}</p>
                <p className="text-sm font-poppins">{userData?.email}</p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <p className="text-[#FCA311] font-poppins font-medium text-center">
                Account under Review
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-10 min-h-screen">
        <div className="max-w-[716px] mx-auto text-center text-black-main text-2xl sm:text-3xl md:text-4xl md:leading-[3.5rem] font-semibold font-poppins">
          Your account is undergoing verification
        </div>
        <div className="mt-0 flex justify-center items-center">
          <Button
            variant="default"
            // disabled
            className="bg-white h-10 shadow px-8 flex gap-2 justify-center items-center font-poppins mt-6"
            // onClick={() => navigate("/dashboard")}
            onClick={() =>
              // navigate({
              //   pathname: "",
              //   search: createSearchParams({
              //     state: "application-approved",
              //   }).toString(),
              // })
              // setVerify(true)
              // queryClient.invalidateQueries({ queryKey: ["fetch-user-info-2"] })
              window.location.reload()
            }
          >
            <span className="text-white">Refresh</span>
            <LuRefreshCcw
              width={24}
              className={cn("text-white", isFetching && "anim animate-spin")}
              color="#FFFFFF"
            />
          </Button>
        </div>
      </div>
      <img
        src="/assets/graphics/pending-verification.svg"
        className="fixed -bottom-[15%] left-0 w-full h-full pointer-events-none"
      />
    </div>
  );
};

export default PendingVerification;
