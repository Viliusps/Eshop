import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import React, { useState, useRef, useCallback } from 'react';
// eslint-disable-next-line no-undef
const API_KEY = process.env.REACT_APP_API_KEY;

export default function Map(data) {
  const locations = data.data;
  const mapRef = useRef(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY
  });

  const onLoad = useCallback(
    (mapInstance) => {
      const bounds = new window.google.maps.LatLngBounds();
      locations.forEach((location) => {
        bounds.extend(
          new window.google.maps.LatLng(Number(location.lattitude), Number(location.longitude))
        );
      });
      mapRef.current = mapInstance;
      mapInstance.fitBounds(bounds);
    },
    [locations]
  );

  const onClickMarker = (locationId) => {
    setSelectedLocation(locations.find((location) => location.id === locationId));
  };

  return (
    <div
      style={{
        height: '90vh',
        width: '90%',
        display: 'inline-block',
        position: 'relative',
        textAlign: 'center'
      }}>
      {isLoaded ? (
        <>
          <GoogleMap
            mapContainerClassName="c-location-overview__map"
            mapContainerStyle={data.style}
            onLoad={onLoad}>
            {locations.map((location) => (
              <Marker
                key={location.id}
                onClick={() => onClickMarker(location.id)}
                position={{
                  lat: Number(location.lattitude),
                  lng: Number(location.longitude)
                }}
              />
            ))}
            {selectedLocation ? (
              <InfoWindow
                position={{
                  lat: Number(selectedLocation.lattitude),
                  lng: Number(selectedLocation.longitude)
                }}
                onCloseClick={() => setSelectedLocation(null)}>
                <>
                  <h3>{selectedLocation.company}</h3>
                  <p>{selectedLocation.address}</p>
                </>
              </InfoWindow>
            ) : null}
          </GoogleMap>
        </>
      ) : null}
    </div>
  );
}
