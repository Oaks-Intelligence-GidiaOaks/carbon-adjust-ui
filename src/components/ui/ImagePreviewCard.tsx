const ImagePreviewCard = (props: { image: string }) => (
  <div className="w-full h-full">
    <img
      src={props.image}
      alt="Image Preview"
      className="w-full max-h-[180px]"
      width={400}
      height={180}
    />
  </div>
);

export default ImagePreviewCard;
