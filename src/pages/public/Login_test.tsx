import { Input } from "../../components/ui";
import { Button } from "@/components/ui/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginTestFormContext } from "@/types/form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import toast from "react-hot-toast";
import { Oval } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { setKommunitaToken, setToken } from "@/features/userSlice";

const LoginTest = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginTestFormContext>();

  const loginUser = useMutation({
    mutationFn: (loginCredentials: { email: string }) =>
      axiosInstance.post(`/auth/login-email`, loginCredentials),
    mutationKey: ["login-test"],
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ?? "Error encountered trying to login."
      );
    },
    onSuccess: (data) => {
      dispatch(setToken(data.data.data.access_token));
      dispatch(setKommunitaToken(data.data.data.kommunita_access_token));

      localStorage.setItem("token", data.data.data.access_token);
      navigate("/dashboard");
    },
  });

  const onSubmit: SubmitHandler<LoginTestFormContext > = async (data) => {
  
    try {
      await loginUser.mutateAsync({
        email: data.email,
      });
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div>
      <div className="h-[calc(100vh-60px)]">
        <div className="flex justify-center items-center h-screen">
          <div className="flex justify-center items-center px-4 md:px-14 py-3 w-full max-w-[1440px]">
            <div className="bg-glass h-fit flex-1 md:flex-[0.45] py-9 px-4 md:px-12 rounded-xl max-w-[600px]">
              <p className="text-3xl font-bold">Login</p>
              <p className="pt-2">Welcome to the metaverse.</p>
              <form className="mt-7" onSubmit={handleSubmit(onSubmit)}>
                <Input
                  type="text"
                  labelClassName="text-sm 2xl:text-base font-normal"
                  name="email"
                  register={register}
                  wrapperClassName="mt-4"
                  placeholder="Email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}

                <Button
                  type="submit"
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

export default LoginTest;
