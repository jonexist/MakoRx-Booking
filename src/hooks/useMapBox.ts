import mapboxgl from 'mapbox-gl';
import { useEffect, useRef } from 'react';

mapboxgl.accessToken = import.meta.env.VITE_API_KEY as string;

export const useMapBox = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lng = position.coords.longitude;
        const lat = position.coords.latitude;
        const zoom = 13;

        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
          container: mapContainer.current as HTMLElement,
          style: 'mapbox://styles/mapbox/streets-v12',
          center: [lng, lat],
          zoom: zoom,
        });

        map.current.on('move', () => {
          console.log(
            'Map moved:',
            map.current?.getCenter(),
            map.current?.getZoom()
          );
        });
      },
      (error) => {
        console.error('Error getting user location:', error);
      }
    );

    return () => {
      map.current?.remove();
    };
  }, []);

  return { mapContainer };
};
