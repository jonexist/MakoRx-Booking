import { CardText } from 'react-bootstrap';
import { TContact, TContactField } from '../../type';

const ContactField = ({ label, value, isLink, linkValue }: TContactField) => (
  <div className='d-flex justify-content-between'>
    <CardText className='fw-bold contact'>{label}:</CardText>
    <CardText className='contact text-muted'>
      {isLink ? <a href={linkValue}>{value}</a> : value}
    </CardText>
  </div>
);

export const Contact = ({ area, hours, email, phone }: TContact) => {
  return (
    <>
      <ContactField label='Area' value={area} />
      <ContactField label='Hours' value={hours} />
      <ContactField
        label='Email'
        value={email}
        linkValue={`mailto:${email}`}
        isLink
      />
      <ContactField
        label='Phone'
        value={phone}
        linkValue={`tel:${phone}`}
        isLink
      />
    </>
  );
};
