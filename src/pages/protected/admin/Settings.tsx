import { Button, Input } from "@/components/ui";
import useMutations from "@/hooks/useMutations";
import { WalletCoinSettingsInput } from "@/interfaces/wallet.interface";
import { getCoinSettings } from "@/services/adminService";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Oval } from "react-loader-spinner";

const FormSkeleton = () => {
  return (
    <div className="container mx-auto my-8">
      <div className="py-3">
        <h2 className="font-[500] text-2xl text-center blue-gradient text-transparent bg-clip-text">
          Admin Settings
        </h2>
      </div>

      <div className="md:w-[600px] gap-6 grid grid-cols-2 place-items-center mx-auto">
        <div className="w-full">
          <label className="block font-medium text-gray-700">
            Conversion Rate
          </label>

          <div className="animate-pulse">
            <div className="bg-gray-200 rounded-md h-8 w-full"></div>
          </div>
        </div>

        <div className="w-full">
          <label className="block font-medium text-gray-700">
            Default login coin reward
          </label>
          <div className="animate-pulse">
            <div className="bg-gray-200 rounded-md h-8 w-full"></div>
          </div>
        </div>

        <div className="w-full">
          <label className="block font-medium text-gray-700">
            Minimum amount of coin
          </label>
          <div className="animate-pulse">
            <div className="bg-gray-200 rounded-md h-8 w-full"></div>
          </div>
        </div>

        <div className="w-full">
          <label className="block font-medium text-gray-700">
            Yearly carbon offset
          </label>
          <div className="animate-pulse">
            <div className="bg-gray-200 rounded-md h-8 w-full"></div>
          </div>
        </div>

        <div className="w-full">
          <label className="block font-medium text-gray-700">
            First purchase for marketplace reward
          </label>
          <div className="animate-pulse">
            <div className="bg-gray-200 rounded-md h-8 w-full"></div>
          </div>
        </div>
      </div>

      <div className="w-fit mx-auto mt-5">
        <div className="animate-pulse">
          <div className="bg-gray-200 rounded-md h-10 w-32"></div>
        </div>
      </div>
    </div>
  );
};

interface GetCoinSetting {
  coinConversionRate: number;
  createdAt: string;
  defaultLoginCoinReward: number;
  firstPurchaseForMarketPlaceReward: number;
  minimumAmountOfCoin: number;
  updatedAt: string;
  yearlyCarbonOffset: number;
}

const Settings = () => {
  const queryClient = useQueryClient();

  const [settings, setSettings] = useState<WalletCoinSettingsInput>({
    coinConversionRate: 0,
    defaultLoginCoinReward: 0,
    minimumAmountOfCoin: 0,
    yearlyCarbonOffset: 0,
    firstPurchaseForMarketPlaceReward: 0,
  });

  const { UpdateCoinSettings } = useMutations();

  const { data, isLoading } = useQuery({
    queryKey: ["get-coin-settings"],
    queryFn: () => getCoinSettings(),
  });

  let settingsData: GetCoinSetting | null = data?.data;

  if (isLoading || !settingsData) {
    return <FormSkeleton />;
  }

  useEffect(() => {
    if (!settingsData) null;

    setSettings((prev) => ({
      ...prev,
      ...settingsData,
    }));
  }, [settingsData]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setSettings((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handleUpdateSettings = () => {
    UpdateCoinSettings.mutate(settings, {
      onError: (ex: any) => {
        toast.error(
          ex.response.data.message || "error occured.. please try gaain.."
        );
      },
      onSuccess: (sx: any) => {
        queryClient.invalidateQueries({
          queryKey: ["get-coin-settings"],
        });

        toast.success(sx.message || "updated settings successfully");
      },
    });
  };

  return (
    <div className="h-screen">
      <div className="py-3">
        <h2 className="font-[500] text-2xl text-center blue-gradient text-transparent bg-clip-text">
          Admin Settings
        </h2>
      </div>

      <div className="mt-6">
        <div className="md:w-[600px] gap-6 grid grid-cols-2 place-items-center mx-auto">
          <Input
            min={0}
            label="Conversion Rate"
            type="number"
            placeholder="conversion Rate"
            name="coinConversionRate"
            className="border px-3 rounded-xl"
            wrapperClassName="p-0"
            inputClassName="p-0"
            value={settings.coinConversionRate}
            onChange={handleChange}
          />

          <Input
            min={0}
            label="Default login coin reward"
            type="number"
            placeholder="conversion rate"
            name="coinConversionRate"
            className="border px-3 rounded-xl"
            wrapperClassName="p-0"
            value={settings.defaultLoginCoinReward}
            inputClassName="p-0"
            onChange={handleChange}
          />

          <Input
            min={0}
            label="Minimum amount of coin"
            type="number"
            placeholder="Minimum amount of coin"
            name="minimumAmountOfCoin"
            className="border px-3 rounded-xl"
            wrapperClassName="p-0"
            value={settings.minimumAmountOfCoin}
            inputClassName="p-0"
            onChange={handleChange}
          />

          <Input
            min={0}
            label="Yearly carbon offset"
            type="number"
            placeholder="Yearly carbon offset"
            name="yearlyCarbonOffset"
            className="border px-3 rounded-xl"
            wrapperClassName="p-0"
            value={settings.yearlyCarbonOffset}
            inputClassName="p-0"
            onChange={handleChange}
          />

          <Input
            min={0}
            label="First purchase for marketplace reward"
            type="number"
            placeholder="conversion rate"
            name="firstPurchaseForMarketPlaceReward"
            className="border px-3 rounded-xl"
            wrapperClassName="p-0"
            value={settings.firstPurchaseForMarketPlaceReward}
            inputClassName="p-0"
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className="w-full md:w-1/3 mx-auto mt-5">
          <Button
            onClick={handleUpdateSettings}
            className="grid place-items-center text-center w-full"
            disabled={UpdateCoinSettings.isPending}
          >
            {UpdateCoinSettings.isPending ? (
              <Oval
                height="20"
                width="20"
                color="#ffffff"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            ) : (
              <span>Update Settings</span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
