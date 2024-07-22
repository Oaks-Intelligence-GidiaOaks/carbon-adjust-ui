import { Oval } from "react-loader-spinner";

const LoadingState = () => (
  <div className="w-full h-[150px] grid place-items-center">
    <Oval
      visible={true}
      height="20"
      width="20"
      color="#ffffff"
      ariaLabel="oval-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  </div>
);

export default LoadingState;
