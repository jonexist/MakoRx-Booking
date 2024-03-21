import { ReactNode, createContext, useState } from 'react';
import { services } from '../data/pharmacyServices';

type ServiceProviderProps = {
  children: ReactNode;
};

type ServiceItem = {
  id: number;
  quantity: number;
  selected: boolean;
  title: string;
  description: string;
  price: number;
};

type ServiceContext = {
  serviceItem: ServiceItem[];
  serviceQuantity: number;
  getItemQuantity: (id: number) => number;
  increaseItemQuantity: (id: number) => void;
  decreaseItemQuantity: (id: number) => void;
  toggleServiceSelection: (id: number) => void;
};

export const ServiceContext = createContext({} as ServiceContext);

export const ServiceProvider = ({ children }: ServiceProviderProps) => {
  const initialServiceItems = services.map((service) => ({
    id: service.id,
    quantity: 0,
    selected: false,
    title: service.title,
    description: service.description,
    price: service.price,
  }));

  const [serviceItem, setServiceItem] =
    useState<ServiceItem[]>(initialServiceItems);

  const getItemQuantity = (id: number) => {
    const item = serviceItem.find((service) => service.id === id);
    return item ? item.quantity : 0;
  };

  const increaseItemQuantity = (id: number) => {
    setServiceItem((prev) =>
      prev.map((service) =>
        service.id === id
          ? { ...service, quantity: service.quantity + 1 }
          : service
      )
    );
  };

  const decreaseItemQuantity = (id: number) => {
    setServiceItem((prev) =>
      prev.map((service) =>
        service.id === id
          ? {
              ...service,
              quantity: service.quantity - 1,
              selected: service.quantity > 1 ? true : false,
            }
          : service
      )
    );
  };

  const toggleServiceSelection = (id: number) => {
    setServiceItem((prev) =>
      prev.map((service) =>
        service.id === id
          ? {
              ...service,
              selected: !service.selected,
              quantity: service.selected ? 0 : 1,
            }
          : service
      )
    );
  };

  return (
    <ServiceContext.Provider
      value={{
        serviceItem,
        serviceQuantity: serviceItem.reduce(
          (acc, service) => acc + service.quantity,
          0
        ),
        getItemQuantity,
        increaseItemQuantity,
        decreaseItemQuantity,
        toggleServiceSelection,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};
