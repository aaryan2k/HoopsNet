import { Box, Container, Heading } from "@chakra-ui/react";
import StatsSelect from "./StatsSelect";

export default function Stats() {
  return (
    <Box
      bgImage="url('/curry.jpg')"
      bgSize="cover"
      bgPos="center"
      bgRepeat="no-repeat"
      minH="100vh"
      color="white"
    >
      <Box
        bg="rgba(0, 0, 0, 0.5)"
        minH="100vh"
        py={12}
      >
        <Container maxW="container.md" textAlign="center">
          <Heading as="h1" size="3xl" mb={4}>
            NBA Stat Explorer
          </Heading>
          <Heading as="h2" size="md" mb={8} opacity={0.8}>
            See league-leading metrics at a glance
          </Heading>
          <StatsSelect />
        </Container>
      </Box>
    </Box>
  );
}