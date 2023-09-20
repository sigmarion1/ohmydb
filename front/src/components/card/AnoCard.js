// Chakra imports
import {
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Radio,
  RadioGroup,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import SampleImage from "assets/img/yubin.webp";
import Card from "components/card/Card.js";
// Assets
import { useState } from "react";
import { IoCheckmark } from "react-icons/io5";

export default function AnoCard(props) {
  const { image, name, author, bidders, download, currentbid } = props;
  const [like, setLike] = useState(false);
  const textColor = useColorModeValue("navy.700", "white");
  const textColorBid = useColorModeValue("brand.500", "white");
  return (
    <Card p="20px">
      <Flex direction={{ base: "column" }} justify="center">
        <Box mb={{ base: "20px", "2xl": "20px" }} position="relative">
          <Image
            src={SampleImage}
            w={{ base: "100%", "3xl": "100%" }}
            h={{ base: "100%", "3xl": "100%" }}
            borderRadius="20px"
          />
          <Button
            position="absolute"
            bg="white"
            _hover={{ bg: "whiteAlpha.900" }}
            _active={{ bg: "white" }}
            _focus={{ bg: "white" }}
            p="0px !important"
            top="14px"
            right="14px"
            borderRadius="50%"
            minW="36px"
            h="36px"
            onClick={() => {
              setLike(!like);
            }}
          >
            <Icon
              transition="0.2s linear"
              w="20px"
              h="20px"
              as={IoCheckmark}
              color="brand.500"
            />
          </Button>
        </Box>
        <Flex flexDirection="column" justify="space-between" h="100%">
          <Flex
            align="start"
            justify="space-between"
            direction={{
              base: "row",
              md: "column",
              lg: "row",
              xl: "column",
              "2xl": "row",
            }}
          >
            <RadioGroup defaultValue="unknown">
              <Radio value="arin" m="5px">
                Arin
              </Radio>
              <Radio value="mimi" m="5px">
                Mimi
              </Radio>

              <Radio value="yooa" m="5px">
                Yooa
              </Radio>

              <Radio value="yubin" m="5px">
                Yubin
              </Radio>

              <Radio value="hyojung" m="5px">
                Hyojung
              </Radio>

              <Radio value="seunghee" m="5px">
                Seunghee
              </Radio>
              <Radio value="unknown" m="5px">
                Unknown
              </Radio>
            </RadioGroup>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}
