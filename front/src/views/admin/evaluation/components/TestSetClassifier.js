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

export default function TestSetClassifier(props) {
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
        Test Model 12941294 (Click to View)
      </Text>
      <Spacer />

      <Text color={textColorSecondary} fontSize="sm" fontWeight="700" mr="10px">
        result : 90%
      </Text>

      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Evaluation Result - Classifier : ewijqfoiewj
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody style={{ display: "grid" }}>
            <SimpleGrid columns={{ base: 1, md: 5 }}>
              <Image
                style={{
                  borderStyle: "solid",
                  borderWidth: "10px",
                  borderColor: "red",
                }}
                maxH={"100%"}
                maxW={"100%"}
                src={SampleImage}
              />
              <Image
                style={{
                  borderStyle: "solid",
                  borderWidth: "10px",
                  borderColor: "red",
                }}
                src={SampleImage}
              />
              <Image
                style={{
                  borderStyle: "solid",
                  borderWidth: "10px",
                  borderColor: "red",
                }}
                src={SampleImage}
              />
              <Image
                style={{
                  borderStyle: "solid",
                  borderWidth: "10px",
                  borderColor: "red",
                }}
                src={SampleImage}
              />
              <Image
                style={{
                  borderStyle: "solid",
                  borderWidth: "10px",
                  borderColor: "red",
                }}
                src={SampleImage}
              />
              <Image
                style={{
                  borderStyle: "solid",
                  borderWidth: "10px",
                  borderColor: "red",
                }}
                src={SampleImage}
              />
              <Image
                style={{
                  borderStyle: "solid",
                  borderWidth: "10px",
                  borderColor: "red",
                }}
                src={SampleImage}
              />
            </SimpleGrid>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
