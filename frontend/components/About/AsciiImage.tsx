"use client";
import Convert from "image-convert-ascii";
import { IAsciiImageProps } from "@/types/About/types";
import { useRef } from "react";
import Image from "next/image";

export default function AsciiImage({
  baseImageWidth,
  baseImageHeight,
  baseImagePath,
}: IAsciiImageProps) {
  const imageRef = useRef<HTMLImageElement>(null);
  const preformatedRef = useRef<HTMLPreElement>(null);

  const processImage = async () => {
    if (imageRef.current && preformatedRef.current) {
      const asciiWidth = 111;
      const asciiHeight = 141;
      await new Convert(imageRef.current.id, preformatedRef.current.id, asciiWidth, asciiHeight);
      imageRef.current.className = 'hidden';
    }
  }

  return (
    <>
      <div className="flex text-[3px]">
        <pre ref={preformatedRef} id="js-ASCII-target" className="cursor-help hover:text-blue-400 hover:bg-red-400 hover:bg-opacity-30"></pre>
        <Image
          ref={imageRef}
          className="invisible"
          src={baseImagePath}
          width={baseImageWidth}
          height={baseImageHeight}
          alt="Image base for ASCII"
          id="js-baseImage"
          onLoadingComplete={() => processImage()}
        />
      </div>
    </>
  );
}
