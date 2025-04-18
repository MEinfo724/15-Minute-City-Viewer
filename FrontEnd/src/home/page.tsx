import React, { useCallback, useState } from "react";
import { Spinner } from "@chakra-ui/react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: 47.1460697,
  lng: 27.5838983,
};

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

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
      onClick={handleMapClick}
    >
      {clickedPosition && <Marker position={clickedPosition} />}
    </GoogleMap>
  );
};

export default HomeView;
