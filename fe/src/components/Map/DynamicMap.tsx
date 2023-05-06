import { useEffect } from "react";
import Leaflet from "leaflet";
import * as ReactLeaflet from "react-leaflet";
import "leaflet/dist/leaflet.css";

import styles from "./map.module.css";

const { MapContainer } = ReactLeaflet;

const Map = ({ children, className, width, height, ...rest }: any) => {
  let mapClassName = styles.map;

  if (className) {
    mapClassName = `${mapClassName} ${className}`;
  }

  useEffect(() => {
    (async function init() {
      Leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl: "/marker/greenMarker.svg",
        iconUrl: "/marker/greenMarker.svg",
        shadowUrl: "/marker/greenMarker.svg",
      });
      Leaflet.Polyline.mergeOptions([
        [47.9195184, 106.9355787],
        [47.9245, 106.9219],
      ]);
    })();
  }, []);

  return (
    <MapContainer className={mapClassName} {...rest}>
      {children(ReactLeaflet, Leaflet)}
    </MapContainer>
  );
};

export default Map;
