import {
  Box,
  Button,
  Flex,
  Grid,
  Link,
  SimpleGrid,
  Text,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  ModalContent,
  RadioGroup,
  Radio,
  Stack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import { postClassifier } from "utils/api";

const algorithms = [
  {
    name: "Ball Tree",
    value: "ball_tree",
  },
  {
    name: "K-D Tree",
    value: "kd_tree",
  },
  {
    name: "Brute",
    value: "brute",
  },
];

export default function TrainClassifierModal({
  selected,
  isTCMOpen,
  onTCMClose,
}) {
  const textColor = useColorModeValue("navy.700", "white");
  const textColorBid = useColorModeValue("brand.500", "white");

  const [algorithmValue, setAlgorithmValue] = useState(algorithms[0].value);
  const [text, setText] = useState("");
  const [n, setN] = useState(10);

  const history = useHistory();

  const onAlgorithmChange = (e) => {
    setAlgorithmValue(e.target.value);
  };

  const trainClassifier = async () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const dateStr = `${year}-${month}-${day}`;

    const name = text
      ? text
      : `${dateStr}_${selected.length}_${algorithmValue}`;

    if (selected.length < 10) {
      alert("Must select more then 10 images");
    } else if (selected.length > 100) {
      alert("You should select no more than 100 images");
    } else {
      try {
        await postClassifier({
          name,
          training_image_ids: selected,
          algorithm: algorithmValue,
        });
        alert("Success to request new classifier");
        history.push("/admin/classifier");
      } catch (err) {
        alert("Fail to request new classifier");
      }
    }
  };

  const handleChange = (e) => {
    e.target.value = e.target.value.slice(0, 30);
    setText(e.target.value);
  };

  return (
    <Modal isOpen={isTCMOpen} onClose={onTCMClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Train Classifier</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Selected Images : {selected.length}</FormLabel>

            <FormLabel>Classifier name</FormLabel>
            <Input
              color={textColor}
              placeholder="If not entered, it will be generated automatically"
              value={text || ""}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mt={"10px"}>
            <FormLabel>Algorithm</FormLabel>

            <RadioGroup defaultValue={algorithmValue}>
              <Stack>
                {algorithms.map((algorithm) => (
                  <Radio
                    value={algorithm.value}
                    checked={algorithmValue === algorithm.value}
                    onChange={onAlgorithmChange}
                  >
                    {algorithm.name}
                  </Radio>
                ))}
              </Stack>
            </RadioGroup>
          </FormControl>
          <FormControl mt={"10px"}>
            <FormLabel>N-Neighbors</FormLabel>

            <NumberInput
              onChange={(val) => setN(val)}
              value={n}
              max={100}
              min={1}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button onClick={trainClassifier} colorScheme="blue" mr={3}>
            Train
          </Button>
          <Button onClick={onTCMClose}>Cancle</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
