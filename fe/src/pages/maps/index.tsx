import React from "react";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import Map from "@/components/Map/DynamicMap";
import Spinner from "@/components/Spinner";

function Maps() {
  const [currentLoc, setCurrentLoc] = useState<[number, number]>([
    45.65, 106.644,
  ]);
  const [isLoading, setIsLoading] = useState(true);

  const getMyLocation = () => {
    if (typeof window !== undefined && navigator.geolocation) {
      console.log("iishee orson..");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLoc([position.coords.latitude, position.coords.longitude]);
          setIsLoading(false);
          console.log(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };
  useEffect(() => {
    setTimeout(getMyLocation, 2);
  }, []);

  return !isLoading ? (
    <div>
      <Map width="800" height="400" center={currentLoc} zoom={12}>
        {({ TileLayer, Marker, Popup }: any) => (
          <>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={currentLoc}>
              <Popup>
                <h1>Current location</h1>
              </Popup>
            </Marker>
          </>
        )}
      </Map>
    </div>
  ) : (
    <Spinner />
  );
}
export async function getServerSideProps() {
  const res = await axios.get("http://localhost:3000/crawlers");
  const data = await res.data;
  return {
    locations: data,
  };
}

export default Maps;
