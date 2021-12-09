import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { getListUser } from "../api/adminApi";
import { getListProduct } from "../api/websiteApi";

import "./css/dashboard.css";

export default function Dashboard() {
  const [countUser, setCountUser] = useState(0);
  const [countProduct, setCountProduct] = useState(0);

  useEffect(() => {
    getListProduct()
      .then((res) => {
        setCountProduct(res['data'].length)
      })
      .catch((error) => console.log(error));

    getListUser()
      .then((res) => {
        setCountUser(res["data"].length);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      <div className="p-2 bg-white">
        <h5 className="">Thống Kê</h5>
        <p>Số sản phẩm hiện tại: {countProduct}</p>
        <p>Số người dùng hiện tại: {countUser}</p>
      </div>
      {/* <Header />
        <>
          <div className="container-body d-flex">
            <div className="feature-list">
              <FeatureItem name="Dashboard" url="/admin" />
              <FeatureItem name="Sản phẩm" url="products" />
            </div>

            <div className="feature-content">"ok"</div>
          </div>
          <Outlet />
        </> */}
    </>
  );
}

export function FeatureItem(props) {
  const [featureClick, setFeatureClick] = useState("");
  const [status, setStatus] = useState(0);
  function feature_click() {
    if (status == 0) {
      setStatus(1);
      setFeatureClick("burlywood");
    } else {
      setStatus(0);
      setFeatureClick("");
    }
  }
  return (
    <div
      className="feature-item"
      style={{ background: featureClick }}
      onClick={feature_click}
    >
      <Link to={props.url}>{props.name}</Link>
    </div>
  );
}
