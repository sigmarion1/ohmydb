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
import { s3HostUrl } from "variables";

import { memberInfo } from "variables";
import { annotate } from "utils/api";

import axios from "axios";

export default function AnoCard({ image_data, selected, setSelected }) {
  const { id, url, thumbnail_url, annotation } = image_data;
  const [like, setLike] = useState(false);
  const textColor = useColorModeValue("navy.700", "white");
  const textColorBid = useColorModeValue("brand.500", "white");

  const onAnotationChange = (e) => {
    e.preventDefault();

    annotate(id, e.target.value);
  };
  return (
    <Card p="20px">
      <Flex direction={{ base: "column" }} justify="center">
        <Box mb={{ base: "20px", "2xl": "20px" }} position="relative">
          <Image
            src={s3HostUrl + "/" + url}
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
            <RadioGroup defaultValue={annotation}>
              {memberInfo.map((member) => (
                <Radio
                  value={member.value}
                  checked={annotation === member.value}
                  m="5px"
                  onChange={onAnotationChange}
                >
                  {member.name}
                </Radio>
              ))}
            </RadioGroup>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}
