// Chakra imports
import {
  Button,
  Badge,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Spacer,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
// Assets
// Custom components

import SampleImage from "assets/img/yubin.webp";

import useImageResults from "hooks/useImageResults";
import { getFullImageUrl } from "variables";

export default function ImageResultModalItem({ imageResult }) {
  const { image, expected_member, result_member } = imageResult;

  const isAnswer = expected_member === result_member ? true : false;
  const image_url = getFullImageUrl(image.thumbnail_url);

  return (
    <Image
      style={{
        borderStyle: "solid",
        borderWidth: "10px",
        borderColor: isAnswer ? "green" : "red",
      }}
      maxH={"100%"}
      maxW={"100%"}
      src={image_url}
    />
  );
}
