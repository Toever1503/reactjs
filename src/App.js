import './App.css';
import Home from './Page/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Admin/Dashboard.jsx';
import Products from './Admin/Products.jsx';
import Product_edit from './Admin/Product_edit.jsx';
import { Product_new } from './Admin/Product_new';
import Product_view from './Page/Product_view';
import Admin_layout from './Admin/Admin_layout';
import Website_layout from './Page/Website_layout';
import Login from './component/Login';
import Register from './component/Register';
import Page from './Page/Page.jsx';
import Search from './Page/Search';
import Contact from './Page/Contact';


function App() {
  window.onbeforeunload = function () {
    // localStorage.removeItem('has_logged')
    console.log("o122222")
    return;
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Website_layout />} >
            <Route index element={<Home />} />
            <Route path="category/:pageID" element={<Page />}/>
            <Route path="/:name/:id" element={<Product_view />} />
            <Route path='/search/:product_name' element={<Search />}/>
            <Route path="contact" element={<Contact />} />
          </Route>

          <Route path="/admin" element={<Admin_layout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="products/edit/:id" element={<Product_edit />} />
            <Route path="products/new" element={<Product_new />} />
          </Route>
          
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
