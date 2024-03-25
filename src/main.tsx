import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { AppointmentConfirm } from './pages/AppointmentConfirm.tsx';
import { AppointmentSelection } from './pages/AppointmentSelection.tsx';
import { PatientInformation } from './pages/PatientInformation.tsx';
import { ServiceSelection } from './pages/ServiceSelection.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <ServiceSelection /> },
      { path: '/select-time', element: <AppointmentSelection /> },
      { path: '/patient-information', element: <PatientInformation /> },
      { path: '/confirm-appointment', element: <AppointmentConfirm /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
