import { PlusIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import PatientDetails from '../components/patient-information/PatientDetails';
import { TitleSubtitle } from '../components/ui/TitleSubtitle';
import formData from '../data/formData';

export const PatientInformation = () => {
  const [patients, setPatients] = useState([0]);
  const [selectedCheckBox, setSelectedCheckBox] = useState<number | null>(null);

  const removePatient = (index: number) => {
    const newPatients = patients.filter((_, i) => i !== index);
    setPatients(newPatients);
  };

  return (
    <div>
      <TitleSubtitle title='Enter Patient Details' hasHr />
      {patients.map((_, index) => (
        <PatientDetails
          key={index}
          number={index + 1}
          index={index}
          removePatient={() => removePatient(index)}
        />
      ))}
      <Button
        className='light__blue_secondary d-flex align-items-center gap-2'
        onClick={() => setPatients([...patients, patients.length])}
      >
        <PlusIcon width='1.5rem' />
        Add Patient
      </Button>
      <div className='py-5 d-flex flex-column gap-3'>
        <h5>How did you hear about this services?</h5>
        {formData.map((group) => (
          <Row key={group.id} className='mb-2'>
            <Col>
              <Form.Check
                type='checkbox'
                label={group.title}
                id={group.id.toString()}
                checked={selectedCheckBox === group.id}
                onChange={() =>
                  setSelectedCheckBox(
                    selectedCheckBox === group.id ? null : group.id
                  )
                }
              />
            </Col>
          </Row>
        ))}
      </div>
    </div>
  );
};
