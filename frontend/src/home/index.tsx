import { useState } from "react";
import {
  Box,
  Flex,
  Image,
  Heading,
  Text,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

import { CrossFadeBackground } from "./CrossFadeBackground";

import kobe1 from "./kobe_background.jpg";
import kobe2 from "./kobe_2.jpg"; // second image
import highlightImage from "./Highlight.png";
import carousel3 from "./jordan.jpg";
import carousel4 from "./carousel4.jpg";

const slides = [
  {
    key: 0,
    layout: "hero",
    heading: "The Black Mamba",
    text: "Click below to view current NBA standings.",
    buttonText: "See Standings",
    link: "/standings",
    images: [kobe1, kobe2],
  },
  {
    key: 1,
    layout: "split",
    heading: "Welcome to HoopsNet",
    text: "Click below to view current player statistics.",
    buttonText: "Player Stats",
    link: "/stats",
    image: carousel3,
  },
  {
    key: 2,
    layout: "fullImage",
    heading: "Prediction",
    text: "",
    buttonText: "AI Prediction",
    link: "/prediction",
    image: carousel4,
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
          {slide.layout === "hero" ? (
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

              {/* Text container */}
              <Flex
                position="relative"
                zIndex={1}
                direction="column"
                justify="center"
                align="center" // center horizontally
                h="100%"
                maxW="600px"
                mx={{ base: 4, md: 16 }}
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
                    src={highlightImage}
                    alt="Highlight"
                    objectFit="contain"
                    w="100%"
                    h="100%"
                  />
                  <Text
                    position="absolute"
                    color="black"
                    fontSize={{ base: "3xl", md: "5xl" }}
                    fontWeight="bold"
                    textAlign="center"
                    px={4}
                  >
                    {slide.heading}
                  </Text>
                </Flex>

                <Text color="white" fontSize={{ base: "md", md: "xl" }} mb={6}>
                  {slide.text}
                </Text>

                <Button as={NavLink} colorScheme="yellow" size="lg">
                  <a href={slide.link}>{slide.buttonText}</a>
                </Button>
              </Flex>
            </Box>
          ) : slide.layout === "split" ? (
            // SPLIT LAYOUT: Text on the left, image on the right.
            <Flex direction={{ base: "column", md: "row" }} height="100%">
              <Flex
                flex="1"
                direction="column"
                justify="center"
                p={{ base: 4, md: 10 }}
                bg="blackAlpha.600"
              >
                <Heading color="white" mb={4}>
                  {slide.heading}
                </Heading>
                <Text color="white" mb={4}>
                  {slide.text}
                </Text>
                <Button as={NavLink} colorScheme="yellow" size="lg">
                  <a href={slide.link}>{slide.buttonText}</a>
                </Button>
              </Flex>
              <Box flex="1">
                <Image
                  src={slide.image}
                  alt={slide.heading}
                  objectFit="cover"
                  width="100%"
                  height="100%"
                />
              </Box>
            </Flex>
          ) : (
            // FULLIMAGE LAYOUT: Full background image with centered overlay caption.
            <Box position="relative" width="100%" height="100%">
              <Image
                src={slide.image}
                alt={slide.heading}
                objectFit="cover"
                width="100%"
                height="100%"
              />
              <Flex
                position="absolute"
                top="0"
                left="0"
                width="100%"
                height="100%"
                align="center"
                justify="center"
                bg="rgba(0,0,0,0.5)"
                direction="column"
                p={4}
              >
                <Heading color="white" mb={4}>
                  {slide.heading}
                </Heading>
                <Button as={NavLink} colorScheme="blue" size="lg">
                  <a href={slide.link}>{slide.buttonText}</a>
                </Button>
              </Flex>
            </Box>
          )}
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
