import { useState } from "react";
import {
  Box,
  Flex,
  Image,
  Button,
  useBreakpointValue,
  Link,
} from "@chakra-ui/react";

import { CrossFadeBackground } from "./CrossFadeBackground";

import kobeHighlightImage from "./Highlight-transparent.png";
import kobe1 from "./kobe_background.jpg";
import kobe2 from "./kobe-bryant.jpg"; // second image
import kobe3 from "./mamba-mentality.jpeg"; // second image

import jordanHighlightImage from "./red-highlight.png";
import jordan1 from "./jordan-dunking.jpg";
import jordan2 from "./air-jordan.jpg";
import jordan3 from "./jordan-jumper.jpg";

import lebronHighlightImage from "./lebron-highlight.png";
import lebron1 from "./lebron-dunking.jpg";
import lebron2 from "./lebron-chalk.jpg";
import lebron3 from "./lebron-celtics.jpg";

const slides = [
  {
    key: 0,
    layout: "hero",
    heading: "See standings",
    text: "Click below to view current NBA standings.",
    buttonText: "See Standings",
    link: "/standings/#standings",
    images: [kobe1, kobe2, kobe3],
  },
  {
    key: 1,
    layout: "hero",
    heading: "See Player Stats",
    text: "Click below to view current player statistics.",
    buttonText: "Player Stats",
    link: "/standings/#stats",
    images: [jordan1, jordan2, jordan3],
  },
  {
    key: 3,
    layout: "hero",
    heading: "See AI Prediction",
    text: "Click below to view current player statistics.",
    buttonText: "Player Stats",
    link: "/standings/#prediction",
    images: [lebron1, lebron2, lebron3],
  },
];

export default function Main() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const containerHeight = useBreakpointValue({ base: "auto", md: "100vh" });

  return (
    <Box
      position="relative"
      overflow="hidden"
      width="100%"
      height={containerHeight}
      bgColor="black"
    >
      {slides.map((slide, index) => (
        <Box
          key={slide.key}
          display={index === current ? "block" : "none"}
          width="100%"
          height="100%"
          position="relative"
        >
          <Box position="relative" width="100%" height="100%">
            {/* Background container */}
            <Box
              position="absolute"
              top="0"
              left="0"
              width="100%"
              height="100%"
              zIndex={0}
            >
              <CrossFadeBackground
                images={slide.images ? slide.images : []}
                duration={4000}
                fadeTime={1000}
              />
            </Box>

            {/* Centered Text Container */}
            <Flex
              position="absolute" // changed to absolute for full centering
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              zIndex={1}
              direction="column"
              justify="center"
              align="center"
              textAlign="center" // ensures text is centered inside the container
              px={4}
            >
              {/* Highlight container */}
              <Flex
                position="relative"
                align="center"
                justify="center"
                w={{ base: "300px", md: "500px" }}
                h={{ base: "130px", md: "180px" }}
                mb={4}
              >
                <Image
                  src={
                    slide.key === 0
                      ? kobeHighlightImage
                      : slide.key === 1
                        ? jordanHighlightImage
                        : lebronHighlightImage
                  }
                  alt="Highlight"
                  objectFit="contain"
                  w="100%"
                  h="100%"
                />
                <Link
                  href={slide.link}
                  position="absolute"
                  color="black"
                  fontSize={{ base: "3xl", md: "5xl" }}
                  fontWeight="bold"
                  textAlign="center"
                  px={4}
                  fontFamily="cursive"
                  _hover={{ textDecoration: "underline" }}
                >
                  {slide.heading}
                </Link>
                {/* </Text> */}
              </Flex>
            </Flex>
          </Box>
        </Box>
      ))}

      {/* Navigation Arrows */}
      <Button
        aria-label="Previous Slide"
        position="absolute"
        left="10px"
        top="50%"
        transform="translateY(-50%)"
        onClick={prevSlide}
        variant="ghost"
        color="white"
        fontSize="2xl"
        p={0}
      >
        ◀
      </Button>

      <Button
        aria-label="Next Slide"
        position="absolute"
        right="10px"
        top="50%"
        transform="translateY(-50%)"
        onClick={nextSlide}
        variant="ghost"
        color="white"
        fontSize="2xl"
        p={0}
      >
        ▶
      </Button>
    </Box>
  );
}
