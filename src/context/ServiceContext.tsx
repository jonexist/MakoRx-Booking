import { ReactNode, createContext, useEffect, useState } from 'react';
import { pharmacyServices } from '../data/pharmacyServices';
import { TPharmacyDataProps, TServiceItem } from '../type';

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
  selectedPharmacy: TPharmacyDataProps | null;
  setSelectedPharmacy: (pharmacy: TPharmacyDataProps | null) => void;
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
  const [selectedServices, setSelectedServices] = useState<TServiceItem[]>([]);
  const [selectedPharmacy, setSelectedPharmacy] =
    useState<TPharmacyDataProps | null>(null);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const updatedSelectedServices = serviceItem.filter((item) => item.selected);
    setSelectedServices(updatedSelectedServices);

    const updatedTotal = updatedSelectedServices.reduce(
      (prevValue, currValue) =>
        prevValue + currValue.price * currValue.quantity,
      0
    );
    setTotal(updatedTotal);
  }, [serviceItem, selectedPharmacy]);

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

  return (
    <ServiceContext.Provider
      value={{
        serviceItem,
        getItemQuantity,
        increaseItemQuantity,
        decreaseItemQuantity,
        toggleServiceSelection,
        selectedServices,
        selectedPharmacy,
        setSelectedPharmacy,
        total,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};
