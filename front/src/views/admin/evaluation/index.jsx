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
  );
}
