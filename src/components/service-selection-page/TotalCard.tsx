import { Card, CardSubtitle, CardText, CardTitle } from 'react-bootstrap';

type Service = {
  id: number;
  title: string;
  price: number;
  quantity: number;
};

interface TotalCardProps {
  services: Service[];
  total: number;
}

export const TotalCard: React.FC<TotalCardProps> = ({ services, total }) => {
  return (
    <Card>
      <Card.Body>
        <CardTitle>Selected Tests & Services</CardTitle>
        {services.map((service) => (
          <div
            key={service.id}
            className='d-flex align-items-center justify-content-between'
          >
            <CardText>{service.title}:</CardText>
            <CardText>
              {`$ ${(service.price * service.quantity).toFixed(2)}`}{' '}
              <sup>x{service.quantity}</sup>
            </CardText>
          </div>
        ))}
        <div className='d-flex justify-content-between subtotal'>
          <CardSubtitle className='mt-2'>SUBTOTAL</CardSubtitle>
          <CardSubtitle className='mt-2'>{`$ ${total.toFixed(
            2
          )}`}</CardSubtitle>
        </div>
      </Card.Body>
    </Card>
  );
};
