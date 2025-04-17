import {
  Box,
  Flex,
  Text,
  Image,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

interface WestStandings {
  rank: number;
  city: string;
  name: string;
  clinchIndicator: string;
  gamesBack: string;
  record: string;
  winPct: string;
  home: string;
  road: string;
  lastTen: string;
}

const EastStandingsRow = ({ teamData }: { teamData: WestStandings }) => {
  const teamIcon = `/icons/${teamData.name}.png`;
  const { open, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex
        p={2}
        borderWidth={0.2}
        borderColor="white"
        align="center"
        _hover={{ bg: "#225566" }}
        onClick={onOpen}
        cursor="pointer"
      >
        <Text flex="1">{teamData.rank}</Text>

        <Image
          flex="1"
          src={teamIcon}
          alt={`${teamData.name} logo`}
          boxSize="45px"
          objectFit="contain"
        />
        <Text flex="3">
          {teamData.city ? `${teamData.city} ${teamData.name}` : teamData.name}
        </Text>
        <Text flex="1">{teamData.clinchIndicator}</Text>
        <Text flex="2">{teamData.gamesBack}</Text>
        <Text flex="2">{teamData.record}</Text>
        <Text flex="1">{teamData.winPct}%</Text>
        <Text flex="1">{teamData.home}</Text>
        <Text flex="1">{teamData.road}</Text>
        <Text flex="1">{teamData.lastTen}</Text>
      </Flex>
      {open && (
        <Box
          position="fixed"
          top="0"
          left="0"
          width="100%"
          height="100%"
          bg="rgba(0, 0, 0, 0.6)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          zIndex={1000}
        >
          <Box
            bg="white"
            p={6}
            borderRadius="md"
            width={{ base: "90%", md: "500px" }}
            position="relative"
          >
            <Text fontSize="xl" fontWeight="bold" mb={4}>
              {teamData.city} {teamData.name} Details
            </Text>
            <Box mb={4}>
              <Text>
                <strong>Rank:</strong> {teamData.rank}
              </Text>
              <Text>
                <strong>Clinched Indicator:</strong> {teamData.clinchIndicator}
              </Text>
              <Text>
                <strong>Games Back:</strong> {teamData.gamesBack}
              </Text>
              <Text>
                <strong>Record:</strong> {teamData.record}
              </Text>
              <Text>
                <strong>Win %:</strong> {teamData.winPct}%
              </Text>
              <Text>
                <strong>Home:</strong> {teamData.home}
              </Text>
              <Text>
                <strong>Road:</strong> {teamData.road}
              </Text>
              <Text>
                <strong>Last 10:</strong> {teamData.lastTen}
              </Text>
            </Box>
            <Flex justifyContent="flex-end">
              <Button colorScheme="blue" onClick={onClose}>
                Close
              </Button>
            </Flex>
          </Box>
        </Box>
      )}
    </>
  );
};

export default EastStandingsRow;
