import 'bootstrap/dist/css/bootstrap.min.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Outlet } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import './styles/global.css';

const App = () => {
  return (
    <>
      <Navbar />
      <Outlet></Outlet>
    </>
  );
};

export default App;
