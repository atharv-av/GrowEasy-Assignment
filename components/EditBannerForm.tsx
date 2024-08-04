"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import BannerImageComp from "./BannerImageComp";
import { Upload } from "lucide-react";

import images from "@/public/sampleImages.json";
import Image from "next/image";

interface EditBannerFormProps {
  bannerDetails: {
    title: string;
    description: string;
    cta: string;
    image: string;
    background?: string;
    imgClip: string;
  };
  onUpdateBanner: (updatedDetails: any) => void;
  onDownloadClick: () => void;
  onSheetClose: () => void;
}

export function EditBannerForm({
  bannerDetails,
  onUpdateBanner,
  onDownloadClick,
  onSheetClose,
}: EditBannerFormProps) {
  const [formValues, setFormValues] = useState(bannerDetails);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setFormValues(bannerDetails);
  }, [bannerDetails]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormValues({ ...formValues, image: reader.result as string });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleImageClick = (imagePath: string) => {
    setFormValues({ ...formValues, image: imagePath });
  };

  const handleSubmit = () => {
    onUpdateBanner(formValues);
    onSheetClose();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="lg:w-7/12 md:h-2/5 md:w-3/5 self-center">
        <BannerImageComp
          title={formValues.title}
          description={formValues.description}
          cta={formValues.cta}
          image={formValues.image}
          background={formValues.background}
          imgClip={formValues.imgClip}
          showEditIcon={false}
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <Label htmlFor="picture">Image</Label>
          <div className="flex flex-row gap-4">
            <Input
              ref={fileInputRef}
              id="picture"
              type="file"
              onChange={handleFileChange}
              className="w-1/12 p-6 rounded-full hidden"
            />
            <Button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="bg-gray-500 text-white rounded-full lg:w-1/12 md:w-1/12 md:h-12 w-1/6 py-7"
            >
              <Upload size={25} />
              <span className="sr-only">Upload Image</span>
            </Button>
            {images.map((image) => (
              <div
                key={image.id}
                className="flex flex-row items-center justify-center border border-gray-400 rounded-full cursor-pointer hover:border-gray-800"
                onClick={() => handleImageClick(image.path)}
              >
                <Image
                  src={image.path}
                  alt="Sample Image"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              </div>
            ))}
          </div>
        </div>
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            id="title"
            placeholder="Title"
            value={formValues.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Input
            type="text"
            id="description"
            placeholder="Description"
            value={formValues.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="cta">Button Text</Label>
          <Input
            type="text"
            id="cta"
            placeholder="Button Text"
            value={formValues.cta}
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-2">
          <Button
            className="bg-zinc-900 w-full hover:bg-zinc-800"
            onClick={handleSubmit}
          >
            Done
          </Button>
          <Button
            className="bg-blue-600 w-full hover:bg-zinc-900"
            onClick={onDownloadClick}
          >
            Download
          </Button>
        </div>
      </div>
    </div>
  );
}
