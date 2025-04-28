import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface CrossFadeBackgroundProps {
  images: string[];
  duration?: number; // How long each image stays on screen in ms
  fadeTime?: number; // How long the fade transition lasts in ms
}

export function CrossFadeBackground({
  images,
  duration = 5000,
  fadeTime = 1000,
}: CrossFadeBackgroundProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, duration);
    return () => clearInterval(interval);
  }, [images.length, duration]);

  return (
    <Box position="relative" width="100%" height="100%">
      {images.map((img, idx) => {
        const isActive = idx === currentIndex;
        return (
          <Box
            key={img}
            position="absolute"
            top="0"
            left="0"
            width="100%"
            height="100%"
            backgroundImage={`url(${img})`}
            backgroundSize="cover"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            opacity={isActive ? 1 : 0}
            transition={`opacity ${fadeTime}ms ease-in-out`}
          />
        );
      })}
    </Box>
  );
}
