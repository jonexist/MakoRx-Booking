import 'bootstrap/dist/css/bootstrap.min.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Container } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import { Outlet } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { ServiceProvider } from './context/ServiceContext';
import './styles/global.css';

const App = () => {
  return (
    <>
      <Navbar />
      <ServiceProvider>
        <Container
          className='min-vh-100'
          style={{
            paddingTop: '8.5rem',
          }}
        >
          <Outlet />
        </Container>
      </ServiceProvider>
    </>
  );
};

export default App;
