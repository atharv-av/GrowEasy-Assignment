"use client";

import Image from "next/image";
import React, { RefCallback } from "react";
import { Pencil } from "lucide-react";

interface BannerProps {
  title: string;
  description: string;
  cta: string;
  image: string;
  background?: string;
  imgClip: string;
  position?: string;
  onEditClick?: () => void;
  onDownloadClick?: () => void;
  bannerRef?: (el: HTMLDivElement | null) => void;
  showEditIcon?: boolean;
}

const BannerImageComp: React.FC<BannerProps> = ({
  title,
  description,
  cta,
  image,
  background,
  imgClip,
  position,
  onEditClick,
  onDownloadClick,
  bannerRef,
  showEditIcon = true,
}) => {
  let width, height, gap;
  if (position === "square") {
    width = "w-72";
    height = "h-72";
    gap = "gap-6";
  } else if (position === "portrait") {
    width = "w-72";
    height = "h-96";
    gap = "gap-4";
  } else if (position === "landscape") {
    width = "w-96";
    height = "h-60";
    gap = "gap-8";
  }

  return (
    <div>
      <div
        id="banner"
        ref={bannerRef}
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className={`text-white flex flex-row ${width} ${height} pl-4 py-4 cursor-default`}
      >
        <div
          className={`flex flex-col items-start justify-evenly w-full ${gap}`}
        >
          <div className="flex flex-col gap-2 items-start justify-start">
            <p className="text-white font-bold text-2xl">{title}</p>
            <p className="text-white text-base w-full overflow-hidden text-ellipsis">
              {description}
            </p>
          </div>
          <p className="text-black text-base bg-white rounded-md shadow-2xl shadow-black py-1 px-4">
            {cta}
          </p>
        </div>
        <div className="flex flex-col justify-between items-end gap-5 pr-2">
          <div>
            {showEditIcon && (
              <Pencil
                size={25}
                className="text-white pencil-icon cursor-pointer"
                onClick={onEditClick}
              />
            )}
          </div>
          <Image
            src={image}
            alt={title}
            height={150}
            width={300}
            className={imgClip}
          />
        </div>
      </div>
    </div>
  );
};

export default BannerImageComp;
