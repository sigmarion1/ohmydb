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

import useImageResults from "hooks/useImageResults";
import ImageResultModalItem from "views/admin/evaluation/components/ImageResultModalItem";

export default function ImageResultModal({ testRecordId, isOpen, onClose }) {
  const { imageResults } = useImageResults(testRecordId);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody style={{ display: "grid" }}>
          <SimpleGrid columns={{ base: 1, md: 5 }}>
            {imageResults &&
              imageResults.map((imageResult, i) => (
                <ImageResultModalItem imageResult={imageResult} key={i} />
              ))}
          </SimpleGrid>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
