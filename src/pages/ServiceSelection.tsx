import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Pharmacy } from '../components/service-selection-page/Pharmacy';
import { SelectedPharmacy } from '../components/service-selection-page/SelectedPharmacy';
import { Service } from '../components/service-selection-page/Services';
import { TitleSubtitle } from '../components/service-selection-page/TitleSubtitle';
import { Total } from '../components/service-selection-page/Total';
import { useServiceContext } from '../context/useServiceContext';
import { pharmacyServices } from '../data/pharmacyServices';
import { useMap } from '../hooks/useMap';
import { TPharmacyDataProps } from '../type';

export const ServiceSelection = () => {
  const { serviceItem } = useServiceContext();
  const { mapContainerRef, pharmacyData } = useMap();
  const [selectedPharmacy, setSelectedPharmacy] =
    useState<TPharmacyDataProps | null>(null);

  const handlePharmacySelection = (pharmacy: TPharmacyDataProps) => {
    setSelectedPharmacy({
      ...pharmacy,
      services: pharmacyServices,
    });
  };

  const selectedServices = serviceItem.filter((serv) => serv.selected);
  const total = selectedServices.reduce(
    (acc, serv) => acc + serv.price * serv.quantity,
    0
  );

  return (
    <Container
      className='min-vh-100'
      style={{ paddingTop: '8.5rem', paddingBottom: '1.5rem' }}
    >
      <TitleSubtitle
        title='Book an Appointment'
        subtitle='Book your pharmacy visit - MAKO Rx Care Connect works together to provide you special services and testing.'
      />

      <div ref={mapContainerRef} className='mapboxgl'>
        <div className='card__container'>
          {pharmacyData &&
            pharmacyData.length > 0 &&
            pharmacyData.map((data) => (
              <Pharmacy
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
              <SelectedPharmacy data={selectedPharmacy} />
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
                      <Service
                        data={{
                          ...selectedPharmacy,
                          service: service,
                        }}
                      />
                    </Col>
                  );
                })}
              </Row>
              {selectedServices.length === 0 ? (
                <div className='text-center mt-3'>
                  <p className='text-muted'>No services selected</p>
                </div>
              ) : (
                <Total services={selectedServices} total={total} />
              )}
            </Container>
          </>
        )}
      </div>
    </Container>
  );
};
