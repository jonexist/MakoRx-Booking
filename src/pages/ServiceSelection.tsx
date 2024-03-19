import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { PharmacyDataProps } from '../api/getPharmacy';
import { PharmacyCard } from '../components/service-selection-page/PharmacyCard';
import { SelectedPharmacyCard } from '../components/service-selection-page/SelectedPharmacyCard';
import { TitleSubtitle } from '../components/service-selection-page/TitleSubtitle';
import { useMap } from '../hooks/useMap';

export const ServiceSelection = () => {
  const { mapContainerRef, pharmacyData } = useMap();
  const [selectedPharmacy, setSelectedPharmacy] =
    useState<PharmacyDataProps | null>(null);

  const handlePharmacySelection = (pharmacy: PharmacyDataProps) => {
    setSelectedPharmacy(pharmacy);
  };

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
              <PharmacyCard
                selectedId={selectedPharmacy?.id || ''}
                key={data.id}
                data={data}
                onSelect={handlePharmacySelection}
              />
            ))}
        </div>
      </div>
      <div>
        {selectedPharmacy && <SelectedPharmacyCard data={selectedPharmacy} />}
      </div>
    </Container>
  );
};
