import { Button, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
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
  const { selectedServices, selectedPharmacy, setSelectedPharmacy, total } =
    useServiceContext();
  const { mapContainerRef, pharmacyData } = useMap();
  const navigate = useNavigate();

  const handlePharmacySelection = (pharmacy: TPharmacyDataProps) => {
    setSelectedPharmacy({
      ...pharmacy,
      services: pharmacyServices,
    });
  };

  return (
    <div
      style={{
        paddingBottom: selectedPharmacy ? '1.5rem' : '0',
      }}
    >
      <TitleSubtitle
        title='Book an Appointment'
        subtitle='Book your pharmacy visit - MAKO Rx Care Connect works together to provide you special services and testing.'
        hasHr={true}
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
      <div className='d-flex gap-2 mt-4'>
        {selectedPharmacy && (
          <>
            <div>
              <SelectedPharmacy data={selectedPharmacy} />
            </div>
            <Container className='mt-4'>
              <TitleSubtitle
                title={selectedPharmacy.text}
                subtitle={`List of Tests & Services in ${selectedPharmacy.text}`}
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
              {selectedServices.length > 0 ? (
                <div className='d-flex justify-content-end mt-5'>
                  <Button
                    variant='primary'
                    className='light__blue__btn px-5 py-2 fs-6'
                    onClick={() => navigate('/select-time')}
                  >
                    Next
                  </Button>
                </div>
              ) : null}
            </Container>
          </>
        )}
      </div>
    </div>
  );
};
