interface MediaPreviewCardProps {
    preview: string; 
    fileType: string; 
  }
  
  const MediaPreviewCard = ({ preview, fileType }: MediaPreviewCardProps) => {
    const isVideo = fileType.startsWith("video");
  
    return (
      <div className="w-full h-full">
        {isVideo ? (
          <video
            src={preview}
            controls
            className="max-h-[180px] rounded mx-auto pb-[1px] object-cover"
            width={400}
            height={180}
          >
            Your browser does not support the video tag.
          </video>
        ) : (
          <img
            src={preview}
            alt="Media Preview"
            className="max-h-[180px] rounded mx-auto pb-[1px] object-cover"
            width={400}
            height={180}
          />
        )}
      </div>
    );
  };
  
  export default MediaPreviewCard;