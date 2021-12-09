import { Outlet } from "react-router";
import Header from "./component/Header";
import { FeatureItem } from "./Dashboard";

export default function Admin_layout(){
  
    return (
      <>
        <Header />
        <div className="container-body d-flex">
          <div className="feature-list">
            <FeatureItem name="Dashboard" url="/admin" />
            <FeatureItem name="Sản phẩm" url="products" />
          </div>

          <div className="feature-content">
            <Outlet />
          </div>
        </div>
      </>
    );
}