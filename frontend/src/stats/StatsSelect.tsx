import React from "react";
import { Box, Button, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const stats = [
  { value: "PTS", label: "Points" },
  { value: "REB", label: "Rebounds" },
  { value: "AST", label: "Assists" },
  { value: "STL", label: "Steals" },
  { value: "BLK", label: "Blocks" },
  { value: "TOV", label: "Turnovers" },
  { value: "FG_PCT", label: "Field Goal %" },
  { value: "FG3_PCT", label: "3-Point %" },
  { value: "FT_PCT", label: "Free Throw %" },
];

export default function StatsSelect() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<string>("— Select a stat —");

  const onSelect = (value: string) => {
    setSelected(stats.find((s) => s.value === value)!.label);
    setOpen(false);
    navigate(`/stats/${value}`);
  };

  return (
    <Box maxW="300px" mx="auto" my={6} position="relative">
      <Button
        w="100%"
        onClick={() => setOpen((o) => !o)}
        bg="white"
        _hover={{ bg: "gray.100" }}
        color={"black"}
      >
        {selected}
      </Button>

      {open && (
        <VStack
          position="absolute"
          top="100%"
          left={0}
          w="100%"
          bg="white"
          border="1px solid"
          borderColor="gray.200"
          boxShadow="md"
          zIndex={10}
        >
          {stats.map(({ value, label }) => (
            <Button
              key={value}
              variant="ghost"
              w="100%"
              justifyContent="flex-start"
              onClick={() => onSelect(value)}
              _hover={{ bg: "gray.50" }}
            >
              {label}
            </Button>
          ))}
        </VStack>
      )}
    </Box>
  );
}