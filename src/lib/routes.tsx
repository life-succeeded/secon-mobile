import { Route, Routes } from 'react-router';
import ActCreate from '../pages/ActCreate';
import ActList from '../pages/ActList';
import Map from '../pages/Map';
import Report from '../pages/Report';
import Tasks from '../pages/Tasks';
import { ActDetails } from '../pages/ActDetails';

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Tasks />} />
    <Route path="/create" element={<ActCreate />} />
    <Route path="/acts" element={<ActList />} />
    <Route path="/map" element={<Map />} />
    <Route path="/report" element={<Report />} />
    <Route path="/acts/:id" element={<ActDetails />} />
  </Routes>
);