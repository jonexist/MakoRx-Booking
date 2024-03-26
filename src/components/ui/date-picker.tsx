import { Form } from 'react-bootstrap';

type DatePickerProps = {
  selectDate: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedDate: string | null;
  label: string;
  required?: boolean;
};

const DatePicker = ({
  label,
  selectedDate,
  selectDate,
  required,
}: DatePickerProps) => {
  return (
    <Form.Group className='w-100'>
      <Form.Label>
        {label} {required && <span className='text-danger'>*</span>}
      </Form.Label>
      <Form.Control
        type='date'
        value={selectedDate || ''}
        onChange={selectDate}
      />
    </Form.Group>
  );
};

export default DatePicker;
