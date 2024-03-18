import mapboxgl from 'mapbox-gl';
import { useEffect, useRef, useState } from 'react';
import addSearchControl from '../utilities/addSearchControl';

mapboxgl.accessToken = import.meta.env.VITE_API_KEY as string;

type MapStateProps = {
  lng: number;
  lat: number;
  zoom: number;
};

export const useMapbox = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const geocoderRef = useRef(null); // Adjust this type as per the geocoder library you are using
  const [mapState, setMapState] = useState<MapStateProps>({
    lng: 0,
    lat: 0,
    zoom: 10,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setMapState({
          lng: position.coords.longitude,
          lat: position.coords.latitude,
          zoom: 10, // Adjust the zoom level as needed
        });
      },
      (error) => {
        console.error('Error getting current location:', error);
        // If user denies location access or an error occurs, fallback to default location
        setMapState({
          lng: -80.5801,
          lat: 35.4091,
          zoom: 11,
        });
      }
    );
  }, []);

  useEffect(() => {
    if (mapRef.current) return; // Ensure map is not already initialized
    if (!mapContainerRef.current) return; // Ensure the div is available

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [mapState.lng, mapState.lat],
      zoom: mapState.zoom,
    });

    map.on('move', () => {
      setMapState({
        lng: parseFloat(map.getCenter().lng.toFixed(4)),
        lat: parseFloat(map.getCenter().lat.toFixed(4)),
        zoom: parseFloat(map.getZoom().toFixed(2)),
      });
    });

    map.on('load', () => {
      if (!geocoderRef.current) {
        addSearchControl({
          map,
          mapBoxAccessToken: mapboxgl.accessToken,
          geocoderRef,
        });
      }
    });

    mapRef.current = map;

    return () => {
      // Cleanup when component unmounts
      map.remove();
    };
  }, [mapState]);

  return mapContainerRef;
};
