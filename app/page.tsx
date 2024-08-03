"use client";

import React, { useRef, useState } from "react";

import { toPng } from "html-to-image";

import BannerImageComp from "@/components/BannerImageComp";
import { SelectorMenu } from "@/components/SelectorMenu";
import EditBannerTemplateBs from "@/components/EditBannerTemplateBs";

export default function Home() {
  const [position, setPosition] = useState<string>("square");
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
  const [bannerDetails, setBannerDetails] = useState({
    title: "hello",
    description: "lorem ipsum dolor sit ammet",
    cta: "Buy Now",
    image: "/images/img1.jpg",
    background: "/images/bg1.jpeg",
  });

  const bannerRef = useRef<HTMLDivElement>(null);

  const downloadImage = () => {
    if (bannerRef.current) {
      bannerRef.current.classList.add("hide-pencil");

      toPng(bannerRef.current)
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = "banner.png";
          link.click();
        })
        .catch((err) => {
          console.error("Failed to save image", err);
        })
        .finally(() => {
          bannerRef.current?.classList.remove("hide-pencil");
        });
    }
  };

  const handleUpdateBanner = (updatedDetails: any) => {
    setBannerDetails(updatedDetails);
  };

  return (
    <>
      <SelectorMenu position={position} setPosition={setPosition} />
      <BannerImageComp
        title={bannerDetails.title}
        description={bannerDetails.description}
        cta={bannerDetails.cta}
        image={bannerDetails.image}
        background={bannerDetails.background}
        imgClip="clip-hexagon"
        position={position}
        onEditClick={() => setIsSheetOpen(true)}
        onDownloadClick={downloadImage}
        bannerRef={bannerRef}
      />
      <EditBannerTemplateBs
        isSheetOpen={isSheetOpen}
        onSheetClose={() => setIsSheetOpen(false)}
        onDownloadClick={downloadImage}
        bannerDetails={bannerDetails}
        onUpdateBanner={handleUpdateBanner}
      />
    </>
  );
}
