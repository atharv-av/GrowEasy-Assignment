"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EditBannerFormProps {
  bannerDetails: {
    title: string;
    description: string;
    cta: string;
    image: string;
    background?: string;
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

  const handleSubmit = () => {
    onUpdateBanner(formValues);
    onSheetClose();
  };

  return (
    <div>
      <div className="flex flex-col justify-center gap-4">
        <div>
          <Label htmlFor="picture">Image</Label>
          <Input id="picture" type="file" onChange={handleFileChange} />
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
        <div className="flex flex-col justify-center gap-2">
          <Button
            className="bg-zinc-900 hover:bg-zinc-800"
            onClick={handleSubmit}
          >
            Done
          </Button>
          <Button
            className="bg-blue-600 hover:bg-zinc-900"
            onClick={onDownloadClick}
          >
            Download
          </Button>
        </div>
      </div>
    </div>
  );
}
