import { Button, Card, CardBody, CardText, CardTitle } from 'react-bootstrap';
import { PharmacyDataProps } from '../../api/getPharmacy';

type PharmacyCardProps = {
  data: PharmacyDataProps;
};

export const PharmacyCard = ({ data }: PharmacyCardProps) => {
  return (
    <Card
      style={{
        width: '20rem',
        zIndex: 1000,
      }}
    >
      <CardBody>
        <CardText className='text-uppercase'>
          {data.properties.category}
        </CardText>
        <CardTitle>{data.text}</CardTitle>
        <CardText>{data.place_name}</CardText>
        <Button>See offer</Button>
      </CardBody>
    </Card>
  );
};
