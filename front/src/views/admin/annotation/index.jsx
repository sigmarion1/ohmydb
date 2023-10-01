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
import TrainClassifierModal from "views/admin/annotation/components/TrainClassifierModal";
import CreateTestSetModal from "views/admin/annotation/components/CreateTestSetModal";
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
  const {
    isOpen: isTCMOpen,
    onOpen: onTCMOpen,
    onClose: onTCMClose,
  } = useDisclosure();
  const {
    isOpen: isCTSMOpen,
    onOpen: onCTSMOpen,
    onClose: onCTSMClose,
  } = useDisclosure();

  const [selected, setSelected] = useState([]);

  const { list, setTarget, setUrl } = useInfinite();

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
                Selected : {selected.length}
                <Link>
                  <Button margin="10px" onClick={() => setSelected([])}>
                    Unselect All
                  </Button>
                </Link>
              </Text>

              <Flex
                align="center"
                me="20px"
                ms={{ base: "24px", md: "0px" }}
                mt={{ base: "20px", md: "0px" }}
              >
                <Button margin="10px" onClick={onTCMOpen}>
                  Train Classifier
                </Button>
                <Button margin="10px" onClick={onCTSMOpen}>
                  Create Test Set
                </Button>
              </Flex>
            </Flex>
            <SimpleGrid columns={{ base: 1, md: 5 }} gap="20px">
              {list &&
                list.map((data) => (
                  <AnoCardList
                    data={data}
                    selected={selected}
                    setSelected={setSelected}
                  />
                ))}
            </SimpleGrid>

            <Box h="100px" ref={setTarget} />
            <ThreeCircles
              height="100"
              width="100"
              color={textColor}
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="three-circles-rotating"
            />
          </Flex>
        </Flex>
      </Grid>

      <TrainClassifierModal
        selected={selected}
        isTCMOpen={isTCMOpen}
        onTCMClose={onTCMClose}
      />
      <CreateTestSetModal
        selected={selected}
        isCTSMOpen={isCTSMOpen}
        onCTSMClose={onCTSMClose}
      />
    </Box>
  );
}
