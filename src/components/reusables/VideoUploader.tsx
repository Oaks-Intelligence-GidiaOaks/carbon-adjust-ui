import React, { useState, useRef, ChangeEvent } from "react";
import axiosInstance from "@/api/axiosInstance";
import { Button } from "../ui";
import { cn } from "@/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface VideoUploaderProps {
  videoUrl: string | null;
  uploadEndpoint: string;
  packageId: string;
}

const VideoUploader: React.FC<VideoUploaderProps> = ({
  videoUrl,
  uploadEndpoint,
  packageId,
}) => {
  const queryClient = useQueryClient();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log(file);
    if (file) {
      setSelectedFile(file);
    }
  };

  const uploadVideoMutation = useMutation({
    mutationKey: ["video-description"],
    mutationFn: async (formData: FormData) => {
      try {
        return await axiosInstance.patch(uploadEndpoint, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              setUploadProgress(
                Math.round((progressEvent.loaded * 100) / progressEvent.total)
              );
            }
          },
        });
      } catch (err) {
        console.error("Upload failed", err);
        console.log();
        // toast.error("Upload failed. Please try again.");
        throw Error("Upload failed. Please try again.");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [packageId] });
      setSelectedFile(null);
      setUploadProgress(0);
      toast.success("Video description uploaded successfully");
    },
    onError: (err: any) => {
      toast.error(
        err?.response?.data?.message ?? "Error uploading video description"
      );
    },
  });

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    uploadVideoMutation.mutate(formData);
  };

  return (
    <div className="p-4 border rounded bg-[#E4E7E8] flex-1 max-h-[300px] relative">
      {videoUrl ? (
        <div>
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="hidden"
          />
          <video
            src={videoUrl}
            controls
            className="w-auto mb-4 rounded-md max-h-[200px]"
          />
          {/* <Button
            onClick={() => fileInputRef.current?.click()}
            className={cn(
              "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            )}
          >
            Upload New Video
          </Button> */}
          <div
            className={cn(
              "flex flex-col gap-2 items-center h-full justify-center",
              selectedFile && "pb-28"
            )}
          >
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 w-full bg-blue-500 text-white rounded-md h-8 hover:bg-blue-600"
            >
              Upload New Video
            </Button>
          </div>
        </div>
      ) : (
        <div
          className={cn(
            "flex flex-col gap-2 items-center h-full justify-center",
            selectedFile && "pb-28"
          )}
        >
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="hidden"
          />
          <p className="p-2 text-center">
            No uploaded video description for this package.
          </p>
          <Button
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 bg-blue-500 text-white rounded-md h-8 hover:bg-blue-600"
          >
            Select Video
          </Button>
        </div>
      )}

      {selectedFile && (
        <div className="mt-4 bottom-0 left-0 absolute px-4 pb-2">
          <p
            className={cn("mb-2 line-clamp-2", selectedFile && "line-clamp-1")}
          >
            {/* Selected file: */}
            {selectedFile.name}
          </p>
          <button
            disabled={uploadVideoMutation.isPending}
            onClick={handleUpload}
            className="px-4 h-8 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Upload
          </button>
          <div className="mt-2 h-1 w-full bg-white rounded">
            <div
              className="h-1 bg-green-500 rounded transition-all"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
          {uploadProgress > 0 && (
            <p className="mt-2 text-sm text-gray-600">
              Upload progress: {uploadProgress}%
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default VideoUploader;
