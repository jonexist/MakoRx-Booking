import { Container } from 'react-bootstrap';
import { TitleSubtitle } from '../components/service-selection-page/TitleSubtitle';

export const ServiceSelectionPage = () => {
  return (
    <Container className='mt-4'>
      <TitleSubtitle
        title='Book an Appointment'
        subtitle='Book your pharmacy visit - MAKO Rx Care Connect works together to provide you special services and testing.'
      />
    </Container>
  );
};
