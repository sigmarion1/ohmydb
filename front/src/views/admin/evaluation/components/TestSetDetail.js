// Chakra imports
import {
  Button,
  FormControl,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  SimpleGrid,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
// Assets
// Custom components
import Card from "components/card/Card.js";

import TestSetClassifier from "views/admin/evaluation/components/TestSetClassifier";
import useTestRecords from "hooks/useTestRecords";

export default function TestSetDetail({ testSetId }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { testRecords } = useTestRecords(testSetId);

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
    <Card>
      <SimpleGrid column={1} spacing="5px">
        {testRecords &&
          testRecords.map((testRecord) => (
            <TestSetClassifier testRecord={testRecord} />
          ))}

        <Button mt="10px" onClick={onOpen}>
          Test Other Classifier
        </Button>
      </SimpleGrid>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select classifier</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Select placeholder="Select classifier">
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Evaluate
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  );
}
