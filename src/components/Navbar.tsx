import { Button, Nav, NavbarBrand, Navbar as NavbarBs } from 'react-bootstrap';
import Logo from '../assets/MakoRx.svg';

export const Navbar = () => {
  return (
    <NavbarBs className='navbar-custom d-flex justify-content-between align-items-center shadow-sm p-3 position-fixed w-100'>
      <NavbarBrand href='/'>
        <img src={Logo} alt='MakoRx Logo' />
      </NavbarBrand>
      <Nav>
        <Nav.Item>
          <Nav.Link href='https://www.makorxcareconnect.com/'>
            <Button variant='primary' className='nav-btn'>
              HOMEPAGE
            </Button>
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </NavbarBs>
  );
};
