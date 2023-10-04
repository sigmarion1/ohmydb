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
import useClassifier from "hooks/useClassifier";
import { postTestRecord } from "utils/api";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
export default function TestSetDetail({ testSetId }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { testRecords } = useTestRecords(testSetId);
  const { classifiers } = useClassifier();
  const [selected, setSelected] = useState("");
  const history = useHistory();

  const handleSelect = (e) => {
    setSelected(e.target.value);
  };

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
  let notTestedClassifiers = [];

  if (testRecords !== undefined && classifiers !== undefined) {
    let testedClassifierIds = testRecords?.map(
      (record) => record.classifier_id
    );
    notTestedClassifiers = classifiers.filter(
      (classifier) => !testedClassifierIds.includes(classifier.id)
    );
  }

  const onCreate = async () => {
    if (selected === "") {
      alert("Must select classifier");
    } else {
      try {
        await postTestRecord({
          test_set_id: testSetId,
          classifier_id: selected,
        });
        alert("Success to request new test");
        location.reload();
      } catch (err) {
        alert("Fail to request new test");
      }
    }
  };

  return (
    <Card>
      <SimpleGrid column={1} spacing="5px">
        {testRecords &&
          testRecords.map((testRecord, i) => (
            <TestSetClassifier testRecord={testRecord} key={i} />
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
              <Select onChange={handleSelect} value={selected}>
                {notTestedClassifiers &&
                  notTestedClassifiers.map((classifier, i) => (
                    <option value={classifier.id} key={i}>
                      {classifier.id} - {classifier.name}
                    </option>
                  ))}
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onCreate} colorScheme="blue" mr={3}>
              Evaluate
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  );
}
