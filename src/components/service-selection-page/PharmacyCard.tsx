import { Button, Card, CardBody, CardText, CardTitle } from 'react-bootstrap';
import { PharmacyDataProps } from '../../api/getPharmacy';

type PharmacyCardProps = {
  data: PharmacyDataProps;
  selectedId: string;
  onSelect: (pharmacy: PharmacyDataProps) => void;
};

export const PharmacyCard = ({
  data,
  onSelect,
  selectedId,
}: PharmacyCardProps) => {
  return (
    <Card
      style={{
        width: '20rem',
        zIndex: 1000,
        backgroundColor: selectedId === data.id ? '#E8F7FF' : 'white',
      }}
    >
      <CardBody>
        <CardText className='text-uppercase fw-medium'>
          {data.properties.category}
        </CardText>
        <CardTitle>
          <strong>{data.text}</strong>
        </CardTitle>
        <CardText className='fw-medium fs-7'>{data.place_name}</CardText>
        <Button onClick={() => onSelect(data)} className='service-btn'>
          See offer
        </Button>
      </CardBody>
    </Card>
  );
};
