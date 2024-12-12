import { JPGIcon, PDFIcon, PNGIcon, UploadDoc } from "@/assets/icons";
import { DropBoxProps } from "@/types/general";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { MdOutlineDelete } from "react-icons/md";
import { ChangeEvent, useRef, useState } from "react";
import { Button } from "./Button";
import { CameraIcon } from "@heroicons/react/20/solid";
import { formatBytes } from "@/utils";
import toast from "react-hot-toast";

const DropBox = ({
  value,
  setFile: setStateFile,
  setFiles: setStateOrgFiles,
  setSelectedFiles,
  docName,
  disabled,
  isMultiple,
}: DropBoxProps) => {
  // interface HTMLInputEvent extends Event {
  //   target: HTMLInputElement & EventTarget;
  // }

  const wrapperRef = useRef<HTMLElement>();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [fileList, setFileList] = useState<File[]>([]);
  const [, setFile] = useState<null | File>(
    value !== null && value !== undefined ? value[0] : null
  );
  const [fileSizeError, setFileSizeError] = useState(false);

  const generateFileTypeIcon = (mimeType: string) => {
    if (mimeType.toLowerCase() === "png") return <PNGIcon height={40} />;
    if (mimeType.toLowerCase() === "jpg") return <JPGIcon height={40} />;
    if (mimeType.toLowerCase() === "pdf") return <PDFIcon height={40} />;
  };

  const onDragEnter = () => {
    if (wrapperRef.current) {
      wrapperRef.current?.classList.add("dragover");
    }
  };
  const onDragLeave = () => {
    if (wrapperRef.current) {
      wrapperRef.current.classList.remove("dragover");
    }
  };
  const onDrop = () => {
    if (wrapperRef.current) {
      wrapperRef.current.classList.remove("dragover");
    }
  };

  // const onFileChange = () => {};
  const onFileDrop = (e: ChangeEvent<HTMLInputElement>) => {
    const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
    const files = e?.target?.files ? Array.from(e.target.files) : [];

    if (isMultiple && files.length > 5) {
      const toastId = toast.error(`You can only upload Max five files.`);
      setTimeout(() => {
        toast.dismiss(toastId); 
      }, 3000);

      return;
    }

    if (files.length > 0) {
      const validFiles: File[] = [];
      let hasLargeFile = false;

      files.forEach((file) => {
        if (file.size > MAX_FILE_SIZE) {
          hasLargeFile = true;
        } else {
          validFiles.push(file);
        }
      });

      if (!isMultiple) {
       
        const newFile = validFiles[0] || null;

        if (newFile) {
          setFile(newFile);
          setFileSizeError(false);
          localStorage.setItem("file", JSON.stringify(newFile));
          const updatedList = [newFile];
          setFileList(updatedList);

          if (setStateFile) {
            setStateFile((prev) => ({ ...prev, doc: updatedList }));
          }
          if (setSelectedFiles) {
            setSelectedFiles(updatedList);
          }
          if (setStateOrgFiles) {
            setStateOrgFiles((prev) => ({
              ...prev,
              ...(docName ? { [docName]: updatedList } : {}),
            }));
          }
        } else {
          setFileSizeError(true);
        }
      } else {
        
        if (validFiles.length > 0) {
          setFile(validFiles[0]);
          setFileSizeError(hasLargeFile);
          localStorage.setItem("file", JSON.stringify(validFiles));
          setFileList(validFiles);

          if (setStateFile) {
            setStateFile((prev) => ({ ...prev, doc: validFiles }));
          }
          if (setSelectedFiles) {
            setSelectedFiles(validFiles);
          }
          if (setStateOrgFiles) {
            setStateOrgFiles((prev) => ({
              ...prev,
              ...(docName ? { [docName]: validFiles } : {}),
            }));
          }
        } else {
          setFileSizeError(true);
        }
      }
    }
  };

  const fileRemove = (file: File) => {
    setFile(null);
    const updatedList = [...fileList];
    updatedList.splice(fileList.indexOf(file), 1);
    setFileList(updatedList);
    if (setStateFile) {
      setStateFile((prev) => ({ ...prev, doc: updatedList }));
    }
    if (setSelectedFiles) {
      setSelectedFiles(updatedList);
    }
    if (setStateOrgFiles) {
      setStateOrgFiles((prev) => ({
        ...prev,
        ...(docName ? { [docName]: updatedList } : {}),
      }));
    }
    // props.onFileChange(updatedList);
    // onFileChange(updatedList);
  };
  return (
    <div>
      <div
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className="border relative border-dashed border-grey-swatch-500 mt-3 flex justify-center rounded-lg p-6 bg-white"
      >
        <div className="flex flex-col items-center">
          {isMultiple ? (
            <div className="w-fit h-fit grid place-items-center space-y-2">
              <div className="w-[40px] h-[40px] rounded-full bg-[#E4E7E863] grid place-items-center">
                <img src="/assets/graphics/uploadIcon.svg" alt="" />
              </div>

              <h2>Click to Upload your images or videos </h2>
              <p className="text-sm text-gray-500">or drag and drop</p>
            </div>
          ) : (
            <>
              <UploadDoc className="mb-2" />
              <p className="text-sm font-poppins text-grey-swatch-600">
                {" "}
                Drag and drop files or{" "}
                <Button
                  variant={"link"}
                  className="px-0 hover:underline underline-offset-1"
                >
                  Browse
                </Button>
              </p>
              <p className="text-xs text-center font-poppins">
                Support jpg, png, pdf
              </p>
              <div className="flex justify-center mt-2">
                <CameraIcon width={24} />
              </div>
            </>
          )}
          <input
            type="file"
            ref={fileInputRef}
            value=""
            className="opacity-0 absolute inset-0 h-full w-full cursor-pointer"
            onChange={onFileDrop}
            id="file"
            multiple={isMultiple}
            data-max-files={isMultiple ? 5 : undefined}
            disabled={disabled}
          />
        </div>
        {/* {children} */}
      </div>
      {fileList.length > 0 ? (
        <div className="flex flex-col justify-center w-full">
          {fileList.map((item, index) => (
            <div
              key={index}
              className="flex gap-2 mt-2 items-center justify-between gap-x-4 mb-[10px] rounded-[5px] px-4  bg-[#FFFFFF] w-[clamp(240px,100%,720px)] h-[50px] "
              style={{ boxShadow: "0px 0px 8px 1px rgba(0, 0, 0, 0.05)" }}
            >
              {generateFileTypeIcon(item.type.split("/")[1])}
              <div className="drop-file-preview__item__info">
                <p className="text-sm line-clamp-1 text-ellipsis font-poppins leading-[16px]">
                  {item.name}
                </p>
                <p className="text-xs mt-1 text-grey-swatch-600 line-clamp-1 text-ellipsis font-poppins leading-[16px]">
                  {formatBytes(item.size)}
                </p>
              </div>
              <button
                className="drop-file-preview__item__del flex items-center justify-center hover:bg-gray-200 rounded-full"
                onClick={() => fileRemove(item)}
              >
                <MdOutlineDelete color="red" />
              </button>
            </div>
          ))}
        </div>
      ) : null}
      {fileSizeError && (
        <div className="flex mt-3 items-center justify-center gap-1 mb-2">
          <div>
            <InformationCircleIcon className="text-ca-red " />
          </div>
          <span className="text-xs text-ca-red">
            Selected file cannot be more than 5MB.
          </span>
        </div>
      )}
    </div>
  );
};

export default DropBox;
