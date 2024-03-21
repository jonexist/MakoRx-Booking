import { useContext } from 'react';
import { ServiceContext } from './ServiceContext';

export const useServiceContext = () => useContext(ServiceContext);
