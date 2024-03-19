import {
  Card,
  CardImg,
  CardLink,
  CardSubtitle,
  CardText,
  CardTitle,
} from 'react-bootstrap';
import { PharmacyDataProps } from '../../api/getPharmacy';

type SelectedPharmacyCardProps = {
  data: PharmacyDataProps;
};

export const SelectedPharmacyCard = ({ data }: SelectedPharmacyCardProps) => {
  return (
    <Card style={{ width: '25rem' }} className='mt-4 p-4'>
      <CardSubtitle className='text-capitalize mb-2'>
        {`Selected ${data.properties.category}`}
      </CardSubtitle>
      <CardImg variant='top' src='https://placeholder.pics/svg/500x250' />
      <CardTitle className='mt-2'>{data.text}</CardTitle>
      <CardText>{data.place_name}</CardText>
      <CardLink href='#' className='btn btn-primary'>
        Website
      </CardLink>
    </Card>
  );
};
