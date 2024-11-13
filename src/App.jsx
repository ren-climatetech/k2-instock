import { BrowserRouter, Routes, Route } from "react-router-dom";
import WarehousePage from "./pages/WarehousePage/WarehousePage.jsx";
import InventoryPage from "./pages/InventoryPage/InventoryPage.jsx";
import WarehouseItemPage from "./pages/WarehouseItemPage/WarehouseItemPage.jsx";
import InventoryItemPage from "./pages/InventoryItemPage/InventoryItemPage.jsx";
import EditInventoryItemPage from "./pages/EditInventoryItemPage/EditInventoryItemPage.jsx";
import EditWarehouseItemPage from "./pages/EditWarehouseItemPage/EditWarehouseItemPage.jsx";
import AddWarehousePage from "./pages/AddWarehousePage/AddWarehousePage.jsx";
import AddInventoryPage from "./pages/AddInventoryPage/AddInventoryPage.jsx";

import "./App.scss";
import Header from "./components/Header/Header.jsx";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.jsx";
import Footer from "./components/Footer/Footer.jsx";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* Main pages */}
        <Route path="/" element={<WarehousePage />} />
        <Route path="/warehouses" element={<WarehousePage />} />
        <Route path="/inventories" element={<InventoryPage />} />

        {/* Item Pages */}
        <Route path="/warehouse/:itemId" element={<WarehouseItemPage />} />
        <Route path="/inventory/:itemId" element={<InventoryItemPage />} />

        {/* Edit Pages */}
        <Route
          path="/warehouse/:itemId/edit"
          element={<EditWarehouseItemPage />}
        />
        <Route
          path="/inventory/:itemId/edit"
          element={<EditInventoryItemPage />}
        />

        {/* Add Pages */}
        <Route path="/warehouse/add" element={<AddWarehousePage />} />
        <Route path="/inventory/add" element={<AddInventoryPage />} />
        {/* Not found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
export default App;
