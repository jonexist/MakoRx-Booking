import { Map, Marker } from 'mapbox-gl';
import { MutableRefObject } from 'react';
import { TEndpointProps, TPharmacyDataProps } from '../type';
import { addPopupToMarker } from '../utilities/addPopupToMarker';

type TPharmacyProps = {
  map: Map;
  pharmacyData: TPharmacyDataProps;
  markerRef: {
    current: Marker[];
  };
};

type TGetPharmacyProps = {
  mapRef: React.MutableRefObject<Map | null>;
  locationCoords: [number, number];
  token: string;
  markersRef: MutableRefObject<Marker[]>;
  abortController: AbortController;
};

const pharmacyEndpoint = ({ placeType, lng, lat, token }: TEndpointProps) =>
  `https://api.mapbox.com/geocoding/v5/mapbox.places/${placeType}.json?proximity=${lng},${lat}&access_token=${token}`;

const processPharmacyData = ({
  map,
  pharmacyData,
  markerRef,
}: TPharmacyProps) => {
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
}: TGetPharmacyProps) => {
  const [lng, lat] = locationCoords;
  const placeType = 'pharmacy';
  const endpoint = pharmacyEndpoint({ placeType, lng, lat, token });
  markersRef.current.forEach((marker) => marker.remove());
  markersRef.current = [];

  try {
    const response = await fetch(endpoint, { signal: abortController.signal });
    const data = await response.json();
    data.features.forEach((pharmacyData: TPharmacyDataProps) => {
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
