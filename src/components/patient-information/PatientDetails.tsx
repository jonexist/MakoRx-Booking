import { useState } from 'react';
import { CloseButton, Col, Row } from 'react-bootstrap';
import { isMinor } from '../../utilities/getPatientAge';
import DatePicker from '../ui/DatePicker';
import Input from '../ui/Input';
import Select from '../ui/Select';
import { UploadImage } from '../ui/upload';

type PatientDetailsProps = {
  number: number;
  removePatient: () => void;
  index: number;
};

export const PatientDetails = ({
  number,
  removePatient,
  index,
}: PatientDetailsProps) => {
  const [date, setDate] = useState<Date | null>(null);
  const [image, setImage] = useState<string | null>(null);

  const selectedDate = date ? date.toISOString().substring(0, 10) : null;

  const selectDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = event.target.value ? new Date(event.target.value) : null;
    setDate(newDate);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => setImage(null);

  return (
    <div className='mb-3 border-bottom'>
      <div className='d-flex gap-4'>
        <div style={{ width: '10rem' }}>
          <p>Patient # {number}</p>
          <UploadImage
            id={`file-input-${number}`}
            image={image}
            handleImageUpload={handleImageUpload}
            handleRemoveImage={handleRemoveImage}
          />
        </div>
        <div className='flex-grow-1 d-flex gap-3 w-100 flex-column'>
          <div className='d-flex gap-2 w-100 flex-column mb-2'>
            <div className='d-flex justify-content-between'>
              <h5>Personal Details</h5>
              {index !== 0 && <CloseButton onClick={removePatient} />}
            </div>
            <Row className='mb-2'>
              <Col xs={12} lg={6}>
                <Input
                  label='First Name'
                  placeholder='Michael'
                  type='text'
                  required
                />
              </Col>
              <Col xs={12} lg={6}>
                <Input
                  label='Last Name'
                  placeholder='Jackson'
                  type='text'
                  required
                />
              </Col>
            </Row>
            <Row className='mb-2'>
              <Col xs={12} lg={6}>
                <Input label='Middle Name' placeholder='Joseph' type='text' />
              </Col>
              <Col xs={12} lg={6}>
                <Row>
                  <Col>
                    <Select
                      label='Select Gender'
                      options={['MALE', 'FEMALE']}
                      required
                    />
                  </Col>
                  <Col>
                    <DatePicker
                      label='Date of Birth'
                      selectedDate={selectedDate}
                      selectDate={selectDate}
                      required
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
          <div className='d-flex gap-2 w-100 flex-column mb-2'>
            <h5>Contact Details</h5>
            <Row className='mb-2'>
              <Col xs={12} lg={6}>
                <Input
                  label='Email Address'
                  placeholder='sample@gmail.com'
                  type='email'
                  required
                />
              </Col>
              <Col xs={12} lg={6}>
                <Input
                  label='Mobile Number'
                  placeholder='(212) 555-1212'
                  type='tel'
                  required
                />
              </Col>
            </Row>
          </div>
          {date && isMinor(date) && (
            <div className='d-flex gap-2 w-100 flex-column mb-3'>
              <h5>Guardian’s Details</h5>
              <Row className='mb-2'>
                <Col xs={12} lg={6}>
                  <Input
                    label='First Name'
                    placeholder='Michael'
                    type='text'
                    required
                  />
                </Col>
                <Col xs={12} lg={6}>
                  <Input
                    label='Last Name'
                    placeholder='Jackson'
                    type='text'
                    required
                  />
                </Col>
              </Row>
              <Row className='mb-2'>
                <Col xs={12} lg={6}>
                  <Input
                    label='Email Address'
                    placeholder='sample@gmail.com'
                    type='email'
                    required
                  />
                </Col>
                <Col xs={12} lg={6}>
                  <Input
                    label='Mobile Number'
                    placeholder='(212) 555-1212'
                    type='tel'
                    required
                  />
                </Col>
              </Row>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;
