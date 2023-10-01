import React from "react";
// Chakra imports
import { Button, Flex, Link, Text, useColorModeValue } from "@chakra-ui/react";

// Assets
import banner from "assets/img/nfts/NftBanner1.png";
import AnoCard from "views/admin/annotation/components/AnoCard";
import useImages from "hooks/useImages";

import { ThreeCircles } from "react-loader-spinner";
export default function AnoCardList({ data, selected, setSelected }) {
  const textColor = useColorModeValue("navy.700", "white");
  const images = data?.results;

  // const { images, isLoading, isError } = useImages(index);

  return (
    <>
      {images &&
        images.map((image, i) => (
          <AnoCard
            image_data={image}
            selected={selected}
            setSelected={setSelected}
            key={i}
          />
        ))}
    </>
  );
}
