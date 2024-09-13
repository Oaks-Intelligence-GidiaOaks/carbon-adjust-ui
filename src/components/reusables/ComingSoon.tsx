type Props = {
  height?: string;
};

const ComingSoon = (props: Props) => {
  return (
    <div
      className={`grid place-items-center ${
        props.height ?? "h-[200px]"
      }  gap-3 my-10`}
    >
      <img
        src="/assets/banners/comingSoon.svg"
        alt=""
        className={`${props.height ?? "h-full"}`}
      />
    </div>
  );
};

export default ComingSoon;
