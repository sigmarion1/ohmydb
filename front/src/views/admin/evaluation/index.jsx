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
import { Box, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import TestSet from "views/admin/evaluation/components/TestSet";

// Custom components

import useTestSet from "hooks/useTestSet";
// Assets

export default function Overview() {
  const { testSets } = useTestSet();

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        columns={{ sm: 1, md: 1 }}
        spacing={{ base: "10px", xl: "10px" }}
      >
        {testSets &&
          testSets.map((testSet, i) => <TestSet testSet={testSet} key={i} />)}
      </SimpleGrid>
    </Box>
    // <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
    //   {/* Main Fields */}

    //   <Grid
    //     mb="20px"
    //     templateColumns={{
    //       base: "1fr",
    //       lg: "repeat(2, 1fr)",
    //       "2xl": "1.34fr 1.62fr 1fr",
    //     }}
    //     templateRows={{
    //       base: "1fr",
    //       lg: "repeat(2, 1fr)",
    //       "2xl": "1fr",
    //     }}
    //     gap={{ base: "20px", xl: "20px" }}
    //   >
    //     <Projects
    //       gridArea="1 / 2 / 2 / 2"
    //       banner={banner}
    //       avatar={avatar}
    //       name="Adela Parkson"
    //       job="Product Designer"
    //       posts="17"
    //       followers="9.7k"
    //       following="274"
    //     />
    //   </Grid>
    // </Box>
  );
}
