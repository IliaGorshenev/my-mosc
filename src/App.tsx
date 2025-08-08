import { Route, Routes } from 'react-router-dom';

import IndexPage from '@/pages/index';
import HeatMapPage from './pages/heat-map-page';

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route path="/map" element={<HeatMapPage></HeatMapPage>} />
    </Routes>
  );
}

export default App;
