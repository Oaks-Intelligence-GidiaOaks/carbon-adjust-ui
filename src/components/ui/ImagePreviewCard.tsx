const ImagePreviewCard = (props: { image: string }) => (
  <div className="w-full h-full">
    <img
      src={props.image}
      alt="Image Preview"
      className=" max-h-[180px] rounded mx-auto pb-[1px] object-cover"
      width={400}
      height={180}
    />
  </div>
);

export default ImagePreviewCard;
