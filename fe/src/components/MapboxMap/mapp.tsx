import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "@/components/Spinner";
import Menus from "@/components/Menus";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

function Maps() {
  const [currentLoc, setCurrentLoc] = useState([45.2332, 107.4345]);
  const [isLoading, setIsLoading] = useState(true);
  const [locations, setLocations] = useState([]);
  const [nearestLocation, setNearestLocation] = useState({});
  const [node, setNode] = useState("");
  const mapNode = React.useRef("");

  useEffect(() => {
    fetchLocations();
    getMyLocation();
    setNode(mapNode.current);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setTimeout(async () => {
        findNearestLocation();
        if (mapNode.current != "") {
          const mapboxMap = new mapboxgl.Map({
            container: mapNode.current,
            accessToken:
              "pk.eyJ1IjoibXVuZ3Vuc2hhZ2FpIiwiYSI6ImNsaHUwMjhtNDBnZ3gzdGw5MXhxcGhoOXUifQ.7rdAZiweqotAkzdUXLAl5w",
            style: "mapbox://styles/mapbox/navigation-night-v1",
            center: [currentLoc[1], currentLoc[0]],
            zoom: 15,
          });

          const geojson = await getRoute();

          mapboxMap?.on("load", async () => {
            mapboxMap.addLayer({
              id: "point",
              type: "circle",
              source: {
                type: "geojson",
                data: {
                  type: "FeatureCollection",
                  features: [
                    {
                      type: "Feature",
                      properties: {},
                      geometry: {
                        type: "Point",
                        coordinates: currentLoc,
                      },
                    },
                  ],
                },
              },
              paint: {
                "circle-radius": 10,
                "circle-color": "#3887be",
              },
            });
            // this is where the code from the next step will go
          });

          if (mapboxMap?.getSource("route")) {
            mapboxMap.getSource("route").setData(geojson);
          }
          // otherwise, we'll make a new request
          else {
            mapboxMap?.addLayer({
              id: "route",
              type: "line",
              source: {
                type: "geojson",
                data: geojson,
              },
              layout: {
                "line-join": "round",
                "line-cap": "round",
              },
              paint: {
                "line-color": "red",
                "line-width": 10,
                "line-opacity": 0.75,
              },
            });
          }
          const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
            "<h1>Таны одоогийн байршил</h1>"
          );
          const marker = new mapboxgl.Marker({ color: "red" })
            .setLngLat([currentLoc[1], currentLoc[0]])
            .setPopup(popup)
            .addTo(mapboxMap);

          {
            locations.forEach((loc: any, idx: number) => {
              const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
                `<img
                src="https://back.emonos.mn/${loc.photo}"
                alt="zurag"
                
              />
              <h1 className="title">${loc.name}</h1>
              <p>Онгойх цаг: ${loc.working_hours_start}</p>
              <p>Хаах цаг: ${loc.working_hours_end}</p>
              <p>${loc.address}</p>`
              );
              return new mapboxgl.Marker()
                .setLngLat([
                  loc.location.coordinates[0],
                  loc.location.coordinates[1],
                ])
                .setPopup(popup)
                .addTo(mapboxMap);
            });
          }
        }
      }, 5);
    }
  }, [node, currentLoc]);

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

  async function getRoute() {
    try {
      const query = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/cycling/${currentLoc[1]},${currentLoc[0]};${nearestLocation?.location?.coordinates[0]},${nearestLocation?.location?.coordinates[1]}?steps=true&geometries=geojson&access_token=pk.eyJ1IjoibXVuZ3Vuc2hhZ2FpIiwiYSI6ImNsaHUwMjhtNDBnZ3gzdGw5MXhxcGhoOXUifQ.7rdAZiweqotAkzdUXLAl5w`,
        { method: "GET" }
      );
      const json = await query.json();
      const data = json.routes[0];
      const route = data.geometry.coordinates;
      const geojson = {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: route,
        },
      };
      return geojson;
    } catch (e) {
      console.log("data unshij bna");
    }
  }

  return !isLoading && typeof window !== "undefined" && mapNode ? (
    <div className="flex relative">
      <Menus menus={locations} nearestLocation={nearestLocation} />
      <div ref={mapNode} style={{ width: "100%", height: "100vh" }} />
    </div>
  ) : (
    <Spinner />
  );
}

export default Maps;
