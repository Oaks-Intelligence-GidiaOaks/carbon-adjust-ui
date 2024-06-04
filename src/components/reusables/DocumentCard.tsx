import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
// import { GoKebabHorizontal } from "react-icons/go";
// import folderBg from "../../assets/folder-bg.svg";
// import { timeAgo } from "../../lib/helpers";
// import { AiFillFilePdf } from "react-icons/ai";
// import { BsImage } from "react-icons/bs";
// import { TbFileUpload } from "react-icons/tb";

const DocumentCard = ({ data }: any) => {
  const isImage = data?.mimetype.includes("image");
  const isWord = data?.mimetype.includes("docx");
  const isPdf = data?.mimetype.includes("pdf");
  const isExcel = data?.mimetype.includes("xlxs");

  const handleClick = () => {
    window.open(data.downloadUrl, "_blank");
  };

  const DocIcon = ({ type }: { type: string }) => (
    <div
      className={`w-9 h-9 rounded-full grid place-items-center text-white text-base font-bold border border-white  ${
        type === "W" ? "bg-dark-blue" : "bg-icon-green"
      }`}
    >
      <p>{type}</p>
    </div>
  );

  return (
    <div
      onClick={handleClick}
      className="h-[222px] w-[253px] cursor-pointer shrink-0 relative pt-14 pb-3 px-4 flex flex-col"
    >
      {/* action button */}
      <div className="absolute top-6 right-4 bg-gray-300 p-1 rounded-full flex justify-center items-center">
        <EllipsisVerticalIcon width={15} color="#000000" />
      </div>
      <img
        src={"/assets/graphics/folder-bg.svg"}
        alt="folder"
        className="w-full h-full absolute top-0 left-0"
      />
      <p className="poppins-5 text-xs mb-2 line-clamp-1 text-ellipsis">
        {data.name}
      </p>
      <p className="text-gray-400 poppins-4 text-xs">
        {/* Uploaded {timeAgo(data?.createdAt)} */}
      </p>
      <div className="flex-1 rounded mt-2">
        {/* {isPdf && <AiFillFilePdf size={30} color="red" />} */}
        {isPdf && <DocIcon type="P" />}

        {/* {isImage && <BsImage color="#2196F3" size={30} />} */}
        {isImage && <DocIcon type="I" />}

        {isWord && <DocIcon type="W" />}

        {isExcel && <DocIcon type="X" />}

        {!isPdf && !isImage && !isWord && !isExcel && (
          //   <TbFileUpload size={32} color="#1b4e9b" />
          <DocIcon type="F" />
        )}

        <div className="p-2 rounded bg-light-gray my-2 " />
        <div className="p-2 rounded bg-light-gray my-2 " />
      </div>
    </div>
  );
};

export default DocumentCard;
