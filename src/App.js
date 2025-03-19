import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/main";
import AddProduct from "./pages/addProduct";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/addProduct" element={<AddProduct />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
