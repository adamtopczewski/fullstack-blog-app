"use client";
import Convert from 'image-convert-ascii';
import { IAsciiImageProps } from '@/types/About/types';
import { RefCallback, useCallback, useRef } from 'react';

//TODO move to @/hooks
const useCustomImageRef = ():[RefCallback<HTMLImageElement>] => {
    const imageRef = useRef<HTMLImageElement | null>(null);
    const setRef: RefCallback<HTMLImageElement> = useCallback(node => {
        //TODO refactor hardcoded values
        new Convert('js-baseImage', 'js-preElement-ASCII', 111, 141);
        imageRef.current = node;
    },[]) 
    return [setRef]
}

export default function AsciiImage({baseImageWidth, baseImageHeight, baseImagePath}: IAsciiImageProps) {
    const [imageRef] = useCustomImageRef();

    return (
        <>
            <div className="flex text-[3px]">
                <pre id="js-preElement-ASCII"></pre>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img ref={imageRef} 
                    alt="ASCII base image" 
                    id="js-baseImage" 
                    src={baseImagePath} 
                    width={baseImageWidth} 
                    height={baseImageHeight} 
                    crossOrigin="anonymous" 
                    className="hidden"
                    />
            </div>
        </>
    )
}