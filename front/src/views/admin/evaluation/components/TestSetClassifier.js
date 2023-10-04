// Chakra imports
import {
  Button,
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
import ImageResultModal from "views/admin/evaluation/components/ImageResultModal";

export default function TestSetClassifier({ testRecord }) {
  const {
    id = 0,
    classifier_id = 0,
    test_status = "",
    answer_rate,
  } = testRecord;
  const { isOpen, onOpen, onClose } = useDisclosure();

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
    <Flex align="center" onClick={onOpen}>
      <Text color={textColorPrimary} fontSize="sm" fontWeight="700">
        Classifier ID: {classifier_id} / status : {test_status} [Click to View]
      </Text>
      <Spacer />

      <Text color={textColorSecondary} fontSize="sm" fontWeight="700" mr="10px">
        {answer_rate ? " result : " + answer_rate.toFixed(2) + "%" : ""}
      </Text>

      <ImageResultModal isOpen={isOpen} onClose={onClose} testRecordId={id} />
    </Flex>
  );
}
