import { useLoaderData } from "react-router-dom";
import { Box, Flex, Text, Heading } from "@chakra-ui/react";
import EastStandingsRow from "./EastStandingsRow";
import { ListItem, Badge } from "@chakra-ui/react";

function Legend() {
  const items = [
    ["x", "Clinched playoff berth", "green"],
    ["o", "Out of playoffs", "red"],
    ["e", "Clinched Eastern Conf.", "blue"],
    ["c", "Clinched Central Div.", "purple"],
    ["se", "Clinched Southeast Div.", "orange"],
    ["a", "Clinched Atlantic Div.", "teal"],
  ];

  return (
    <Box mt={6}>
      <Text mb={2} fontWeight="semibold" color="gray.400">
        Legend
      </Text>
      <Flex direction="column" gap={2} fontSize="sm" color="gray.300">
        {items.map(([code, label, color]) => (
          <Flex key={code} align="center">
            <Badge mr={2} colorScheme={color} variant="solid" fontSize="0.7em">
              {code}
            </Badge>
            <Text>{label}</Text>
          </Flex>
        ))}
      </Flex>
    </Box>
  );
}

const LeagueStandings = () => {
  const standings = useLoaderData() as any[];
  const nbaStandings = standings[0];
  const eastStandings = nbaStandings.filter(
    (team: any) => team.conference === "East",
  );

  if (eastStandings.length === 0) {
    return (
      <Box p={4}>
        <Text>No data found</Text>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Heading as="h3" size="lg" mb={4} color={"white"}>
        East Standings
      </Heading>

      <Flex
        direction="column"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
      >
        <Flex bg="gray.200" p={2} fontWeight="bold">
          <Text color={"black"} flex="1">
            Rank
          </Text>
          <Text color={"black"} flex="1"></Text>
          <Text color={"black"} flex="3">
            Team
          </Text>
          <Text color={"black"} flex="1">
            Clinched
          </Text>
          <Text color={"black"} flex="2">
            Games Back
          </Text>
          <Text color={"black"} flex="2">
            Record
          </Text>
          <Text color={"black"} flex="1">
            Win %
          </Text>
          <Text color={"black"} flex="1">
            Home
          </Text>
          <Text color={"black"} flex="1">
            Road
          </Text>
          <Text color={"black"} flex="1">
            Last 10
          </Text>
        </Flex>
        {eastStandings.map((team: any) => (
          <EastStandingsRow key={team.rank} teamData={team} />
        ))}
      </Flex>
      {Legend()}
    </Box>
  );
};

export default LeagueStandings;
