import { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Image,
  Spinner,
  Heading,
  SimpleGrid,
} from "@chakra-ui/react";

interface WestStandings {
  teamId: number;
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

type TeamStats = {
  teamId: number;
  teamName: string;
  gamesPlayed: number;
  pointsPerGame: number;
  reboundsPerGame: number;
  assistsPerGame: number;
};

const WestStandingsRow = ({ teamData }: { teamData: WestStandings }) => {
  const teamIcon = `/icons/${teamData.name}.png`;

  const [stats, setStats] = useState<TeamStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    setLoading(true);
    setError(null);

    fetch(`http://localhost:8000/nba-team-stats?team_id=${teamData.teamId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Team not found");
        return res.json();
      })
      .then((json) => {
        setStats(json);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [open, teamData.teamId]);

  return (
    <>
      {/* Row */}
      <Flex
        p={2}
        borderWidth={1}
        borderColor="gray.700"
        align="center"
        _hover={{ bg: "gray.800" }}
        onClick={() => setOpen(true)}
        cursor="pointer"
      >
        <Text flex={1}>{teamData.rank}</Text>
        <Image
          flex={1}
          src={teamIcon}
          alt={`${teamData.name} logo`}
          boxSize={10}
          objectFit="contain"
        />
        <Text flex={3}>
          {teamData.city} {teamData.name}
        </Text>
        <Text flex={1}>{teamData.clinchIndicator}</Text>
        <Text flex={2}>{teamData.gamesBack}</Text>
        <Text flex={2}>{teamData.record}</Text>
        <Text flex={1}>{teamData.winPct}%</Text>
        <Text flex={1}>{teamData.home}</Text>
        <Text flex={1}>{teamData.road}</Text>
        <Text flex={1}>{teamData.lastTen}</Text>
      </Flex>
      {open && (
        <Box
          position="fixed"
          inset={0}
          bg="rgba(0, 0, 0, 0.6)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          zIndex={1000}
          p={4} // give mobile some breathing room
        >
          <Box
            bg="white"
            rounded="lg"
            boxShadow="2xl"
            maxW="lg"
            w="100%"
            p={6}
            position="relative"
          >
            {/* close button */}
            <Image
              src="/redX.jpg"
              boxSize={10} /* shorthand for width+height */
              position="absolute"
              top={4}
              right={4}
              cursor="pointer" /* show the pointer cursor */
              transition="transform 0.2s ease, opacity 0.2s ease"
              _hover={{
                transform: "scale(1.1)" /* grows by 10% */,
                opacity: 0.8 /* fades a bit */,
              }}
              onClick={() => setOpen(false)}
              alt="Close panel"
            />

            {/* header */}
            <Flex align="center" mb={4}>
              <Heading size="lg" color="blue.600">
                {teamData.city} {teamData.name}
              </Heading>
            </Flex>

            {/* <Divider mb={4} /> */}

            {/* stats grid */}
            {loading ? (
              <Flex justify="center" py={10}>
                <Spinner size="xl" />
              </Flex>
            ) : error ? (
              <Text color="red.500">{error}</Text>
            ) : stats ? (
              <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
                {/* helper function could DRY this up */}
                {[
                  ["Games Played", stats.gamesPlayed],
                  [
                    "Points/Game",
                    (stats.pointsPerGame / stats.gamesPlayed).toFixed(2),
                  ],
                  [
                    "Rebounds/Game",
                    (stats.reboundsPerGame / stats.gamesPlayed).toFixed(2),
                  ],
                  [
                    "Assists/Game",
                    (stats.assistsPerGame / stats.gamesPlayed).toFixed(2),
                  ],
                ].map(([label, value]) => (
                  <Box key={label}>
                    <Text fontSize="sm" color="gray.500" mb={1}>
                      {label}
                    </Text>
                    <Text fontSize="2xl" fontWeight="bold" color="gray.800">
                      {value}
                    </Text>
                  </Box>
                ))}
              </SimpleGrid>
            ) : null}
          </Box>
        </Box>
      )}
    </>
  );
};

export default WestStandingsRow;
