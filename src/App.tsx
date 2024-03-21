import 'bootstrap/dist/css/bootstrap.min.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Outlet } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { ServiceProvider } from './context/ServiceContext';
import './styles/global.css';

const App = () => {
  return (
    <>
      <Navbar />
      <ServiceProvider>
        <Outlet></Outlet>
      </ServiceProvider>
    </>
  );
};

export default App;
