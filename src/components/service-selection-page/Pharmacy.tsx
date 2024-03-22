import { Button, Card, CardBody, CardText, CardTitle } from 'react-bootstrap';
import { TPharmacyDataProps } from '../../type';

type TPharmacyCardProps = {
  data: TPharmacyDataProps;
  selectedId: string;
  onSelect: (pharmacy: TPharmacyDataProps) => void;
};

export const Pharmacy = ({
  data,
  onSelect,
  selectedId,
}: TPharmacyCardProps) => {
  return (
    <Card
      style={{
        width: '20rem',
        backgroundColor: selectedId === data.id ? '#E8F7FF' : 'white',
      }}
    >
      <CardBody>
        <CardText className='text-uppercase fw-medium'>
          {data.properties.category}
        </CardText>
        <CardTitle className='fw-bold'>{data.text}</CardTitle>
        <CardText className='fw-medium fs-7'>{data.place_name}</CardText>
        <Button onClick={() => onSelect(data)} className='card__service__btn'>
          See Services Offer
        </Button>
      </CardBody>
    </Card>
  );
};
