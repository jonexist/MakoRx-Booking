import { Form, FormGroupProps } from 'react-bootstrap'

type InputProps = {
  label?: string
  placeholder?: string
  type?: string
  required?: boolean
} & FormGroupProps

const Input = ({
  label,
  placeholder,
  type,
  required,
  ...props
}: InputProps) => {
  return (
    <Form.Group {...props}>
      <Form.Label>
        {label} {required && <span className='text-danger'>*</span>}
      </Form.Label>
      <Form.Control type={type ?? 'text'} placeholder={placeholder} />
    </Form.Group>
  )
}

export default Input
