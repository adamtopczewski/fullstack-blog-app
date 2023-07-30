import AsciiImage from '@/components/About/AsciiImage'
import { Suspense } from 'react';
import { ASCII_IMAGE_WIDTH, ASCII_IMAGE_HEIGHT, ASCII_IMAGE_PATH } from '@/constants/About';

export default async function About() {
    return (
        <>
          <Suspense>
            <AsciiImage 
              baseImageWidth={ASCII_IMAGE_WIDTH} 
              baseImageHeight={ASCII_IMAGE_HEIGHT} 
              baseImagePath={ASCII_IMAGE_PATH} 
              />
          </Suspense>
        </>
    )
}
