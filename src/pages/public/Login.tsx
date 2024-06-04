import { LogoAndBrandVertical, RegisterGraphic } from "@/assets/icons";
import { Input } from "../../components/ui";
import { Button } from "@/components/ui/Button";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginFormContext } from "@/types/form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormSchemas } from "@/schemas/forms";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useNavigate, useSearchParams } from "react-router-dom";
import AccountActionHeader from "@/components/reusables/account-setup/AccountActionHeader";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import toast from "react-hot-toast";
import { Oval } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "@/features/userSlice";
import { RootState } from "@/app/store";
import { uniqueObjectsByIdType } from "@/utils";

const Login = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const tab = searchParams.get("ie");
  const [inactivityState] = useState(tab);

  const togglePasswordVisibility = () =>
    setShowPassword((prevState) => !prevState);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormContext>({
    resolver: yupResolver(FormSchemas().LoginSchema),
  });

  const loginUser = useMutation({
    mutationFn: (loginCredentials: { email: string; password: string }) =>
      axiosInstance.post(`/auth/login`, loginCredentials),
    mutationKey: ["login-account"],
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ?? "Error encountered trying to login."
      );
    },
    onSuccess: (data) => {
      dispatch(setToken(data.data.data.access_token));
      toast.success(`${"Login successful"}`, { duration: 10000 });

      handleRedirect(data.data.data.user.roles[0]);
    },
  });

  const userData = useSelector((state: RootState) => state.user.user);

  const handleRedirect = (role: string) => {
    if (role === "HOME_OCCUPANT") return navigate("/dashboard");
    if (role === "AGGREGATOR") return navigate("/aggregator");
    if (role === "HIA") return navigate("/hia");
    if (role === "FINANCIAL_INSTITUTION") return navigate("/finance");
    if (role === "INSURANCE") return navigate("/insurance");
    if (role === "SUBCONTRACTOR") return navigate("/subcontractor");
    if (role === "ADMIN") return navigate("/admin");
  };

  const onSubmit: SubmitHandler<LoginFormContext> = async (data) => {
    console.log(data);
    await loginUser.mutateAsync({
      email: data.email,
      password: data.password,
    });
  };

  const goToRegistration = () => {
    navigate("/register");
  };

  useEffect(() => {
    console.log(tab);
    if (inactivityState === "unauthorized") {
      setTimeout(() => {
        toast.error(
          "You were logged out because you are unauthorized. Please logging to continue",
          { id: "unauthorized" }
        );
        navigate("/login");
      }, 0);
      // navigate("/login");
    }
    if (inactivityState === "true") {
      setTimeout(() => {
        toast.error(
          "You were logged out because you were inactive for too long.",
          { id: "inactivity" }
        );
        navigate("/login");
      }, 0);
      // navigate("/login");
    }
  }, [tab]);

  // Redirect user when they visit the login page if user is still logged in

  useEffect(() => {
    const userRole = userData?.roles[0];
    const userStatus = userData?.status;
    const userStep = userData?.step;
    const userDocs = userData?.doc;

    if (userRole) {
      console.log(userRole);

      if (userRole === "ADMIN") {
        return navigate("/admin");
      }
      if (
        userRole !== "HOME_OCCUPANT" &&
        uniqueObjectsByIdType(userDocs).length < 3
      ) {
        return navigate("/account-setup");
      }
      if (userStatus === "pending" && ((userStep || 0) < 4 || !userStep)) {
        return navigate("/account-setup");
      }
      if (userStatus === "pending") {
        return navigate("/pending-verification");
      }
      if (userRole === "AGGREGATOR") {
        return navigate("/aggregator");
      }
      if (userRole === "HIA") {
        return navigate("/hia");
      }
      if (userRole === "FINANCIAL_INSTITUTION") {
        return navigate("/finance");
      }
      if (userRole === "INSURANCE") {
        return navigate("/insurance");
      }
      if (userRole === "SUBCONTRACTOR") {
        return navigate("/subcontractor");
      }
      return navigate("/dashboard");
    }
  }, [userData?.roles[0]]);

  return (
    <div>
      <div className="h-[calc(100vh-60px)]">
        <div className="bg-grey-swatch-100 flex justify-center mx-auto">
          <AccountActionHeader
            action={goToRegistration}
            actionTitle="Register"
          />
        </div>
        <div className="mt-8 flex justify-center mx-auto">
          <div className="flex justify-between px-4 md:px-14 py-3 w-full max-w-[1440px]">
            <div className="hidden md:flex justify-start min-h-screen flex-[0.55] flex-col relative">
              <div className="flex flex-col items-center gap-y-7 pt-10">
                <p className="max-w-[342px] text-center">
                  In need of Carbon Credit?
                  <br /> Get it with
                </p>
                <LogoAndBrandVertical className="max-h-[100px]" />
              </div>
              <RegisterGraphic className="absolute bottom-0 right-0 w-[120%] flex justify-center -z-10 min-h-[720px]" />
            </div>
            <div className="bg-glass h-fit flex-1 md:flex-[0.45] py-9 px-4 md:px-12 rounded-xl max-w-[600px]">
              <p className="text-3xl font-bold">Login</p>
              <p className="pt-2">Welcome back, please enter your details.</p>
              <form className="mt-7" onSubmit={handleSubmit(onSubmit)}>
                <Input
                  type={"text"}
                  labelClassName="text-sm 2xl:text-base font-normal"
                  name="email"
                  register={register}
                  wrapperClassName="mt-4"
                  error={errors.email?.message}
                  placeholder="Email"
                />
                <Input
                  type={showPassword ? "text" : "password"}
                  labelClassName="text-sm 2xl:text-base font-normal"
                  name="password"
                  register={register}
                  wrapperClassName="mt-4"
                  appendIcon={
                    !showPassword ? (
                      <EyeIcon
                        width={18}
                        className="cursor-pointer select-none"
                        onClick={togglePasswordVisibility}
                      />
                    ) : (
                      <EyeSlashIcon
                        width={18}
                        className="cursor-pointer select-none"
                        onClick={togglePasswordVisibility}
                      />
                    )
                  }
                  error={errors.password?.message}
                  placeholder="Password"
                />
                <Button
                  disabled={loginUser.isPending}
                  className="rounded-lg text-white mt-4 w-full h-11 flex justify-center items-center"
                >
                  {loginUser.isPending ? (
                    <Oval
                      visible={loginUser.isPending}
                      height="20"
                      width="20"
                      color="#ffffff"
                      ariaLabel="oval-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  ) : (
                    <span>Login</span>
                  )}
                </Button>
                <p className="mt-6 text-sm">
                  Don't have an account?{" "}
                  <Button
                    variant={"link"}
                    onClick={goToRegistration}
                    className="inline-flex text-sm font-bold py-0 h-fit px-0 bg-transparent text-blue-main hover:underline underline-offset-1"
                  >
                    Register
                  </Button>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="max-w-[1440px] text-center mt-10 text-sm pb-4">
          Copyright Escrow-Tech Limited {new Date().getFullYear()}. All Rights
          Reserved.
        </div>
      </div>
    </div>
  );
};

export default Login;
