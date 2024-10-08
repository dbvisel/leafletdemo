"use client";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

// This looks like it might get us where we need to go: https://maxschmitt.me/posts/react-leaflet-open-popup-programmatically

const MapComponent = ({ data, initialZoom, currentlyOpen, setFocus }) => {
  // console.log(data);
  const dataWithLatsAndLongs = data.filter((d) => d.lat && d.long);
  console.log(
    "Not being shown on the map: ",
    data.filter((x) => !dataWithLatsAndLongs.includes(x))
  );
  const lats = dataWithLatsAndLongs.map((d) => d.lat);
  const longs = dataWithLatsAndLongs.map((d) => d.long);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLong = Math.min(...longs);
  const maxLong = Math.max(...longs);
  // console.log(minLat, maxLat, minLong, maxLong);
  return (
    <div
      style={{
        width: "var(--mapWidth)",
        height: "var(--mapHeight)",
        zIndex: 2,
        position: "relative",
      }}
    >
      <MapContainer
        center={[(minLat + maxLat) / 2, (minLong + maxLong) / 2]}
        zoom={initialZoom}
        scrollWheelZoom={false}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
        />
        {dataWithLatsAndLongs.map((d, index) => {
          const siteReportsUrl = d.siteReportsSlug
            ? `https://epress.nus.edu.sg/sitereports/${d.siteReportsSlug}`
            : null;

          return (
            <Marker
              position={[d.lat, d.long]}
              key={index}
              eventHandlers={{
                click: () => setFocus(d.name),
              }}
            >
              <Popup>
                <strong>{d.name}</strong>
                <br />
                <em>{d.type}</em>
                {siteReportsUrl ? (
                  <>
                    <br />
                    <a href={siteReportsUrl}>{siteReportsUrl}</a>
                  </>
                ) : (
                  ""
                )}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
