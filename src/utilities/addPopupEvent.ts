import { Map, Marker, Popup } from 'mapbox-gl';

type PopupProps = {
  map: Map;
  marker: Marker;
  popup: Popup;
};

export const addPopupEvent = ({ map, marker, popup }: PopupProps): void => {
  marker.getElement().addEventListener('click', () => {
    popup.setLngLat(marker.getLngLat()).addTo(map);
  });
  marker.getElement().addEventListener('close', () => {
    popup.remove();
  });
};
