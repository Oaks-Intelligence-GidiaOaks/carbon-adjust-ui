import ClaimsGrid from "@/components/grid/merchant/ClaimsGrid";
import ClaimCard from "@/components/reusables/ClaimCard";

const SuperMerchantClaims = () => {
  return (
    <div>
      {/* claim cards */}
      <div className="w-full overflow-x-scroll scrollbar-hide border">
        {Array.from({ length: 4 }, (it, i) => (
          // @ts-ignore
          <ClaimCard key={i} {...it} />
        ))}

        {/* table */}
        <div className="w-full">
          <ClaimsGrid data={[]} />
        </div>
      </div>
    </div>
  );
};

export default SuperMerchantClaims;
