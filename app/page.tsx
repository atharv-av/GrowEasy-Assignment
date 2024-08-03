"use client";

import React, { useState, useRef } from "react";
import { toPng } from "html-to-image";

import BannerImageComp from "@/components/BannerImageComp";
import { SelectorMenu } from "@/components/SelectorMenu";
import EditBannerTemplateBs from "@/components/EditBannerTemplateBs";

import bannerData from "@/public/bannerData.json";

export default function Home() {
  const [position, setPosition] = useState<string>("square");
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
  const [currentBannerId, setCurrentBannerId] = useState<number | null>(null);
  const [banners, setBanners] = useState(bannerData);
  const [bannerDetails, setBannerDetails] = useState({
    title: "",
    description: "",
    cta: "",
    image: "",
    background: "",
    imgClip: "",
  });

  // Create a ref map to track banner refs
  const bannerRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const downloadImage = (bannerId: number) => {
    const ref = bannerRefs.current[bannerId];
    if (ref) {
      ref.classList.add("hide-pencil");

      toPng(ref)
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = `banner-${bannerId}.png`;
          link.click();
        })
        .catch((err) => {
          console.error("Failed to save image", err);
        })
        .finally(() => {
          ref.classList.remove("hide-pencil");
        });
    }
  };

  const handleUpdateBanner = (updatedDetails: any) => {
    setBanners(banners.map(banner => 
      banner.id === currentBannerId ? { ...banner, ...updatedDetails } : banner
    ));
  };

  const openEditSheet = (bannerId: number) => {
    const banner = banners.find((b) => b.id === bannerId);
    if (banner) {
      setBannerDetails(banner);
      setCurrentBannerId(bannerId);
      setIsSheetOpen(true);
    }
  };

  return (
    <>
      <SelectorMenu position={position} setPosition={setPosition} />
      <div className="flex flex-wrap gap-4">
        {banners.map((banner) => (
          <BannerImageComp
            key={banner.id}
            title={banner.title}
            description={banner.description}
            cta={banner.cta}
            image={banner.image}
            background={banner.background}
            imgClip={banner.imgClip}
            position={position}
            onEditClick={() => openEditSheet(banner.id)}
            onDownloadClick={() => downloadImage(banner.id)}
            bannerRef={(el) => (bannerRefs.current[banner.id] = el)} // Assign ref
          />
        ))}
      </div>
      <EditBannerTemplateBs
        isSheetOpen={isSheetOpen}
        onSheetClose={() => setIsSheetOpen(false)}
        onDownloadClick={() => downloadImage(currentBannerId || 0)}
        bannerDetails={bannerDetails}
        onUpdateBanner={(updatedDetails) => {
          handleUpdateBanner(updatedDetails);
          setIsSheetOpen(false);
        }}
      />
    </>
  );
}
