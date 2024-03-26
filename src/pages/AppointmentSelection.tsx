import { useServiceContext } from '../context/useServiceContext';

export const AppointmentSelection = () => {
  const { selectedServices } = useServiceContext();
  return (
    <div>
      {selectedServices.map((services) => {
        const service = [...new Array(services.quantity)];
        return (
          <div key={services.id}>
            {service.map((_, index) => (
              <div key={index}>{services.price}</div>
            ))}
          </div>
        );
      })}
    </div>
  );
};
