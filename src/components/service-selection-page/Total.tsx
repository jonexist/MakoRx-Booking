import { Card, CardSubtitle, CardText, CardTitle } from 'react-bootstrap';
import { TService } from '../../type';
import { formatCurrency } from '../../utilities/formatCurrency';

type TTotalCardProps = {
  services: TService[];
  total: number;
};

export const Total: React.FC<TTotalCardProps> = ({ services, total }) => {
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
              {formatCurrency(service.price * service.quantity)}{' '}
              <sup>x{service.quantity}</sup>
            </CardText>
          </div>
        ))}
        <div className='d-flex justify-content-between subtotal'>
          <CardSubtitle className='mt-2'>SUBTOTAL</CardSubtitle>
          <CardSubtitle className='mt-2'>{formatCurrency(total)}</CardSubtitle>
        </div>
      </Card.Body>
    </Card>
  );
};
