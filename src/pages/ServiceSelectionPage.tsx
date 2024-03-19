import { Container } from 'react-bootstrap';
import { PharmacyCard } from '../components/service-selection-page/PharmacyCard';
import { TitleSubtitle } from '../components/service-selection-page/TitleSubtitle';
import { useMap } from '../hooks/useMap';

export const ServiceSelectionPage = () => {
  const { mapContainerRef, pharmacyData } = useMap();

  return (
    <Container className='mt-4'>
      <TitleSubtitle
        title='Book an Appointment'
        subtitle='Book your pharmacy visit - MAKO Rx Care Connect works together to provide you special services and testing.'
      />

      <div ref={mapContainerRef} className='map-container'>
        <div className='card-container'>
          {pharmacyData &&
            pharmacyData.length > 0 &&
            pharmacyData.map((data) => (
              <PharmacyCard key={data.id} data={data} />
            ))}
        </div>
      </div>
    </Container>
  );
};
