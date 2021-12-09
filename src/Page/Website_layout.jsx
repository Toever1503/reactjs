import { Outlet } from "react-router";
import Cart from "./Components/Cart.jsx";
import Footer from "./Components/Footer.jsx";
import Header from "./Components/Header.jsx";
export default function Website_layout(){

    return (
      <>
        <Header />
        <div className="container">
         <Outlet />
        </div>
        {/* <Cart /> */}
        <Footer />
      </>
    );
}