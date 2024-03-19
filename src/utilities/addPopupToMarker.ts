import { Map, Marker, Popup } from 'mapbox-gl';
import { addPopupEvent } from './addPopupEvent';

type PopupProps = {
  map: Map;
  marker: Marker;
  popupText: string;
};

export const addPopupToMarker = ({ map, marker, popupText }: PopupProps) => {
  const popup = new Popup({ offset: 25 }).setText(popupText);

  marker.setPopup(popup);

  addPopupEvent({ map, marker, popup });
};
