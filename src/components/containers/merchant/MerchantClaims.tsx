import ClaimsGrid from "@/components/grid/merchant/ClaimsGrid";
import { Button } from "@/components/ui";
import Search from "@/components/ui/Search";
import { grantMerchantClaims } from "@/services/merchantService";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const MerchantClaims = () => {
  const { data, isSuccess } = useQuery({
    queryKey: ["get-grant-merchant-claims"],
    queryFn: () => grantMerchantClaims(),
  });

  console.log(data, "data");

  const claimTable = isSuccess ? data.data : [];

  return (
    <div className="space-y-4 px-6 py-4">
      {/*  */}
      <div className="">
        <h2 className="font-[600] text-2xl">Claims</h2>
      </div>

      <div className="flex justify-between ">
        <Search className="" />

        <Link to="/merchant/claims/new">
          <Button>
            <span className="text-white ">Apply for claims</span>
          </Button>
        </Link>
      </div>

      {/* Table  */}
      <div className="">
        <ClaimsGrid data={claimTable} hideAction />
      </div>
    </div>
  );
};

export default MerchantClaims;
