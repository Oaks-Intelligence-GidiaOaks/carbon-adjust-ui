import { ClaimGrad } from "@/assets/images";
import { Button } from "../ui";

const NoClaims = () => {
  return (
    <div className="px-6 py-4">
      <h2 className="font-[600] text-2xl">Claims</h2>

      <div className="grid place-items-center">
        <div className="flex flex-col items-center gap-4 w-fit md:w-2/3  mt-10 text-center">
          <ClaimGrad />

          <h4 className="text-[#575757] font-[600] text-xl">
            No Claims created yet
          </h4>

          <p className="">
            You have not created a claim yet. Your claims will appear here when
            you start creating claims.
          </p>

          <Button className="w-fit">
            <span className="text-white text-center">Create Claim</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NoClaims;
