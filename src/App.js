import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/main";
import AddProduct from "./pages/addProduct";
import EditProduct from "./pages/editProduct";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/addProduct" element={<AddProduct />} />
          <Route path="/editProduct/:id" element={<EditProduct />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
