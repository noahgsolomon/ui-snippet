'use client';

import { AnimatePresence, motion, useMotionValueEvent, useTransform } from 'motion/react';
import { usePointerPosition } from '@/hooks/use-pointer-position';
import { useRef, useState } from 'react';
import { delay, wrap } from 'motion';

interface TrailImage {
  id: number;
  x: number;
  y: number;
  imageIndex: number;
}

export default function CursorTrail({
  fadeOutDuration = 1.2,
  images = defaultImages,
  imageSize = 220,
  spawnDistance = 120,
}: {
  fadeOutDuration?: number;
  images?: string[];
  imageSize?: number;
  spawnDistance?: number;
}) {
  const imageIndex = useRef(0);
  const idCounter = useRef(0);
  const distance = useRef(0);

  const [trailImages, setTrailImages] = useState<TrailImage[]>([]);
  const pointer = usePointerPosition();
  const pointerDistance = useTransform(() => {
    const x = pointer.x.get();
    const y = pointer.y.get();
    const deltaX = x - (pointer.x.getPrevious() ?? x);
    const deltaY = y - (pointer.y.getPrevious() ?? y);
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  });

  useMotionValueEvent(pointerDistance, 'change', (latest) => {
    distance.current += latest;

    if (distance.current >= spawnDistance) {
      spawnImage(pointer.x.get(), pointer.y.get());
      distance.current = 0;
    }
  });

  const spawnImage = (x: number, y: number) => {
    const newImage: TrailImage = {
      id: idCounter.current++,
      x: x - imageSize / 2, // Center the 200px image
      y: y - imageSize / 2,
      imageIndex: imageIndex.current,
    };

    setTrailImages((prev) => [...prev, newImage]);

    // Cycle to next image
    imageIndex.current = wrap(0, images.length, imageIndex.current + 1);

    // Remove image after fade duration
    delay(() => {
      setTrailImages((prev) => prev.filter((img) => img.id !== newImage.id));
    }, fadeOutDuration);
  };

  return (
    <div className="h-screen w-screen bg-black">
      <div className="decorative-title">Amsterdam</div>

      <AnimatePresence>
        {trailImages.map((image) => (
          <motion.img
            key={image.id}
            src={images[image.imageIndex]}
            className="trail-image"
            style={{
              left: image.x,
              top: image.y,
              willChange: 'opacity, transform',
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.1 }}
            exit={{
              opacity: 0,
              scale: 0.5,
              transition: { duration: 0.3 },
            }}
          />
        ))}
      </AnimatePresence>

      <StyleSheet imageSize={imageSize} />
    </div>
  );
}

const defaultImages = [
  '/profile.png',
  '/profile.png',
  '/profile.png',
  '/profile.png',
  '/profile.png',
  '/profile.png',
  '/profile.png',
  '/profile.png',
  '/profile.png',
  '/profile.png',
  '/profile.png',
  '/profile.png',
  '/profile.png',
  '/profile.png',
];

/**
 * ==============   Styles   ================
 */
function StyleSheet({ imageSize }: { imageSize: number }) {
  return (
    <style>
      {`
        body {
          overflow: hidden;
        }

         .decorative-title {
           position: absolute;
           top: 50%;
           left: 50%;
           transform: translate(-50%, -50%);
           font-size: 6rem;
           font-weight: 900;
           letter-spacing: -0.05em;
           color: #f5f5f5;
           z-index: 50;
           pointer-events: none;
           text-transform: uppercase;
         }

         @media (max-width: 768px) {
          .decorative-title {
            font-size: 3rem;
          }
         }

        .trail-image {
          position: absolute;
          width: ${imageSize}px;
          height: ${imageSize}px;
          object-fit: contain;
          pointer-events: none;
          z-index: 1;
        }
      `}
    </style>
  );
}
