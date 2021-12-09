import { useEffect, useState } from "react";
import { createProduct } from "../api/adminApi.jsx";
import { getListCat } from "../api/websiteApi.jsx";
import jQuery from "jquery";

import "./css/product_edit.css";
import "./css/product_infor.css";
import { uploadBytes } from "@firebase/storage";
import { storageRef } from "../Firebase/firebase.config.jsx";

export function Product_new() {
  return (
    <>
      <div className="product-edit-back">
        <a href="/admin/products">Trở lại</a>
      </div>
      <div className="product-edit">
        <Product_info />
      </div>
    </>
  );
}

function Product_info(props) {
  const [product, setProduct] = useState({
    name: "",
    desc: "",
    prices: "",
    image: "",
    cats: [],
    dateUpdate: 0,
    ship: "",
    quantity: 0
  });
  const [cat, setCat] = useState([1]);
  const [error, setError] = useState({
    cats:''
  });

  useEffect(() => {
    getListCat()
      .then((result) => {
        setCat(result["data"]);
      })
      .catch((error) => console.log(error));
  }, []);

  function handleInputChange(e) {

    setProduct({
      ...product,
      [e.target.name]: e.target.value,
      ["dateUpdate"]: new Date().getTime() / 1000,
    });
    console.log(product);
  }
  function handleInputImage(e){
    // uploadBytes()
    console.log(e.target.files[0]);
    uploadBytes(storageRef, e.target.files[0]).then(res=>{
      console.log(res)
    }).catch(error=>console.log(error));
  }

  function handleCatChange(c) {
    let catId = c.target.dataset.id;

    if (product["cats"].indexOf(catId) == -1) {
      c.target.style.background = "aquamarine";
      setProduct({
        ...product,
        ["cats"]: [...product["cats"], catId],
      });
    } else {
      setProduct({
        ...product,
        ["cats"]: product["cats"].filter((id) => id != catId),
      });
      c.target.style.background = "";
    }
    console.log(product["cats"]);
  }

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          if (product["cats"].length == 0) {
            setError({ cats: "Hãy chọn 1 loại sản phẩm" });
            return;
          } else setError({ cats: null });

          let submit = jQuery(e.target).find("input:last")[0];
          submit.setAttribute("disabled", true);

          createProduct(product)
            .then((res) => {
              alert("Add successfully!");
              window.location.replace(
                "/admin/products/edit/" + res["data"]["id"]
              );
            })
            .catch((error) => {
              alert("Add Failed!");
              submit.setAttribute("disabled", false);
              console.log(error);
            });
        }}
      >
        <div>
          <h3>Tên sản phẩm</h3>
          <input
            name="name"
            defaultValue=""
            type="text"
            value={product.name}
            onChange={handleInputChange}
            required
            maxLength="255"
            placeholder="Tên sản phẩm tối đa 255 ký tự"
          />
        </div>
        <div>
          <h3>Mô tả</h3>
          <textarea
            name="desc"
            defaultValue=""
            value={product.desc}
            cols="30"
            rows="5"
            onChange={handleInputChange}
            required
          ></textarea>
        </div>

        <div>
          <h3>Giá</h3>
          <input
            name="prices"
            defaultValue=""
            type="number"
            value={product.prices}
            onChange={handleInputChange}
            required
            maxLength="32"
            placeholder="Giá sản phẩm tối đa 32 ký tự"
          />
        </div>

        <div>
          <h3>Số Lượng</h3>
          <input
            name="quantity"
            defaultValue="0"
            type="number"
            value={product.quantity}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <h3>Phí Vận Chuyển</h3>
          <input
            name="ship"
            defaultValue="0"
            type="number"
            value={product.ship}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <h3>Loại </h3>
          <div className="cat-list">
            {cat != null &&
              cat.map((cat) => (
                <span
                  style={{
                    background: "",
                  }}
                  data-id={cat.id}
                  onClick={handleCatChange}
                >
                  {cat.name}
                </span>
              ))}
            {error ? "" : <p>{error["cats"]}</p>}
          </div>
        </div>
        <div>
          <h3>Ảnh bìa</h3>
          <input
            id="image"
            type="file"
            onChange={handleInputImage}
          />
          <img
            src={product.image == null ? "" : product.image}
            alt=""
            height="150px"
            width="170px"
          />
        </div>
        <input type="submit" value="Thêm"></input>
      </form>
    </>
  );
}
