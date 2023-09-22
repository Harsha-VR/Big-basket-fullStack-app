import "./App.css";
import ProductAdmin from "./products/components/admin/ProductAdmin";
import CreateProduct from "./products/components/create/CreateProduct";
import ProductList from "./products/components/list/ProductList";
import ProductUpdate from "./products/components/update/ProductUpdate";
import Home from "./root/components/home/Home";
import Navbar from "./root/components/navbar/Navbar";
import { BrowserRouter as Router , Routes , Route} from 'react-router-dom'

function App() {
  return (
    <>
      <Router>
        <Navbar/>
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/products/list" element={<ProductList />}></Route>
            <Route exact path="/products/admin" element={<ProductAdmin />}></Route>
            <Route exact path="/products/create" element={<CreateProduct/>}></Route>
            <Route exact path="/products/:productId" element={<ProductUpdate />}></Route>
          </Routes>
      </Router>
    </>
  );
}

export default App;
