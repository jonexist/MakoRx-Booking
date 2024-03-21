import { useContext, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { PharmacyDataProps } from '../api/getPharmacy';
import { PharmacyCard } from '../components/service-selection-page/PharmacyCard';
import { SelectedPharmacyCard } from '../components/service-selection-page/SelectedPharmacyCard';
import { ServiceCard } from '../components/service-selection-page/ServiceCard';
import { TitleSubtitle } from '../components/service-selection-page/TitleSubtitle';
import { TotalCard } from '../components/service-selection-page/TotalCard';
import { ServiceContext } from '../context/ServiceContext';
import { services } from '../data/pharmacyServices';
import { useMap } from '../hooks/useMap';

export const ServiceSelection = () => {
  const { serviceItem, serviceQuantity } = useContext(ServiceContext);
  const { mapContainerRef, pharmacyData } = useMap();
  const [selectedPharmacy, setSelectedPharmacy] =
    useState<PharmacyDataProps | null>(null);

  const handlePharmacySelection = (pharmacy: PharmacyDataProps) => {
    setSelectedPharmacy({
      ...pharmacy,
      services: services,
    });
  };

  return (
    <Container className='mt-4 mb-4'>
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
      <div className='d-flex gap-2'>
        {selectedPharmacy && (
          <>
            <div>
              <SelectedPharmacyCard data={selectedPharmacy} />
            </div>
            <Container className='mt-4'>
              <TitleSubtitle
                title={`${selectedPharmacy.text} Services`}
                hasHr={true}
              />
              <Row xl={2}>
                {selectedPharmacy.services.map((service) => {
                  return (
                    <Col key={service.id} className='mb-3'>
                      <ServiceCard
                        data={{
                          ...selectedPharmacy,
                          service: service,
                        }}
                      />
                    </Col>
                  );
                })}
              </Row>
              <p>Total: {serviceQuantity}</p>
              {serviceItem.map((serv) =>
                serv.selected ? <p>{serv.id}</p> : null
              )}
              <TotalCard />
            </Container>
          </>
        )}
      </div>
    </Container>
  );
};
