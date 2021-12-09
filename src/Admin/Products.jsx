import { useEffect, useState } from "react";
import Header from "./component/Header.jsx";
import { FeatureItem } from "./Dashboard.jsx";
import { deleteProductById } from "../api/adminApi.jsx";
import { getListProduct, getListCat } from "../api/websiteApi.jsx";

import "./css/product.css";
import "./css/product_infor.css";

export default function Products() {
  const [cat, setCat] = useState([]);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getListCat()
      .then((res) => {
        setCat(res["data"]);
        console.log(cat);
      })
      .catch((error) => console.log(error));

    getListProduct()
      .then((res) => {
        setProducts(res["data"].reverse());
      })
      .catch((error) => console.log(error));
  }, []);

  function remove(id) {
    setProducts(products.filter((p) => p.id != id));
  }

  const [id_edit, setId_edit] = useState(null);
  let isEvenRow = 1;

  return (
    <>
      <div className="product-features">
        <div className="product-feature-item">
          <a href="/admin/products/new">Mới</a>
        </div>
      </div>
      <div className="product-table">
        <table style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Tên sản phẩm</th>
              <th>Mô tả</th>
              <th>Giá</th>
              <th>Số Lượng</th>
              <th>Phí Ship</th>
              {/* <th>Loại</th> */}
              <th>Cập Nhật Cuối</th>
            </tr>
          </thead>
          <tbody>
            {products.map((data) => (
              <Product
                remove={remove}
                cat={cat}
                product={data}
                isEven={isEvenRow++}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function Product(props) {
  function deleteProduct() {
    deleteProductById(props.product.id)
      .then((res) => {
        alert("Delete successfully");
          props.remove(props.product.id);
      })
      .catch((error) => console.log(error));
  }
  return (
    <tr style={{ background: props.isEven % 2 == 0 ? "white" : "#efefef" }}>
      <td>
        <strong>{props.product.name}</strong>
        <div className="product-action">
          <span>
            <a href={"products/edit/" + props.product.id}>Sửa</a>
          </span>
          <span onClick={deleteProduct} style={{ cursor: "pointer" }}>
            Xóa
          </span>
          <span>
            <a href={"/" + props.product.name + "/" + props.product.id}>Xem</a>
          </span>
        </div>
      </td>
      <td>{props.product.desc}</td>
      <td>{props.product.prices}$</td>
      <td>{props.product.quantity}</td>
      <td>{props.product.ship}$</td>
      {/* <td>
        {
          console.log(props.product.cats.length)
          // props.product.cats.map((catId) => {
          //   return props.cat.map((x) => {
          //     if (x.id === catId) return x.name + ",";
          //   });
          // })
        }
      </td> */}
      <td>{new Date(Number(props.product.dateUpdate) * 1000).toUTCString()}</td>
    </tr>
  );
}
