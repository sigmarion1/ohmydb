// Chakra imports
import {
  Avatar,
  AvatarGroup,
  Box,
  Flex,
  Icon,
  Spacer,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
// Custom components
import SampleImage from "assets/img/yubin.webp";
import Card from "components/card/Card.js";
import { useState } from "react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import TestSetDetail from "views/admin/evaluation/components/TestSetDetail";

export default function TestSet(props) {
  const [isOpen, setIsOpen] = useState(false);

  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );

  const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const bgHover = useColorModeValue(
    { bg: "secondaryGray.400" },
    { bg: "whiteAlpha.50" }
  );
  const bgFocus = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.100" }
  );

  return (
    <Card mb={{ base: "0px", "2xl": "10px" }}>
      <Flex align="center" direction={{ base: "column", md: "row" }}>
        <AvatarGroup max={4}>
          <Avatar src={SampleImage} />
          <Avatar src={SampleImage} />

          <Avatar src={SampleImage} />

          <Avatar src={SampleImage} />

          <Avatar src={SampleImage} />

          <Avatar src={SampleImage} />

          <Avatar src={SampleImage} />

          <Avatar src={SampleImage} />

          <Avatar src={SampleImage} />
        </AvatarGroup>
        <Box mt={{ base: "10px", md: "0" }} ml="10px">
          <Text
            color={textColorPrimary}
            fontWeight="500"
            fontSize="md"
            mb="4px"
          >
            Test Set 2023-09-20 0001
          </Text>
          <Text
            fontWeight="500"
            color={textColorSecondary}
            fontSize="sm"
            me="4px"
          >
            Tested Classifier : 3
          </Text>
        </Box>
        <Spacer />
        <Flex>
          <Icon
            as={isOpen ? MdExpandLess : MdExpandMore}
            width="48px"
            height="auto"
            bg={bgButton}
            _hover={bgHover}
            _focus={bgFocus}
            _active={bgFocus}
            borderRadius="8px"
            onClick={() => setIsOpen(!isOpen)}
          />
        </Flex>
      </Flex>
      {isOpen && <TestSetDetail>dd</TestSetDetail>}
    </Card>
  );
}
