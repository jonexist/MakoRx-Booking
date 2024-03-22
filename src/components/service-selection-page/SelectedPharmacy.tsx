import {
  Button,
  Card,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
} from 'react-bootstrap';
import { TPharmacyDataProps } from '../../type';
import { Contact } from './Contact';

type TSelectedPharmacyCardProps = {
  data: TPharmacyDataProps;
};

export const SelectedPharmacy = ({ data }: TSelectedPharmacyCardProps) => {
  return (
    <Card style={{ width: '20.5rem' }} className='mt-4 p-4'>
      <CardSubtitle className='text-capitalize text-muted mb-3'>
        {`Selected ${data.properties.category}`}
      </CardSubtitle>
      <CardImg variant='top' src='https://placeholder.pics/svg/500x250' />
      <CardTitle className='mt-3 fw-bold'>{data.text}</CardTitle>
      <CardText>{data.place_name}</CardText>
      <Contact
        area='1188 Jojeko View'
        hours='20:00:38 - 20:00:38'
        email='defu@ewen.ar'
        phone='(807) 447-2197'
      />
      <div className='mt-3'>
        <Button className='btn btn-primary me-2 contact__btn'>Website</Button>
        <Button className='btn btn-primary contact__btn'>Call</Button>
      </div>
    </Card>
  );
};
