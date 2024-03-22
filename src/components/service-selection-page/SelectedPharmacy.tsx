import {
  Card,
  CardImg,
  CardLink,
  CardSubtitle,
  CardText,
  CardTitle,
} from 'react-bootstrap';
import { TPharmacyDataProps } from '../../type';

type TSelectedPharmacyCardProps = {
  data: TPharmacyDataProps;
};

export const SelectedPharmacy = ({ data }: TSelectedPharmacyCardProps) => {
  return (
    <Card style={{ width: '20.5rem' }} className='mt-4 p-4'>
      <CardSubtitle className='text-capitalize mb-2'>
        {`Selected ${data.properties.category}`}
      </CardSubtitle>
      <CardImg variant='top' src='https://placeholder.pics/svg/500x250' />
      <CardTitle className='mt-3'>{data.text}</CardTitle>
      <CardText>{data.place_name}</CardText>
      <CardLink href='#' className='btn btn-primary'>
        Website
      </CardLink>
    </Card>
  );
};
