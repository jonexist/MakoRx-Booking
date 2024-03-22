import mapboxgl from 'mapbox-gl';
import { useEffect, useMemo, useRef, useState } from 'react';
import getPharmacy from '../api/getPharmacy';
import { TMapStateProps, TPharmacyDataProps } from '../type';
import getUserLocation from '../utilities/addGeolocateControl';
import { addNavigationControl } from '../utilities/addNavigationControl';
import addSearchControl from '../utilities/addSearchControl';

mapboxgl.accessToken = import.meta.env.VITE_API_KEY as string;

export const useMap = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [pharmacyData, setPharmacyData] = useState<TPharmacyDataProps[]>([]);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker[]>([]);
  const geocoderRef = useRef(null);
  const [mapState, setMapState] = useState<TMapStateProps>({
    lng: -80.5801,
    lat: 35.4091,
    zoom: 11,
  });

  const locationProximity = useMemo(
    () => [mapState.lng, mapState.lat],
    [mapState.lat, mapState.lng]
  );

  useEffect(() => {
    if (mapRef.current) return;
    const map = new mapboxgl.Map({
      container: mapContainerRef.current!,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [mapState.lng, mapState.lat],
      zoom: mapState.zoom,
    });
    map.on('move', () => {
      setMapState({
        lng: parseFloat(map.getCenter().lng.toFixed(4)),
        lat: parseFloat(map.getCenter().lat.toFixed(4)),
      });
    });
    mapRef.current = map;
  }, [mapState, locationProximity]);

  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;
    map.on('load', () => {
      if (!geocoderRef.current) {
        addSearchControl({
          map,
          mapBoxAccessToken: mapboxgl.accessToken,
          geocoderRef,
        });
        getUserLocation({ map, geolocateRef: geocoderRef });
        addNavigationControl(map);
      }
    });
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    if (mapRef.current) {
      getPharmacy({
        mapRef: mapRef,
        locationCoords: locationProximity as [number, number],
        token: mapboxgl.accessToken,
        markersRef: markerRef,
        abortController,
      }).then((data) => setPharmacyData(data));
    }
    return () => abortController.abort();
  }, [locationProximity]);

  return { mapContainerRef, pharmacyData };
};
