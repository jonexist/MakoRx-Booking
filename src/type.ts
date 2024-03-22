export type TEndpointProps = {
  placeType: string;
  token: string;
  lng: number;
  lat: number;
};

export type TServiceType = {
  id: number;
  title: string;
  description: string;
  price: number;
};

export type TPharmacyDataProps = {
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
  services: TServiceType[];
  service?: TServiceType;
};

export type TTitleSubtitleProps = {
  title: string;
  subtitle?: string;
  hasHr?: boolean;
};

export type TService = {
  id: number;
  title: string;
  price: number;
  quantity: number;
};

export type TTotalCardProps = {
  services: TService[];
  total: number;
};

export type TServiceItem = {
  id: number;
  quantity: number;
  selected: boolean;
  title: string;
  description: string;
  price: number;
};

export type TMapStateProps = {
  lng: number;
  lat: number;
  zoom?: number;
};
