import { Map, Marker } from 'mapbox-gl';
import { MutableRefObject } from 'react';
import { addPopupToMarker } from '../utilities/addPopupToMarker';

type EndpointProps = {
  placeType: string;
  token: string;
  lng: number;
  lat: number;
};

export interface ServiceType {
  id: number;
  title: string;
  description: string;
  price: number;
}

export interface PharmacyDataProps {
  id: string;
  place_name: string;
  text: string;
  geometry: {
    coordinates: [number, number];
  };
  properties: {
    address: string;
    category: string;
    foursquare: string;
    landmark: boolean;
    maki: string;
  };
  services: ServiceType[];
  service?: ServiceType;
}

type PharmacyProps = {
  map: Map;
  pharmacyData: PharmacyDataProps;
  markerRef: {
    current: Marker[];
  };
};

type GetPharmacyProps = {
  mapRef: React.MutableRefObject<Map | null>;
  locationCoords: [number, number];
  token: string;
  markersRef: MutableRefObject<Marker[]>;
  abortController: AbortController;
};

const pharmacyEndpoint = ({ placeType, lng, lat, token }: EndpointProps) =>
  `https://api.mapbox.com/geocoding/v5/mapbox.places/${placeType}.json?proximity=${lng},${lat}&access_token=${token}`;

const processPharmacyData = ({
  map,
  pharmacyData,
  markerRef,
}: PharmacyProps) => {
  const { coordinates } = pharmacyData.geometry;

  const marker = new Marker().setLngLat(coordinates).addTo(map);

  markerRef.current.push(marker);

  addPopupToMarker({
    map,
    marker,
    popupText: `<small>${pharmacyData.properties.category.toUpperCase()}</small><br><strong>${
      pharmacyData.text
    }</strong><br><small>${pharmacyData.place_name}</small>`,
  });
};

const getPharmacy = async ({
  mapRef,
  locationCoords,
  token,
  markersRef,
  abortController,
}: GetPharmacyProps) => {
  const [lng, lat] = locationCoords;
  const placeType = 'pharmacy';
  const endpoint = pharmacyEndpoint({ placeType, lng, lat, token });
  markersRef.current.forEach((marker) => marker.remove());
  markersRef.current = [];

  try {
    const response = await fetch(endpoint, { signal: abortController.signal });
    const data = await response.json();
    data.features.forEach((pharmacyData: PharmacyDataProps) => {
      processPharmacyData({
        map: mapRef.current!,
        pharmacyData,
        markerRef: markersRef,
      });
    });
    return data.features;
  } catch (error: unknown) {
    if (error instanceof Error && error.name === 'AbortError') {
      console.log('Fetch aborted');
    } else {
      console.error('Error fetching pharmacy data:', error);
    }
  }
};

export default getPharmacy;
