import React from "react";
import { Stack, Button, Text } from "@chakra-ui/react";
import { CARD_TEXT } from "./constants";

interface InfoCardProps {
  clickedPosition: google.maps.LatLngLiteral | null;
  onIsochroneFetch: (polygon: google.maps.LatLngLiteral[]) => void;
}

const InfoCard: React.FC<InfoCardProps> = ({
  clickedPosition,
  onIsochroneFetch,
}) => {
  const isochoneKey = import.meta.env.VITE_OPENROUSE_KEY;

  const fetchIsochrone = async (
    lat: number | undefined,
    lng: number | undefined
  ) => {
    const response = await fetch(
      "https://api.openrouteservice.org/v2/isochrones/foot-walking",
      {
        method: "POST",
        headers: {
          Authorization: isochoneKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          locations: [[lng, lat]],
          range: [900], // 15 min = 900 seconds
        }),
      }
    );

    const data = await response.json();
    console.log(data);
    // return data.features[0].geometry; // a GeoJSON polygon
  };

  const handleClick = async () => {
    // await fetchIsochrone(clickedPosition?.lat, clickedPosition?.lng);
    const data = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {
            group_index: 0,
            value: 900,
            center: [27.57944242004834, 47.13646686826907],
          },
          geometry: {
            coordinates: [
              [
                [27.567035, 47.138174],
                [27.567147, 47.136109],
                [27.567401, 47.133322],
                [27.567587, 47.132825],
                [27.56832, 47.13106],
                [27.569296, 47.12954],
                [27.56959, 47.129334],
                [27.571519, 47.129431],
                [27.57265, 47.129494],
                [27.577676, 47.127767],
                [27.578041, 47.126586],
                [27.578385, 47.126692],
                [27.582724, 47.130281],
                [27.583608, 47.129962],
                [27.584562, 47.130399],
                [27.590214, 47.131685],
                [27.593534, 47.136176],
                [27.593499, 47.136534],
                [27.592461, 47.139103],
                [27.588348, 47.141527],
                [27.583755, 47.145312],
                [27.582704, 47.145914],
                [27.581907, 47.145852],
                [27.580906, 47.145668],
                [27.579547, 47.145388],
                [27.574131, 47.145194],
                [27.573778, 47.14512],
                [27.570933, 47.14388],
                [27.568663, 47.140728],
                [27.568451, 47.140437],
                [27.567101, 47.138528],
                [27.567035, 47.138174],
              ],
            ],
            type: "Polygon",
          },
        },
      ],
      bbox: [27.567035, 47.126586, 27.593534, 47.145914],
      metadata: {
        attribution: "openrouteservice.org | OpenStreetMap contributors",
        service: "isochrones",
        timestamp: 1745152736621,
        query: {
          profile: "foot-walking",
          profileName: "foot-walking",
          locations: [[27.579338297059824, 47.13652217906399]],
          range: [900],
        },
        engine: {
          version: "9.1.2",
          build_date: "2025-04-10T21:25:30Z",
          graph_date: "2025-04-09T17:01:59Z",
        },
      },
    };
    const coords = data.features[0].geometry.coordinates[0];
    const googleLatLng = coords.map(([lng, lat]: number[]) => ({ lat, lng }));
    onIsochroneFetch(googleLatLng);
    console.log(googleLatLng);
  };
  return (
    <Stack
      direction="column"
      p={4}
      position="absolute"
      top="10px"
      left="10px"
      bg="whiteAlpha.800"
      backdropFilter="blur(4px)"
      borderRadius="md"
      boxShadow="md"
      zIndex={10}
      width="800px"
      align="center"
    >
      <Text fontWeight="bold">{CARD_TEXT.title}</Text>
      {clickedPosition && (
        <Stack direction="column">
          {clickedPosition?.lat + clickedPosition?.lng}
        </Stack>
      )}
      <Button colorScheme="blue" width="100%" onClick={handleClick}>
        {CARD_TEXT.button}
      </Button>
    </Stack>
  );
};

export default InfoCard;
