import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WarehousePage from './pages/WarehousePage/WarehousePage';
import InventoryPage from './pages/InventoryPage/InventoryPage';
import WarehouseItemPage from './pages/WarehouseItemPage/WarehouseItemPage';
import InventoryItemPage from './pages/InventoryItemPage/InventoryItemPage';
import EditInventoryItemPage from './pages/EditInventoryItemPage/EditInventoryItemPage';
import EditWarehouseItemPage from './pages/EditWarehouseItemPage/EditWarehouseItemPage';

import './App.css'

function App() {
    return (
      <BrowserRouter>
        <Routes>
          { /* Main pages */}
          <Route path="/warehouse" element={ <WarehousePage/> } />
          <Route path="/inventory" element= { <InventoryPage/> } />

          {/* Item Pages */}
          <Route path="/warehouse/:itemId" element={ <WarehouseItemPage/> } />
          <Route path="/inventory/:itemId" element={ <InventoryItemPage/> } />

          {/* Edit Pages */}
          <Route path="/warehouse/:itemId/edit" element={ <EditWarehouseItemPage/> } />
          <Route path="/inventory/:itemId/edit" element={ <EditInventoryItemPage/> } />


        </Routes>
      </BrowserRouter>
    )
  
}

export default App
