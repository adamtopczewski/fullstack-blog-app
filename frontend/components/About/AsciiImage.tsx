"use client";
import Convert from 'image-convert-ascii';
import { useEffect } from 'react';

export default function AsciiImage() {
    // TODO change values/imagePath to constants
    // TODO image cleenup
    useEffect(() => {
        new Convert('img', 'pre', 100, 100);
      }, []);
    return (
        <>
            <div className="flex text-[3px]">
                <pre id="pre"></pre>
                <img id="img" src="/asciiImageBase_ver-2.webp" width={329} height={422} crossOrigin="anonymous" className="hidden" />
            </div>
        </>
    )
}