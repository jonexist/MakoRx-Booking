import { ReactNode, createContext, useState } from 'react';
import { pharmacyServices } from '../data/pharmacyServices';
import { TServiceItem } from '../type';

type TServiceProviderProps = {
  children: ReactNode;
};

type TServiceContext = {
  serviceItem: TServiceItem[];
  serviceQuantity: number;
  getItemQuantity: (id: number) => number;
  increaseItemQuantity: (id: number) => void;
  decreaseItemQuantity: (id: number) => void;
  toggleServiceSelection: (id: number) => void;
};

export const ServiceContext = createContext({} as TServiceContext);

export const ServiceProvider = ({ children }: TServiceProviderProps) => {
  const initialServiceItems = pharmacyServices.map((service) => ({
    id: service.id,
    quantity: 0,
    selected: false,
    title: service.title,
    description: service.description,
    price: service.price,
  }));

  const [serviceItem, setServiceItem] =
    useState<TServiceItem[]>(initialServiceItems);

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
