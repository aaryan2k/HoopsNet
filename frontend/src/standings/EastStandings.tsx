// import { useLoaderData} from "react-router-dom";
// import EastStandingsRow from "./EastStandingsRow";
// import "./Standings.css";

// const LeagueStandings = () => {

//   const standings = useLoaderData();
//   const nbaStandings = standings[0];
//   const eastStandings = nbaStandings.filter((team: any) => team.conference === "East");

//   if (eastStandings.length === 0) {
//     return(
//         <div>
//             <p>No data found</p>
//         </div>
//     );
//   }

//   return (
//     <div>
//       <div>
//         <h1> </h1>
//       </div>
//       <div className="mt-2 table-responsive">
//         <h4>East Standings:</h4>
//         <table className="table table-hover">
//           <thead className="table-light">
//             <tr>
//               <th>Rank</th>
//               <th></th>
//               <th>Team</th>
//               <th>Clinched</th>
//               <th>Games Back</th>
//               <th>Record</th>
//               <th>Win %</th>
//               <th>Home</th>
//               <th>Road</th>
//               <th>Last 10</th>
//             </tr>
//           </thead>
//           <tbody>
//             {eastStandings.map((h: any) => (
//                 <EastStandingsRow key={h.rank} eastStandings={h} />
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <p>
//         Legend: -x - Clinched playoff berth, -o - Out of Playoffs, -e - Clinched Eastern Conference, -c - Clinched Central Division, -se - Clinched Southeast Division, -a - Clinched Atlantic Division
//       </p>
//     </div>
//   )
// }

// export default LeagueStandings






// import { useLoaderData } from "react-router-dom";
// import { Box, Flex, Text, Heading } from "@chakra-ui/react";
// import EastStandingsRow from "./EastStandingsRow";

// const LeagueStandings = () => {
//   const standings = useLoaderData() as any[];
//   const nbaStandings = standings[0];
//   const eastStandings = nbaStandings.filter(
//     (team: any) => team.conference === "East"
//   );

//   if (eastStandings.length === 0) {
//     return (
//       <Box p={4}>
//         <Text>No data found</Text>
//       </Box>
//     );
//   }

//   return (
//     <Box p={4}>
//       <Heading as="h3" size="lg" mb={4}>
//         East Standings
//       </Heading>

//       {/* "Table" Container */}
//       <Flex direction="column" borderWidth="1px" borderRadius="lg" overflow="hidden">
//         {/* Header Row */}
//         <Flex bg="gray.200" p={2} fontWeight="bold">
//           <Text flex="1">Rank</Text>
//           <Text flex="2">Team</Text>
//           <Text flex="1">Clinched</Text>
//           <Text flex="1">Games Back</Text>
//           <Text flex="2">Record</Text>
//           <Text flex="1">Win %</Text>
//           <Text flex="1">Home</Text>
//           <Text flex="1">Road</Text>
//           <Text flex="1">Last 10</Text>
//         </Flex>

//         {/* Data Rows */}
//         {eastStandings.map((team: any) => (
//           <EastStandingsRow key={team.rank} teamData={team} />
//         ))}
//       </Flex>

//       <Text mt={4} fontSize="sm">
//         Legend: <br />
//         -x - Clinched playoff berth <br />
//         -o - Out of Playoffs <br />
//         -e - Clinched Eastern Conference <br />
//         -c - Clinched Central Division <br />
//         -se - Clinched Southeast Division <br />
//         -a - Clinched Atlantic Division
//       </Text>
//     </Box>
//   );
// };

// export default LeagueStandings;



import { useLoaderData } from "react-router-dom";
import { Box, Flex, Text, Heading } from "@chakra-ui/react";
import EastStandingsRow from "./EastStandingsRow";

const LeagueStandings = () => {
  const standings = useLoaderData() as any[];
  const nbaStandings = standings[0];
  const eastStandings = nbaStandings.filter(
    (team: any) => team.conference === "East"
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

      <Flex direction="column" borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Flex bg="gray.200" p={2} fontWeight="bold">
          <Text color={"black"} flex="1">Rank</Text>
          <Text color={"black"} flex="1"></Text>
          <Text color={"black"} flex="3">Team</Text>
          <Text color={"black"} flex="1">Clinched</Text>
          <Text color={"black"} flex="2">Games Back</Text>
          <Text color={"black"} flex="2">Record</Text>
          <Text color={"black"} flex="1">Win %</Text>
          <Text color={"black"} flex="1">Home</Text>
          <Text color={"black"} flex="1">Road</Text>
          <Text color={"black"} flex="1">Last 10</Text>
        </Flex>
        {eastStandings.map((team: any) => (
          <EastStandingsRow key={team.rank} teamData={team} />
        ))}
      </Flex>

      <Text mt={4} fontSize="sm">
        Legend: <br />
        -x - Clinched playoff berth <br />
        -o - Out of Playoffs <br />
        -e - Clinched Eastern Conference <br />
        -c - Clinched Central Division <br />
        -se - Clinched Southeast Division <br />
        -a - Clinched Atlantic Division
      </Text>
    </Box>
  );
};

export default LeagueStandings;