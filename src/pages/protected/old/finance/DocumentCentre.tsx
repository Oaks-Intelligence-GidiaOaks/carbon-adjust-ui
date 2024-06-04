// import folderPurple from "../../assets/folder-purple.svg";
// import folderBlue from "../../assets/folder-blue.svg";
// import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
// import DocumentCard from "./DocumentCard";
// import { slice } from "lodash";
// import DragDropFile from "../primitives/DragDropFile";
// import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";
// import DocumentGrid from "../grid/DocumentGrid";
import { Button, DropBox } from "@/components/ui";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import DocumentCard from "@/components/reusables/DocumentCard";

const DocumentCenter = () => {
  const [isDocumentsInfoPanelOpen, setIsDocumentsInfoPanelOpen] =
    useState(true);
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowSize(window.innerWidth);
    });
    return () => {
      window.removeEventListener("resize", () => {
        setWindowSize(window.innerWidth);
      });
    };
  }, []);

  return (
    <div className="flex relative min-h-screen w-full pr-4">
      {/* blurred bg */}
      {isDocumentsInfoPanelOpen && windowSize < 620 && (
        <div className="absolute top-0 left-0 w-full h-full backdrop-blur z-10" />
      )}
      {/* info button */}
      <div className="w-fit h-fit">
        <InformationCircleIcon
          width={24}
          className={`${isDocumentsInfoPanelOpen ? "right-[240px]" : ""}
          w-fit rounded-full min-[1020px]:hidden fixed z-20 right-4 mr-2 top-[72px] bg-white shadow-md shadow-[rgba(0,0,0,0.3)] cursor-pointer hover:text-ca-blue`}
          onClick={() => {
            setIsDocumentsInfoPanelOpen(!isDocumentsInfoPanelOpen);
          }}
        />
      </div>

      <div className="w-[75%] mt-8">
        <div className="relative">
          {/* Main pane */}
          <div className="min-w-[240px] w-full px-2 sm:px-6">
            <p className="font-poppins text-main text-lg font-semibold">
              Document Centre
            </p>

            {/* recent uploads */}
            <p className="mt-10 text-lg text-[#143B76] poppins-5">
              Recent Uploads
            </p>
            <div className="max-w-full h-fit overflow-x-scroll">
              <div className="flex max-w-[240px] flex-nowrap h-[224px] mt-2 mb-10 scrollbar-horizontal gap-4">
                {
                  [
                    {
                      mimetype: "image",
                      downloadUrl: "https://google.com",
                      name: "Home Architecture",
                    },
                    {
                      mimetype: "image",
                      downloadUrl: "https://google.com",
                      name: "Home Architecture",
                    },
                    {
                      mimetype: "image",
                      downloadUrl: "https://google.com",
                      name: "Home Architecture",
                    },
                    {
                      mimetype: "image",
                      downloadUrl: "https://google.com",
                      name: "Home Architecture",
                    },
                  ].map((item, i) => (
                    <DocumentCard key={i} data={item} />
                  ))
                  // || (
                  // <Skeleton
                  //   containerClassName="flex-1 flex gap-2 flex-row"
                  //   height={180}
                  //   count={4}
                  // />
                  // )
                }
              </div>
            </div>

            {/* upload files */}
            <p className="text-lg text-[#143B76] poppins-5">Upload files</p>

            <DropBox />
          </div>
        </div>

        {/* users files */}
        <p className="flex justify-between items-end mt-10 text-lg text-[#143B76] poppins-5 px-2 sm:px-6">
          <span>Your Files</span>
          <span className="text-sm text-purple-950 underline ">View All</span>
        </p>
        {/* <div className="p-2 sm:px-6 w-full overflow-x-scroll mt-10 scrollbar-horizontal pb-4 mb-10">
        {isSuccess && <DocumentGrid data={tableData} />}
      </div> */}
      </div>
      <div className="w-[25%]">
        <div className="">{/* <SearchBar /> */}</div>
        <div className="mt-10 rounded-2xl border border-solid border-gray-300 py-6 px-2">
          <p className="text-[#143B76] poppins-5 text-sm">Storage</p>
          {/* Progress bar */}
          <div className="w-full h-[8px] rounded-md bg-gray-200 mt-4">
            <div className="w-1/3 h-[8px] rounded-md bg-[#139EEC] mt-4"></div>
          </div>
          <p className="poppins-4 text-main mt-2">
            <span className="text-purple-950">33 MB</span> / 100 GB
          </p>

          {/* File type */}
          <div className="mt-12">
            <p className="poppins-5 pl-2">File Type</p>
            {/* docs */}
            <div className="mt-6 px-3 flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <img alt="icon" src={"/assets/icons/document.svg"} />
                <p className="text-sm poppins-5 text-main">Documents</p>
              </div>
              <p className="text-gray-400 poppins-4 text-sm">2.8 mb</p>
            </div>
            {/* vids */}
            <div className="mt-6 px-3 flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <img alt="icon" src={"/assets/icons/video.svg"} />
                <p className="poppins-5 text-sm text-main">Videos</p>
              </div>
              <p className="text-gray-400 poppins-4 text-sm">16.8 mb</p>
            </div>
            {/* photos */}
            <div className="mt-6 px-3 flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <img alt="icon" src={"/assets/icons/photo.svg"} />
                <p className="poppins-5 text-sm text-main">Photos</p>
              </div>
              <p className="text-gray-400 poppins-4 text-sm">9 mb</p>
            </div>
            {/* more info */}
            <div className="relative mt-20 w-full min-h-[150px] pb-6 bg-slate-600 shadow-[0_10px_0_#ecd5ff,_0_-10px_0_#ecd5ff]">
              <div className="absolute left-1/2 -top-1/2 -translate-x-1/2 translate-y-[15%] rounded-full p-5 bg-white w-fit flex justify-center items-center">
                <img src={"/assets/graphics/folder-graphic.svg"} alt="img" />
              </div>
              <div className="poppins-5 pt-16 flex flex-col gap-3 justify-center">
                <p className="w-[70%] text-white text-xl text-center mx-auto">
                  Get More Space For Files
                </p>
                <div className="flex justify-center">
                  <Button className="w-[90%] py-3 flex justify-center items-center rounded-[40px] bg-[#139EEC] text-white text-sm poppins-4">
                    Upgrade Storage
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentCenter;
