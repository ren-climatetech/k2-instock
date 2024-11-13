import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WarehousePage from './pages/WarehousePage/WarehousePage.jsx';
import InventoryPage from './pages/InventoryPage/InventoryPage.jsx';
import WarehouseItemPage from './pages/WarehouseItemPage/WarehouseItemPage.jsx';
import InventoryItemPage from './pages/InventoryItemPage/InventoryItemPage.jsx';
import EditInventoryItemPage from './pages/EditInventoryItemPage/EditInventoryItemPage.jsx';
import EditWarehouseItemPage from './pages/EditWarehouseItemPage/EditWarehouseItemPage.jsx';
import AddWarehousePage from './pages/AddWarehousePage/AddWarehousePage.jsx';
import AddInventoryPage from './pages/AddInventoryPage/AddInventoryPage.jsx';

import './App.scss'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        { /* Main pages */}
        <Route path="/warehouse" element={<WarehousePage />} />
        <Route path="/inventory" element={<InventoryPage />} />

        {/* Item Pages */}
        <Route path="/warehouse/:itemId" element={<WarehouseItemPage />} />
        <Route path="/inventory/:itemId" element={<InventoryItemPage />} />

        {/* Edit Pages */}
        <Route path="/warehouse/:itemId/edit" element={<EditWarehouseItemPage />} />
        <Route path="/inventory/:itemId/edit" element={<EditInventoryItemPage />} />

        {/* Add Pages */}
        <Route path="/warehouse/add" element={<AddWarehousePage />} />
        <Route path="/inventory/add" element={<AddInventoryPage />} />

      </Routes>
    </BrowserRouter>
  )
}
export default App;