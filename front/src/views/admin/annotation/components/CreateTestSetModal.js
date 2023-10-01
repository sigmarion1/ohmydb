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
} from "@chakra-ui/react";

import axios from "axios";

import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import { postTestSet } from "utils/api";

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

export default function CreateTestSetModal({
  selected,
  isCTSMOpen,
  onCTSMClose,
}) {
  const textColor = useColorModeValue("navy.700", "white");
  const textColorBid = useColorModeValue("brand.500", "white");

  const [text, setText] = useState("");

  const history = useHistory();

  const trainClassifier = async () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const dateStr = `${year}-${month}-${day}`;

    const name = text ? text : `${dateStr}_test_set_${selected.length}`;

    if (selected.length < 10) {
      alert("Must select more then 10 images");
    } else if (selected.length > 100) {
      alert("You should select no more than 100 images");
    } else {
      try {
        await postTestSet({
          name,
          test_image_ids: selected,
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
    <Modal isOpen={isCTSMOpen} onClose={onCTSMClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create TestSet</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Selected Images : {selected.length}</FormLabel>

            <FormLabel>Test Set name</FormLabel>
            <Input
              color={textColor}
              placeholder="If not entered, it will be generated automatically"
              value={text || ""}
              onChange={handleChange}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button onClick={trainClassifier} colorScheme="blue" mr={3}>
            Create
          </Button>
          <Button onClick={onCTSMClose}>Cancle</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
