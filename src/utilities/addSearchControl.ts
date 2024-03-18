import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import mapboxgl from 'mapbox-gl';
import React from 'react';

type SearchControlProps = {
  map: mapboxgl.Map;
  mapBoxAccessToken: string;
  geocoderRef: React.MutableRefObject<MapboxGeocoder | null>;
};

const addSearchControl = ({
  map,
  mapBoxAccessToken,
  geocoderRef,
}: SearchControlProps) => {
  const geocoder = new MapboxGeocoder({
    accessToken: mapBoxAccessToken,
    mapboxgl: mapboxgl,
    marker: true,
  });

  map.addControl(geocoder);
  geocoderRef.current = geocoder;
};

export default addSearchControl;
