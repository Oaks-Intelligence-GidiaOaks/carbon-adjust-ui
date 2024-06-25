import React, { useState, ChangeEvent } from "react";
import axios from "axios";
import { Button, Label } from "@/components/ui";
import { BiEdit } from "react-icons/bi";
import { useMutation } from "@tanstack/react-query";
import { updatePackageImage } from "@/services/merchant";
import toast from "react-hot-toast";
import { Oval } from "react-loader-spinner";

interface ImageUploadProps {
  defaultUrl: string;
  packageId: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ defaultUrl, packageId }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(defaultUrl);
  const [uploading, setUploading] = useState<boolean>(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    setUploading(true);

    try {
      const response = await axios.post("/your-endpoint-url", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("File uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setUploading(false);
    }
  };

  const updateImageMutation = useMutation({
    mutationKey: ["update-packageImage"],
    mutationFn: (data: FormData) => updatePackageImage(data, packageId),
    onSuccess: () => {
      toast.success("Package image updated successfully");
    },
    onError: () => {
      toast.success("Couldn't upload package image successfully");
    },
  });

  return (
    <div className="min-w-[200px] max-w-[240px] flex flex-col bg-white shrink-0 mt-2 relative">
      <Label
        htmlFor="image"
        role="button"
        className="absolute cursor-pointer -top-3 -right-3 bg-ca-blue text-white size-8 z-10 rounded-full flex justify-center items-center"
      >
        <BiEdit className="size-5" />
      </Label>
      <div className="bg-[#F3F5F7] rounded-md grid place-items-center h-[300px]">
        <div className="w-full h-full overflow-hidden relative">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full h-full object-cover rounded-md"
          />
        </div>
      </div>
      <div className="mt-4 flex flex-col items-center">
        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mb-4 hidden"
        />
        {selectedFile && (
          <Button
            onClick={handleUpload}
            disabled={!selectedFile || uploading}
            className={`mt-2 text-white w-full h-8 text-sm ${
              uploading ? "bg-gray-300" : "bg-blue-500"
            }`}
          >
            {updateImageMutation.isPending ? (
              <Oval
                visible={updateImageMutation.isPending}
                height="20"
                width="20"
                color="#ffffff"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            ) : (
              <span>Upload Image</span>
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
