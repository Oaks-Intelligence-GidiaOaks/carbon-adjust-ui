import React, { useState, ChangeEvent } from "react";
import { Button, Label } from "@/components/ui";
import { BiEdit } from "react-icons/bi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePackageImage } from "@/services/merchant";
import toast from "react-hot-toast";
import { Oval } from "react-loader-spinner";

interface ImageUploadProps {
  defaultUrl: string;
  packageId: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ defaultUrl, packageId }) => {
  const queryClient = useQueryClient();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(defaultUrl);

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

  const updateImageMutation = useMutation({
    mutationKey: ["update-packageImage"],
    mutationFn: (data: FormData) => updatePackageImage(data, packageId),
    onSuccess: () => {
      toast.success("Package image updated successfully");
      queryClient.invalidateQueries({
        queryKey: [packageId],
      });
    },
    onError: (err) => {
      console.log(err);

      toast.error("Couldn't upload package image successfully");
    },
  });

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    updateImageMutation.mutate(formData);
    // setUploading(true);

    // try {
    //   const response = await axios.post("/your-endpoint-url", formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   });
    //   console.log("File uploaded successfully:", response.data);
    // } catch (error) {
    //   console.error("Error uploading file:", error);
    // } finally {
    //   setUploading(false);
    // }
  };

  return (
    <div className="min-w-[200px] max-w-[240px] flex flex-col bg-white shrink-0 mt-2 relative">
      <Label
        htmlFor="image"
        role="button"
        className="absolute cursor-pointer -top-3 -right-3 bg-ca-blue text-white size-8 z-10 rounded-full flex justify-center items-center"
      >
        <BiEdit className="size-5" />
      </Label>
      <div className="bg-[#E4E7E8] border rounded-md grid place-items-center h-[300px]">
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
            disabled={!selectedFile || updateImageMutation.isPending}
            className={`mt-2 text-white w-full h-8 text-sm ${
              updateImageMutation.isPending ? "bg-gray-300" : "bg-blue-500"
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
