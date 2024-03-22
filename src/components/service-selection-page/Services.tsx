import { Card, CardText, CardTitle, Form } from 'react-bootstrap';
import { useServiceContext } from '../../context/useServiceContext';
import { TPharmacyDataProps, TServiceType } from '../../type';

type TServiceCardProps = {
  data: TPharmacyDataProps & { service: TServiceType };
};

export const Service = ({ data }: TServiceCardProps) => {
  const {
    getItemQuantity,
    increaseItemQuantity,
    decreaseItemQuantity,
    toggleServiceSelection,
    serviceItem,
  } = useServiceContext();
  const service = data.service;
  const isSelected = serviceItem.find(
    (item) => item.id === service.id
  )?.selected;

  return (
    <>
      <Card key={service.id}>
        <Card.Body>
          <div className='d-flex align-items-center justify-content-between'>
            <CardTitle>{service.title}</CardTitle>
            <CardText>{`$${service.price}`}</CardText>
          </div>
          <CardText className='text-truncate'>{service.description}</CardText>
          <div
            className={
              isSelected
                ? `d-flex justify-content-between`
                : `d-flex justify-content-end`
            }
          >
            {isSelected && (
              <div className='counter'>
                <button
                  onClick={() => decreaseItemQuantity(service.id)}
                  className='counter__btn'
                  disabled={!isSelected}
                >
                  &#8722;
                </button>
                <span className='counter__display'>
                  {getItemQuantity(service.id)}
                </span>
                <button
                  onClick={() => increaseItemQuantity(service.id)}
                  className='counter__btn'
                  disabled={!isSelected}
                >
                  &#43;
                </button>
              </div>
            )}

            <Form.Check
              inline
              label='Select'
              className='user-select-none'
              id='select'
              type='checkbox'
              onChange={() => toggleServiceSelection(service.id)}
              checked={isSelected}
            />
          </div>
        </Card.Body>
      </Card>
    </>
  );
};
