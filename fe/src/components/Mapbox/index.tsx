import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useRef } from "react";

function Map() {
  const mapContainer = useRef<any>(null);
  return (
    <main>
      <div className="map-container" ref={mapContainer} />
    </main>
  );
}

export default Map;
