import ClaimsGrid from "@/components/grid/merchant/ClaimsGrid";
// import ClaimCard from "@/components/reusables/ClaimCard";
import { getCustomerClaims } from "@/services/merchantService";
import { useQuery } from "@tanstack/react-query";

const SuperMerchantClaims = () => {
  const { data, isSuccess } = useQuery({
    queryKey: ["get-customer-claims"],
    queryFn: () => getCustomerClaims(),
  });

  const claims = isSuccess ? data?.data?.claimsData : [];

  console.log(claims, "claims");
  return (
    <div className="space-y-4 px-6 py-4">
      <div className="">
        <h2 className="text-2xl font-[600]">Claims</h2>
      </div>

      {/* claim cards */}
      <div className="w-full overflow-x-scroll scrollbar-hide">
        {/* {Array.from(claims, (it: any, i) => (
          <ClaimCard {...it} key={i} />
        ))} */}

        {/* table */}
        <div className="w-">
          <ClaimsGrid data={claims} />
        </div>
      </div>
    </div>
  );
};

export default SuperMerchantClaims;
