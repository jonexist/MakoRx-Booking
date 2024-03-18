import { Button, Nav, NavbarBrand, Navbar as NavbarBs } from 'react-bootstrap';
import Logo from '../assets/MakoRx.svg';

export const Navbar = () => {
  return (
    <NavbarBs className='navbar-custom d-flex justify-content-between align-items-center shadow-m p-3'>
      <NavbarBrand href='/'>
        <img src={Logo} alt='MakoRx Logo' />
      </NavbarBrand>
      <Nav>
        <Nav.Item>
          <Nav.Link href='/'>
            <Button variant='primary' className='custom-btn'>
              HOMEPAGE
            </Button>
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </NavbarBs>
  );
};
