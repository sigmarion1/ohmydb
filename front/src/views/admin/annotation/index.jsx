/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2023 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
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

// Custom components
import NFT from "components/card/NFT";

// Assets
import Avatar1 from "assets/img/avatars/avatar1.png";
import Avatar2 from "assets/img/avatars/avatar2.png";
import Avatar3 from "assets/img/avatars/avatar3.png";
import Avatar4 from "assets/img/avatars/avatar4.png";
import Nft1 from "assets/img/nfts/Nft1.png";
import Nft2 from "assets/img/nfts/Nft2.png";
import Nft3 from "assets/img/nfts/Nft3.png";
// import AnoCard from "components/card/AnoCard";
import useImages from "hooks/useImages";
import { useState, useEffect } from "react";

import { useDisclosure } from "@chakra-ui/react";
import AnoCardList from "views/admin/annotation/components/AnoCardList";
import useIntersection from "hooks/useIntersection";
import useFetchInfite from "hooks/useFetchInfiite";
import { ThreeCircles } from "react-loader-spinner";

import Banner from "components/card/Mastercard";

import useInfinite from "hooks/useInfinite";
import { memberInfo } from "variables";

export default function Annotation() {
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [filterValue, setFilterValue] = useState(null);
  const [selected, setSelected] = useState([]);

  const { list, setTarget, setUrl, mutate } = useInfinite();

  const onFilterChange = (e) => {
    setFilterValue(e.target.value);
  };

  const applyFilfter = (apply) => {
    onClose();

    if (apply) {
      setUrl(`/api/images?annotation=${filterValue}`);
    } else {
      setFilterValue(null);
      setUrl("/api/images?");
    }
    mutate();
  };

  useEffect(() => {
    setUrl("/api/images?");
  }, []);

  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      <Grid
        mb="20px"
        gridTemplateColumns={{ xl: "repeat(3, 1fr)", "2xl": "1fr 0.46fr" }}
        gap={{ base: "20px", xl: "20px" }}
        display={{ base: "block", xl: "block" }}
      >
        <Flex
          flexDirection="column"
          gridArea={{ xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2" }}
        >
          <Flex direction="column">
            <Flex
              mt="45px"
              mb="20px"
              justifyContent="space-between"
              direction={{ base: "column", md: "row" }}
              align={{ base: "start", md: "center" }}
            >
              <Text color={textColor} fontSize="2xl" ms="24px" fontWeight="700">
                Selected [0]
                <Link>
                  <Button margin="10px" onClick={() => console.log("unselect")}>
                    Unselect All
                  </Button>
                  {/* {!filterValue && (
                    <Button margin="10px" onClick={() => console.log("unselect")}>
                      Filter : None
                    </Button>
                  )}
                  {filterValue && (
                    <Button colorScheme="pink" margin="10px" onClick={onOpen}>
                      Filter : {filterValue}
                    </Button>
                  )} */}
                  {/* <Button onClick={() => mutate()}>Refresh</Button> */}
                </Link>
              </Text>

              <Flex
                align="center"
                me="20px"
                ms={{ base: "24px", md: "0px" }}
                mt={{ base: "20px", md: "0px" }}
              >
                <Link
                  color={textColorBrand}
                  fontWeight="500"
                  me={{ base: "34px", md: "44px" }}
                  to="#art"
                >
                  Train Classifier
                </Link>
                <Link
                  color={textColorBrand}
                  fontWeight="500"
                  me={{ base: "34px", md: "44px" }}
                  to="#music"
                >
                  Create Test Set
                </Link>
              </Flex>
            </Flex>
            <SimpleGrid columns={{ base: 1, md: 4 }} gap="20px">
              {list &&
                list.map((data) => (
                  <AnoCardList
                    data={data}
                    selected={selected}
                    setSelected={setSelected}
                    muate={mutate}
                  />
                ))}
            </SimpleGrid>
            <Box h="100px" ref={setTarget} />
          </Flex>
        </Flex>
      </Grid>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Apply filter</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <RadioGroup>
                <Stack>
                  {memberInfo.map((member) => (
                    <Radio
                      value={member.value}
                      checked={filterValue === member.value}
                      onChange={onFilterChange}
                    >
                      {member.name}
                    </Radio>
                  ))}
                </Stack>
              </RadioGroup>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={() => applyFilfter(true)}
              colorScheme="blue"
              mr={3}
            >
              Apply
            </Button>
            <Button onClick={() => applyFilfter(false)}>Reset</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
