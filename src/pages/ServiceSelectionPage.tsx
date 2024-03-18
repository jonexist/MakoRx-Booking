import mapboxgl from 'mapbox-gl';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Container } from 'react-bootstrap';
import { TitleSubtitle } from '../components/service-selection-page/TitleSubtitle';
import addSearchControl from '../utilities/addSearchControl';

type MapStateProps = {
  lng: number;
  lat: number;
  zoom: number;
};

mapboxgl.accessToken = import.meta.env.VITE_API_KEY as string;

export const ServiceSelectionPage = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const geocoderRef = useRef(null);
  const [mapState, setMapState] = useState<MapStateProps>({
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
        zoom: parseFloat(map.getZoom().toFixed(2)),
      });
    });
    mapRef.current = map;
  }, [mapState, locationProximity]);

  useEffect(() => {
    // If the map is not initialized yet, exit early
    if (!mapRef.current) return;

    const map = mapRef.current;
    // Once the map has loaded, add the search and geolocate controls if they haven't been added yet
    map.on('load', () => {
      if (!geocoderRef.current) {
        addSearchControl({
          map,
          mapBoxAccessToken: mapboxgl.accessToken,
          geocoderRef,
        });
      }
    });
  }, []);

  return (
    <Container className='mt-4'>
      <TitleSubtitle
        title='Book an Appointment'
        subtitle='Book your pharmacy visit - MAKO Rx Care Connect works together to provide you special services and testing.'
      />
      <div
        ref={mapContainerRef}
        className='map-container'
        style={{ width: '100%', height: '400px' }}
      />
    </Container>
  );
};
