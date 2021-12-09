import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Breadcrumb from "./Components/Breadcrumb";
import "./css/product_view.css";
import ProductList from "./Components/ProductList.jsx";
import { getListProduct, getProductById } from "../api/websiteApi";

export default function Product_view() {
  let { id } = useParams();
  const [product, setProduct] = useState({});
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProductById(id)
      .then((result) => {
        setProduct(result["data"]);
        console.log(result);
      })
      .catch((error) => console.log(error));
    getListProduct()
      .then((res) => {
        setProducts(res["data"]);
      })
      .catch((error) => console.log(error));
  }, [id]);

  return (
    product && (
      <>
        <div className="container">
          <Breadcrumb name={product.name} />
          <div className="main-content">
            <div className="main-product d-flex bg-white">
              <div className="product-Image" style={{ width: "40%" }}>
                <img src={product.image} width="100%" height="100%" alt="" />
              </div>
              <div className="product_detail text-center">
                <h1>{product.name}</h1>
                <p>Giá sốc: {product.prices}$</p>
                <p style={{ textAlign: "left" }}>
                  <b>Mô tả:</b>
                  <span className="d-block">{product.desc}</span>
                </p>

                <div className="btn btn-outline-primary mt-5">Thêm giỏ</div>
              </div>
            </div>
            {/* end main-product */}
          </div>
          {/* end main-content */}
          <div className="other-product mt-2">
            <h3>Sản phẩm khác</h3>
            <ProductList listProduct={products} />
          </div>
        </div>
      </>
    )
  );
}
