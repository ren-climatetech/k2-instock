import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WarehousePage from './pages/WarehousePage/WarehousePage';
import InventoryPage from './pages/InventoryPage/InventoryPage';

import './App.css'

function App() {
    return (
      <BrowserRouter>
        <Routes>
          { /* Main pages */}
          <Route path="/warehouse" element={ <WarehousePage/> } />
          <Route path="/inventory" element= { <InventoryPage/> } />

          {/* Item Pages */}
          <Route path="/warehouse/:itemId" element={} />
          <Route path="/warehouse/:itemId" element={} />
          
        </Routes>
      </BrowserRouter>
    )
  
}

export default App
