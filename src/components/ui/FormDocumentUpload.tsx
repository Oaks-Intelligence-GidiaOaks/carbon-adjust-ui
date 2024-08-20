import {
  memo,
  ChangeEvent,
  useCallback,
  useRef,
  Dispatch,
  SetStateAction,
} from "react";
import { IComponentMap } from "@/types/general";
import { UploadStates } from "@/interfaces/order.interface";
import { IoDocumentText } from "react-icons/io5";

type Props = {
  label?: string;
  coverImage: string;
  classNames?: string;
  isDocSupporting?: boolean;
  onChange?: (val: null | string) => void | null;
  accept?: string;
  previewUrl: string | undefined | null;
  file: File | null;
  setFile: Dispatch<SetStateAction<File | null>>;
  setPreviewUrl: (d: string | undefined) => void;
  setUploading: Dispatch<SetStateAction<UploadStates>>;
  uploading: string;
};

const FormDocumentUpload = (props: Props) => {
  const docRef = useRef<HTMLInputElement>(null);

  const uploadButton: IComponentMap = {
    default: props?.isDocSupporting ? (
      <img
        data-testid="trigger-file-dialog"
        src={`/assets/icons/cloud-upload2.svg`}
        alt="cloud-upload"
        className=""
        height={29.182}
        width={29.182}
      />
    ) : (
      <img
        src={`/assets/icons/cloud-upload.svg`}
        alt="cloud-upload"
        className=""
        height={29.182}
        width={29.182}
      />
    ),
    inProgress: (
      <img
        src={`/assets/icons/spinner.svg`}
        alt="spinner"
        className="spinner h-8 w-8 animate-spin"
        height={29.182}
        width={29.182}
      />
    ),
    completed: (
      <img
        src={`/assets/icons/checked.svg`}
        alt="checked"
        className="h-8 w-8"
        height={29.182}
        width={29.182}
      />
    ),
  };

  const handleFiileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

    if (file) {
      props.setUploading(UploadStates.inProgress);
      props.setFile(file);

      // convert file to base64
      const reader = new FileReader();

      reader.onload = (e) => {
        const result = e.target?.result as string;
        props.setPreviewUrl(result);

        setTimeout(() => {
          props.setUploading(UploadStates.completed);
        }, 4000);
      };

      reader.readAsDataURL(file);
    }
  }, []);

  // @ts-ignore
  const handleFileRemoval = () => {
    props.setPreviewUrl(undefined);
    props.setUploading(UploadStates.default);

    docRef.current!.value = "";
  };

  return (
    <div className="flex flex-col gap-[14px] text-sm font-medium font-poppins">
      <label htmlFor="doc-file" className="text-[#434343]">
        {props.label}
      </label>

      <div
        className={
          "w-full  rounded-[16px] py-2 fold:gap-[20px]  surface:px-[50px] surface:justify-between gap-[64px]  flex items-center justify-center md:justify-between md:px-[50px] gradient-border bg-[#deebff68] " +
          props.classNames
        }
        onClick={() => docRef.current?.click()}
      >
        <img
          src={props.coverImage}
          alt=""
          className=""
          height={97.888}
          width={147.998}
        />

        <button
          id="upload-buttons-container"
          className="w-[50.5px] h-[50.5px] grid place-items-center"
        >
          {uploadButton[props.uploading]}
        </button>

        <input
          ref={docRef}
          onChange={handleFiileChange}
          className="hidden"
          type="file"
          accept="application/pdf"
          name="doc-file"
          id="doc-file"
          data-testid={`doc-file-${props.isDocSupporting ? "support" : "cv"}`}
        />
      </div>

      {/* progress indicator */}
      {props.uploading === "inProgress" && (
        <div
          id="progress-bar-container"
          className="h-[8px] rounded-lg bg-[#deebff] "
        >
          <div className="h-full progress-bar-striped rounded-lg bg-gradient-to-r w-1/2  from-[#5049E1] to-[#29B0FA]  " />
        </div>
      )}

      {/* doc name preview here */}
      {props.file && props.uploading === UploadStates.completed && (
        <div className="flex-center justify-between">
          <div className="flex-center gap-2">
            <IoDocumentText className="text-[#93b3e3]" />
            <span className="max-w-[400px] text-ellipsis truncate">
              {props.file.name}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(FormDocumentUpload);
