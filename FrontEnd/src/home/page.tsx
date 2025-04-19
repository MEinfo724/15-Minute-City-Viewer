import React, { useCallback, useState } from "react";
import { Spinner } from "@chakra-ui/react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import InfoCard from "./components/InfoCard/InfoCard";
import { CONTAINER_STYLE, CENTER } from "./constants";

const HomeView: React.FC = () => {
  const [clickedPosition, setClickedPosition] =
    useState<google.maps.LatLngLiteral | null>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_MAPS_KEY as string,
  });

  const handleMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      console.log("Clicked at:", lat, lng);
      setClickedPosition({ lat, lng });
    }
  }, []);

  if (!isLoaded) return <Spinner size="sm" color="blue.solid" />;

  const apiKey = import.meta.env.VITE_MAPS_KEY;
  const mapSrc = `https://www.google.com/maps/embed/v1/view?key=${apiKey}&center=47.1460697,27.5838983&zoom=12`;
  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <iframe
        title="Google Map"
        width="100%"
        height="100%"
        style={{ border: 0, position: "absolute", top: 0, left: 0 }}
        src={mapSrc}
        allowFullScreen
      />
      {/* <GoogleMap
        mapContainerStyle={CONTAINER_STYLE}
        center={CENTER}
        zoom={12}
        onClick={handleMapClick}
      >
        {clickedPosition && <Marker position={clickedPosition} />}
      </GoogleMap> */}

      <InfoCard />
    </div>
  );
};

export default HomeView;
