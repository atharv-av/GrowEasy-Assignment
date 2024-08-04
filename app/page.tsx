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

  const bannerRefs = useRef<Record<number, HTMLDivElement | null>>([]);

  const downloadImage = async (bannerId: number) => {
    const ref = bannerRefs.current[bannerId];

    if (ref) {
      const pencilIcons = ref.querySelectorAll(".pencil-icon");
      pencilIcons.forEach(
        (icon) => ((icon as HTMLElement).style.display = "none")
      );

      try {
        // Generate the image and download
        const dataUrl = await toPng(ref);
        triggerDownload(dataUrl, `banner-${bannerId}.png`);
      } catch (err) {
        console.error("Failed to save image", err);
      } finally {
        pencilIcons.forEach(
          (icon) => ((icon as HTMLElement).style.display = "block")
        );
        window.location.reload();
      }
    } else {
      console.error(`No ref found for banner ${bannerId}`);
    }
  };

  const triggerDownload = (dataUrl: string, filename: string) => {
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleUpdateBanner = (updatedDetails: any) => {
    setBanners(
      banners.map((banner) =>
        banner.id === currentBannerId
          ? { ...banner, ...updatedDetails }
          : banner
      )
    );
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
    <div className="bg-gray-100 flex flex-col gap-6 items-center pt-4 pb-8">
      <SelectorMenu position={position} setPosition={setPosition} />
      <div className="flex flex-wrap items-center justify-center gap-4 w-3/5">
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
            bannerRef={(el) => (bannerRefs.current[banner.id] = el)}
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
    </div>
  );
}
