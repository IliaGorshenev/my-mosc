import { Route, Routes } from 'react-router-dom';

import IndexPage from '@/pages/index';
import ClothesPage from './pages/clothes-page';
import HeatMapPage from './pages/heat-map-page';
import ShopPage from './pages/shop-page';

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route path="/map" element={<HeatMapPage></HeatMapPage>} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/clothes" element={<ClothesPage />} />
      {/* <Route path="/human" element={<PosePage></PosePage>} /> */}
    </Routes>
  );
}

export default App;
