"use client";

import React from "react";
import { EditBannerForm } from "./EditBannerForm";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  SheetClose,
} from "./ui/sheet";

interface EditBannerTemplateBsProps {
  isSheetOpen: boolean;
  onSheetClose: () => void;
  onDownloadClick: () => void;
  bannerDetails: {
    title: string;
    description: string;
    cta: string;
    image: string;
    background?: string;
  };
  onUpdateBanner: (updatedDetails: any) => void;
}

const EditBannerTemplateBs: React.FC<EditBannerTemplateBsProps> = ({
  isSheetOpen,
  onSheetClose,
  onDownloadClick,
  bannerDetails,
  onUpdateBanner,
}) => {
  return (
    <Sheet open={isSheetOpen} onOpenChange={(open) => !open && onSheetClose()}>
      <SheetContent side="bottom" className="lg:w-2/5 md:w-4/5 w-full mx-auto">
        <SheetHeader>
          <h2 className="text-lg font-semibold">Edit Banner</h2>
        </SheetHeader>
        <EditBannerForm
          bannerDetails={bannerDetails}
          onUpdateBanner={onUpdateBanner}
          onDownloadClick={onDownloadClick}
          onSheetClose={onSheetClose}
        />
        <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-neutral-100 dark:ring-offset-neutral-950 dark:focus:ring-neutral-300 dark:data-[state=open]:bg-neutral-800">
          <span className="sr-only">Close</span>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
};

export default EditBannerTemplateBs;
