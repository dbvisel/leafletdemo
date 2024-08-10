"use client";

import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import MapComponent from "@/components/MapComponent";
import { merriweather } from "@/app/fonts";

// TODO: make it so you can click on the list and focus the map.

const Entry = ({ data, currentlyOpen, setFocus }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (currentlyOpen === data.name) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [currentlyOpen, data.name]);

  const onToggle = (event) => {
    event.preventDefault();
    setFocus(data.name);
  };

  const isOnMap = !(data.lat && data.long);
  const siteReportsUrl = data.siteReportsSlug
    ? `https://epress.nus.edu.sg/sitereports/${data.siteReportsSlug}`
    : null;

  return (
    <details className={styles.entry} open={open} onClick={onToggle}>
      <summary>
        <strong className={isOnMap ? styles.notOnMap : ""}>{data.name}</strong>
      </summary>
      {isOnMap && (
        <p>
          <em>Not shown on map</em>
        </p>
      )}
      {siteReportsUrl ? (
        <p>
          <a href={siteReportsUrl}>{siteReportsUrl}</a>
        </p>
      ) : (
        "Not in Site Reports"
      )}
      <p>
        <em>{data.type}</em>
      </p>
      {data.locationNotes !== "" && (
        <p>
          <strong>Location notes:</strong> {data.locationNotes}
        </p>
      )}
      {data.elevation !== "" && (
        <p>
          <strong>Elevation:</strong> {data.elevation}m
        </p>
      )}
      {data.lastExcavationEnded && (
        <p>
          <strong>Last excavation ended:</strong> {data.lastExcavationEnded}
        </p>
      )}
      {data.approximateStartDate && (
        <p>
          <strong>Approximate start date:</strong> {data.approximateStartDate}
        </p>
      )}
      {data.approximateEndDate && (
        <p>
          <strong>Approximate end date:</strong> {data.approximateEndDate}
        </p>
      )}
      {data.notes && (
        <p className={merriweather.className}>
          <strong>Notes:</strong> {data.notes}
        </p>
      )}
      {data.citations && (
        <p>
          <strong>Citations:</strong> {data.citations}
        </p>
      )}
    </details>
  );
};

const MapBox = ({ title, data, initialZoom }) => {
  const [currentlyOpen, setCurrentlyOpen] = useState(null);

  const setFocus = (name) => {
    setCurrentlyOpen(name);
  };

  return (
    <section className={styles.mapDiv}>
      <h2>{title}:</h2>
      <div>
        <MapComponent
          data={data}
          initialZoom={initialZoom}
          setFocus={setFocus}
          currentlyOpen={currentlyOpen}
        />
        <div className={styles.textDiv}>
          {data.map((d, index) => (
            <Entry
              data={d}
              key={`${title}_${index}`}
              currentlyOpen={currentlyOpen}
              setFocus={setFocus}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MapBox;
