import { useState } from 'react'
import PatientDetails from '../components/patient-information/PatientDetails'
import { TitleSubtitle } from '../components/service-selection-page/TitleSubtitle'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { PlusIcon } from '@heroicons/react/24/outline'

const arr = [
  ['Family / Friends', 'Pharmacy', 'Employer'],
  ['Social Media', 'MakoRX Website', 'Others'],
]

export const PatientInformation = () => {
  const [patients, setPatients] = useState([0])

  const removePatient = (index: number) => {
    const newPatients = patients.filter((_, i) => i !== index)
    setPatients(newPatients)
  }

  return (
    <div>
      <TitleSubtitle title='Enter Patient Details' hasHr />
      {patients.map((_, index) => (
        <PatientDetails
          number={index + 1}
          index={index}
          removePatient={() => removePatient(index)}
        />
      ))}
      <Button
        className='d-flex align-items-center gap-2'
        onClick={() => setPatients([...patients, patients.length])}
      >
        <PlusIcon width='1rem' />
        Add Another Patient
      </Button>
      <div className='py-5 d-flex flex-column gap-3'>
        <h5>How did you hear about this services?</h5>
        {arr.map((group, idx) => (
          <Row key={idx} className='mb-2'>
            {group.map((item) => (
              <Col xs={12} lg={4}>
                <Form.Check type='checkbox' label={item} />
              </Col>
            ))}
          </Row>
        ))}
      </div>
    </div>
  )
}
