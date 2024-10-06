const ClaimCard = (props: { title: string; Icon: any; amount: string }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-5 shrink-0 flex-grow-0">
      <div className="flex-center justify-between">
        <h4 className="">Total Claims</h4>

        <div className="w-fit grid place-items-center">
          <props.Icon />
        </div>
      </div>

      <h2 className="text-center font-[600] text-xl text-[#575757]">$1500</h2>
    </div>
  );
};

export default ClaimCard;
