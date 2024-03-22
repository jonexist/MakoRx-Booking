import { ReactNode, createContext, useState } from 'react';
import { pharmacyServices } from '../data/pharmacyServices';
import { TServiceItem } from '../type';

type TServiceProviderProps = {
  children: ReactNode;
};

type TServiceContext = {
  serviceItem: TServiceItem[];
  getItemQuantity: (id: number) => number;
  increaseItemQuantity: (id: number) => void;
  decreaseItemQuantity: (id: number) => void;
  toggleServiceSelection: (id: number) => void;
  selectedServices: TServiceItem[];
  total: number;
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
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseItemQuantity = (id: number) => {
    setServiceItem((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity - 1,
              selected: item.quantity > 1 ? true : false,
            }
          : item
      )
    );
  };

  const toggleServiceSelection = (id: number) => {
    setServiceItem((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              selected: !item.selected,
              quantity: item.selected ? 0 : 1,
            }
          : item
      )
    );
  };

  const selectedServices = serviceItem.filter((item) => item.selected);
  const total = selectedServices.reduce(
    (prevValue, currValue) => prevValue + currValue.price * currValue.quantity,
    0
  );

  return (
    <ServiceContext.Provider
      value={{
        serviceItem,
        getItemQuantity,
        increaseItemQuantity,
        decreaseItemQuantity,
        toggleServiceSelection,
        selectedServices,
        total,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};
