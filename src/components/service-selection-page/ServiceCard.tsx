import { useContext } from 'react';
import { Card, CardText, CardTitle, Form } from 'react-bootstrap';
import { PharmacyDataProps, ServiceType } from '../../api/getPharmacy';
import { ServiceContext } from '../../context/ServiceContext';

type ServiceCardProps = {
  data: PharmacyDataProps & { service: ServiceType };
};

export const ServiceCard = ({ data }: ServiceCardProps) => {
  const {
    getItemQuantity,
    increaseItemQuantity,
    decreaseItemQuantity,
    toggleServiceSelection,
  } = useContext(ServiceContext);
  const service = data.service;
  return (
    <>
      <Card key={service.id}>
        <Card.Body>
          <div className='d-flex align-items-center justify-content-between'>
            <CardTitle>{service.title}</CardTitle>
            <CardText>{`$${service.price}`}</CardText>
          </div>
          <CardText className='text-truncate'>{service.description}</CardText>
          <div className='d-flex justify-content-between'>
            <div className='counter'>
              <button
                onClick={() => decreaseItemQuantity(service.id)}
                className='counter-btn'
              >
                &#8722;
              </button>
              <span className='counter-display'>
                {getItemQuantity(service.id)}
              </span>
              <button
                onClick={() => increaseItemQuantity(service.id)}
                className='counter-btn'
              >
                &#43;
              </button>
            </div>

            <Form.Check
              inline
              label='Select'
              className='user-select-none'
              id='select'
              type='checkbox'
              onChange={() => toggleServiceSelection(service.id)}
            />
          </div>
        </Card.Body>
      </Card>
    </>
  );
};