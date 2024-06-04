import { LogoAndBrandVertical, RegisterGraphic } from "@/assets/icons";
import { Dropdown, Input } from "../../components/ui";
import { Button } from "@/components/ui/Button";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { RegisterFormContext } from "@/types/form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormSchemas } from "@/schemas/forms";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import CheckBox from "@/components/ui/CheckBox";
import { useNavigate } from "react-router-dom";
import AccountActionHeader from "@/components/reusables/account-setup/AccountActionHeader";
import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import toast from "react-hot-toast";
import { Oval } from "react-loader-spinner";
import { VerifyEmail } from "@/components/dialogs";
import { getAccountTypes } from "@/services/homeOccupant";

type RegisterObject = {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
  accountType: string;
  acceptTerms: boolean;
  aggregatorType?: string;
};

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [verifyEmail, setVerifyEmail] = useState(false);

  const togglePasswordVisibility = () =>
    setShowPassword((prevState) => !prevState);

  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword((prevState) => !prevState);

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormContext>({
    resolver: yupResolver<any>(FormSchemas().RegisterSchema),
  });

  // Watch a specific field
  const accountTypeValue = watch("accountType");

  const registerUser = useMutation({
    mutationFn: (userData: RegisterObject) =>
      axiosInstance.post(`/auth/register`, userData),
    mutationKey: ["register_account"],
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
    onSuccess: (data) => {
      toast.success(`${data.data.message}. Please verify your email`, {
        duration: 10000,
      });
      setVerifyEmail(true);
    },
  });

  const accountTypes = useQuery({
    queryKey: ["account-types"],
    queryFn: () => getAccountTypes(),
  });

  const onSubmit: SubmitHandler<RegisterFormContext> = async (value) => {
    try {
      const response = await registerUser.mutateAsync({
        email: value.email,
        name: value.name,
        password: value.password,
        confirmPassword: value.confirmPassword,
        accountType: value.accountType.value,
        acceptTerms: true,
        ...(value.accountType.value === "AGGREGATOR" &&
        value?.aggregatorType?.value !== undefined
          ? { aggregatorType: value?.aggregatorType.value }
          : {}),
        // aggregatorType: "",
      });
      // Handle successful registration
      console.log(response.data);
    } catch (error: any) {
      // Handle registration error
      console.log(error);
      throw error.response.data;
    }
  };

  const goToLogin = () => {
    navigate("/login");
  };

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return (
    <>
      {verifyEmail && (
        <VerifyEmail email={registerUser.data?.data.data.email} />
      )}
      <div>
        <div className="bg-grey-swatch-100 flex justify-center mx-auto">
          <AccountActionHeader action={goToLogin} actionTitle="Login" />
        </div>
        <div className="mt-8 flex justify-center mx-auto">
          <div className="flex justify-between px-4 md:px-14 py-3 w-full max-w-[1440px]">
            <div className="hidden md:flex justify-start flex-[0.55] flex-col relative">
              <div className="flex flex-col items-center gap-y-7">
                <p className="max-w-[342px] text-center">
                  Get compensated for Carbon Credits you generate from Home
                  Energy efficiency investments
                </p>
                <LogoAndBrandVertical className="max-h-[100px]" />
              </div>
              <div className="absolute bottom-0 right-0 w-[120%] flex justify-center -z-10 h-full">
                <RegisterGraphic />
              </div>
            </div>
            <div className="bg-glass flex-1 md:flex-[0.45] py-9 px-4 md:px-12 rounded-xl max-w-[600px]">
              <p className="text-3xl font-bold">Create an account</p>
              <p className="pt-2">
                Let’s get started with your 30 days free trial
              </p>
              <form className="mt-7" onSubmit={handleSubmit(onSubmit)}>
                <Input
                  // label="Password"
                  type={"text"}
                  labelClassName="text-sm 2xl:text-base font-normal"
                  name="name"
                  register={register}
                  wrapperClassName="mt-4"
                  error={errors.name?.message}
                  placeholder="Name"
                />
                <Input
                  // label="Password"
                  type={"text"}
                  labelClassName="text-sm 2xl:text-base font-normal"
                  name="email"
                  register={register}
                  wrapperClassName="mt-4"
                  error={errors.email?.message}
                  placeholder="Email"
                />
                <Input
                  // label="Password"
                  type={showPassword ? "text" : "password"}
                  labelClassName="text-sm 2xl:text-base font-normal"
                  name="password"
                  register={register}
                  wrapperClassName="mt-4"
                  appendIcon={
                    showPassword ? (
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
                <Input
                  // label="Password"
                  type={showConfirmPassword ? "text" : "password"}
                  labelClassName="text-sm 2xl:text-base font-normal"
                  name="confirmPassword"
                  register={register}
                  wrapperClassName="mt-4"
                  appendIcon={
                    showConfirmPassword ? (
                      <EyeIcon
                        width={18}
                        className="cursor-pointer select-none"
                        onClick={toggleConfirmPasswordVisibility}
                      />
                    ) : (
                      <EyeSlashIcon
                        width={18}
                        className="cursor-pointer select-none"
                        onClick={toggleConfirmPasswordVisibility}
                      />
                    )
                  }
                  error={errors.confirmPassword?.message}
                  placeholder="Confirm password"
                />
                <div>
                  <Dropdown
                    placeholder="Account type"
                    wrapperClassName="w-full mt-4"
                    name="accountType"
                    register={register}
                    isLoading={accountTypes.isLoading}
                    loadingText="Fetching account types"
                    options={
                      accountTypes.isSuccess && accountTypes.data
                        ? Object.entries(
                            accountTypes.data?.data.data.accountTypes
                          ).map((accType) => ({
                            label: accType[0],
                            value: String(accType[1]),
                          }))
                        : []
                    }
                    control={control}
                  />
                  {errors.accountType && (
                    <p className="mt-[2px] text-[10px] text-[#E31B23]">
                      {errors?.accountType?.message}
                    </p>
                  )}
                </div>
                {accountTypeValue?.value == "AGGREGATOR" && (
                  <div>
                    <Dropdown
                      placeholder="Aggregator type"
                      wrapperClassName="w-full mt-4"
                      name="aggregatorType"
                      register={register}
                      isLoading={accountTypes.isLoading}
                      loadingText="Fetching Aggregator types"
                      options={
                        accountTypes.isSuccess && accountTypes.data
                          ? Object.entries(
                              accountTypes.data?.data.data.aggregatorTypes
                            ).map((accType) => ({
                              label: accType[0],
                              value: String(accType[1]),
                            }))
                          : []
                      }
                      control={control}
                    />
                    {errors.accountType && (
                      <p className="mt-[2px] text-[10px] text-[#E31B23]">
                        {errors?.accountType?.message}
                      </p>
                    )}
                  </div>
                )}
                <div className="flex gap-x-2 items-start mt-4">
                  <CheckBox
                    className="border-2 border-grey-swatch-700"
                    id="t&c"
                    checked={acceptTerms}
                    setIsChecked={(value) => setAcceptTerms(value)}
                  />
                  <p className="font-poppins text-xs text-grey-swatch-800">
                    By clicking create account, you agree to the{" "}
                    <Button
                      variant={"link"}
                      className="inline-flex text-xs py-0 h-fit px-0 bg-transparent text-blue-main hover:underline underline-offset-1 font-normal"
                    >
                      terms and conditions
                    </Button>
                  </p>
                </div>

                <Button
                  disabled={!acceptTerms || registerUser.isPending}
                  className="rounded-lg text-white mt-4 w-full h-11 flex items-center justify-center"
                >
                  {registerUser.isPending ? (
                    <Oval
                      visible={registerUser.isPending}
                      height="20"
                      width="20"
                      color="#ffffff"
                      ariaLabel="oval-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  ) : (
                    <span>Create account</span>
                  )}
                </Button>
                <p className="mt-6 text-sm">
                  Already have an account?{" "}
                  <Button
                    variant={"link"}
                    onClick={goToLogin}
                    className="inline-flex text-sm font-bold py-0 h-fit px-0 bg-transparent text-blue-main hover:underline underline-offset-1"
                  >
                    Log In
                  </Button>
                </p>
              </form>
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
    </>
  );
};

export default Register;
