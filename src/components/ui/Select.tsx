import { Form } from 'react-bootstrap'

type SelectProps = {
  label?: string
  options: string[]
  required?: boolean
}

const Select = ({ label, options, required }: SelectProps) => {
  return (
    <Form.Group className='w-100'>
      <Form.Label>
        {label} {required && <span className='text-danger'>*</span>}
      </Form.Label>
      <Form.Select>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </Form.Select>
    </Form.Group>
  )
}

export default Select
