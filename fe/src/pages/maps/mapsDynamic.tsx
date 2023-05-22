import React from "react";
import { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import Map from "@/components/Map/DynamicMap";
import Spinner from "@/components/Spinner";
import L from "leaflet";
import Menus from "@/components/Menus";

function Maps() {
  const [currentLoc, setCurrentLoc] = useState([45.2332, 107.4345]);
  const [isLoading, setIsLoading] = useState(true);
  const [locations, setLocations] = useState([]);
  const [nearestLocation, setNearestLocation] = useState({});

  const currentLocationIcon = new L.Icon({
    iconUrl: "/marker/redMarker.svg",
    iconRetinaUrl: "/marker/redMarker.svg",
    popupAnchor: [-0, -0],
    iconSize: [50, 50],
  });

  useEffect(() => {
    fetchLocations();
    getMyLocation();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      findNearestLocation();
    }, 1);
  }, [currentLoc]);

  function getMyLocation() {
    if (typeof window != "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLoc([position.coords.latitude, position.coords.longitude]);
          setIsLoading(false);
        },
        (error) => {
          console.error("aldaaa", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }
  async function findNearestLocation() {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/crawlers/findnearest?lat=${currentLoc[0]}&long=${currentLoc[1]}`
    );
    const data = await res.data;
    setNearestLocation(data);
  }

  async function fetchLocations() {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/crawlers`);
    const data = await res.data;
    setLocations(data);
  }

  return !isLoading && typeof window !== "undefined" ? (
    <div className="flex relative">
      <Menus menus={locations} nearestLocation={nearestLocation} />
      <Map width="800" height="400" center={currentLoc} zoom={12}>
        {({ TileLayer, Marker, Popup, Polyline }: any) => (
          <>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={currentLoc} icon={currentLocationIcon}>
              <Popup>
                <h1>Одоогийн таны байршил :D</h1>
              </Popup>
            </Marker>
            {locations.map((loc: any, idx: number) => {
              return (
                <Marker
                  position={[
                    loc.location.coordinates[1],
                    loc.location.coordinates[0],
                  ]}
                  key={idx}
                >
                  <Popup>
                    {/* <Image
                      src={"https://back.emonos.mn/" + loc.photo}
                      alt="zurag"
                      width={300}
                      height={250}
                    /> */}
                    <h1 className="title">{loc.name}</h1>
                    <p>Онгойх цаг: {loc.working_hours_start}</p>
                    <p>Хаах цаг: {loc.working_hours_end}</p>
                    <p>{loc.address}</p>
                  </Popup>
                </Marker>
              );
            })}
            {nearestLocation && (
              <Polyline
                positions={[
                  currentLoc,
                  [
                    nearestLocation?.location?.coordinates[1],
                    nearestLocation?.location?.coordinates[0],
                  ],
                ]}
              />
            )}
          </>
        )}
      </Map>
    </div>
  ) : (
    <Spinner />
  );
}

export default Maps;
