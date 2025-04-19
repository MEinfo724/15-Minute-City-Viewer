import React from "react";
import { Stack, Button, Text } from "@chakra-ui/react";
import { CARD_TEXT } from "./constants";

const InfoCard: React.FC = () => {
  return (
    <Stack
      direction="column"
      p={4}
      position="absolute"
      top="10px"
      left="10px"
      bg="whiteAlpha.800"
      backdropFilter="blur(4px)"
      borderRadius="md"
      boxShadow="md"
      zIndex={10}
      width="800px"
      align="center"
    >
      <Text fontWeight="bold">{CARD_TEXT.title}</Text>
      <Stack direction="column">Generated content</Stack>
      <Button colorScheme="blue" width="100%">
        {CARD_TEXT.button}
      </Button>
    </Stack>
  );
};

export default InfoCard;
