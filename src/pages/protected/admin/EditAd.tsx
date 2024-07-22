import { RootState } from "@/app/store";
import { Button, Input } from "@/components/ui";
import { IAds } from "@/interfaces/ads.interface";
import {
  editAdvertResponse,
  updateAdvertBanner,
} from "@/services/adminService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { FiDownloadCloud } from "react-icons/fi";
import { IoArrowBackSharp } from "react-icons/io5";
import { Oval } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

type Props = {};

const EditAd = (_: Props) => {
  const ad = useSelector((state: RootState) => state.ads);
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [formData, setFormData] = useState<
    Omit<IAds, "file"> & { bannerImage: string }
  >({
    _id: ad._id,
    title: ad.title,
    description: ad.description,
    hasCTA: ad.hasCTA,
    ctaLink: ad.ctaLink,
    ctaText: ad.ctaText,
    exposureTime: ad.exposureTime,
    expirationDuration: ad.expirationDuration,
    showBannerImgOnly: ad.showBannerImgOnly || false,
    bannerImage: ad.bannerImage,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(
    ad.bannerImage
  );

  const editAdMutation = useMutation({
    mutationKey: ["edit-ad"],
    mutationFn: (adData: { adsId: string; data: Partial<IAds> }) =>
      editAdvertResponse(adData),
    onSuccess: (sx: any) => {
      toast.success(sx.message);
      resetForm();
      navigate(`/admin/ads`);
    },
    onError: (ex: any) => {
      toast.error(ex.response.data.message);
    },
  });

  const updateAdvertBannerMutation = useMutation({
    mutationKey: ["update-banner-ad"],
    mutationFn: (bannerData: { adsId: string; file: File }) =>
      updateAdvertBanner(bannerData),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["All"] });
    },
    onSuccess: (sx: any) => {
      setImagePreview(sx.data.bannerImage);
      toast.success(sx.message);
    },
    onError: (ex: any) => {
      toast.error(ex.response.data.message);
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateAdvertBannerMutation.mutate({
          adsId: formData._id as string,
          file: file,
        });
      };

      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { bannerImage, _id, ...rest } = formData;

    const filteredEntries = Object.entries({ ...rest })
      .filter(([_, val]) => val !== "")
      .reduce<Record<string, any>>((acc, [key, val]) => {
        acc[key] = val;
        return acc;
      }, {});

    const adsData = {
      adsId: _id as string,
      data: {
        ...filteredEntries,
      },
    };

    editAdMutation.mutate(adsData);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      hasCTA: false,
      ctaLink: "",
      ctaText: "",
      exposureTime: "",
      expirationDuration: "",
      showBannerImgOnly: false,
      bannerImage: "",
    });

    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="px-4 ">
      <div
        className="flex-center gap-2 cursor-pointer "
        onClick={() => navigate(`/admin/ads`)}
      >
        <IoArrowBackSharp />
        <span>Create Advert</span>
      </div>

      <form action="" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-8 lg:w-3/4 xl:w-2/3 mx-auto mt-10 text-sm">
          {/* image upload */}
          <div className="space-y-2">
            <h2 className="">Package attachment</h2>

            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
              ref={fileInputRef}
            />

            <div
              className="rounded-xl border grid place-items-center h-[180px] cursor-pointer "
              onClick={triggerFileInput}
            >
              {updateAdvertBannerMutation.isPending ? (
                <Oval
                  visible={true}
                  height="20"
                  width="20"
                  color="#ffffff"
                  ariaLabel="oval-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              ) : imagePreview ? (
                <ImagePreviewCard image={imagePreview} />
              ) : (
                <div className="w-fit h-fit grid place-items-center space-y-2">
                  <div className="w-[40px] h-[40px] rounded-full bg-[#E4E7E863] grid place-items-center">
                    <FiDownloadCloud size={24} />
                  </div>

                  <h2>Click to Upload your image or Video</h2>
                  <h2>or drag and drop</h2>
                </div>
              )}
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2 ">
            <h2 className="pl-2">Title</h2>

            <Input
              name="title"
              placeholder="Write a brief Title for the advert"
              className="border rounded-xl px-2 text-sm"
              onChange={handleInputChange}
              value={formData.title}
            />
          </div>

          {/* ads dec */}
          <div className="space-y-2">
            <h2 className="pl-2">Ad Description</h2>

            <textarea
              onChange={handleInputChange}
              name="description"
              value={formData.description}
              rows={10}
              id=""
              className="border w-full p-2 rounded-xl ml-2 "
              placeholder="Write a brief Description of the advert"
            ></textarea>
          </div>

          {/* Group  */}
          <div className="space-y-5">
            <div className="flex-center gap-2 pl-2">
              <input
                type="checkbox"
                name="hasCTA"
                id=""
                checked={formData.hasCTA}
                onChange={handleInputChange}
              />
              <span>Set Call to Action</span>
            </div>

            {/* Hidden inputs */}
            {formData.hasCTA && (
              <div className="flex items-center flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="pl-2" htmlFor="">
                    Call to action link
                  </label>

                  <Input
                    name="ctaLink"
                    onChange={handleInputChange}
                    value={formData.ctaLink}
                    placeholder="Call to Action Link"
                    className="border rounded-xl px-2 mt-2"
                  />
                </div>

                <div className="flex-1">
                  <label htmlFor="" className="pl-2">
                    Call to action text
                  </label>

                  <Input
                    name="ctaText"
                    value={ad.ctaText}
                    onChange={handleInputChange}
                    placeholder="Call to Action text"
                    className="border rounded-xl px-2 mt-2"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex-center gap-2">
            <div className="space-y-2 flex-1">
              <label className="pl-2">Exposure Time (Seconds)</label>

              <Input
                type="number"
                max={5}
                className="border rounded-xl px-2"
                placeholder=""
                name="exposureTime"
                onChange={handleInputChange}
                value={Number(formData.exposureTime)}
              />
            </div>

            <div className="space-y-2 flex-1">
              <label className="pl-2">Duration (Days)</label>

              <Input
                type="number"
                className="border rounded-xl px-2"
                placeholder=""
                name="expirationDuration"
                max={5}
                value={Number(formData.expirationDuration)}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="flex-center gap-2 pl-2">
            <input
              type="checkbox"
              name="showBannerImgOnly"
              id=""
              checked={formData.showBannerImgOnly}
              onChange={handleInputChange}
            />
            <span>Show Only Advert Image </span>
          </div>

          <div className="w-full mx-auto ">
            <Button disabled={editAdMutation.isPending} className="w-full">
              {editAdMutation.isPending ? (
                <Oval
                  visible={true}
                  height="20"
                  width="20"
                  color="#ffffff"
                  ariaLabel="oval-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              ) : (
                <span>Update </span>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditAd;
