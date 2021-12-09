import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./css/product_edit.css";
import { getListDanhMuc, updateProduct } from "../api/adminApi.jsx";
import { getListCat, getProductById } from "../api/websiteApi.jsx";

export default function Product_edit() {
  function saveProductEdit(product) {
    updateProduct(product)
      .then((res) => {
        if (JSON.stringify(res["data"]) === JSON.stringify(product)) {
          alert("Save Successfully!");
        } else alert("Failed!");
      })
      .catch((error) => console.log(error));
  }

  return (
    <>
      <div className="product-edit-back">
        <a href="/admin/products">Trở lại</a>
      </div>
      <div className="product-edit">
        <Product_info save={saveProductEdit} />
      </div>
    </>
  );
}

function Product_info(props) {
  let { id } = useParams();
  const [product, setProduct] = useState({});
  const [cat, setCat] = useState([1]);
  const [danhMuc, setDanhMuc] = useState([]);

  useEffect(() => {
    getProductById(id)
      .then((result) => {
        console.log(result);
        setProduct(result["data"]);
      })
      .catch((error) => console.log(error));

    getListCat()
      .then((result) => {
        setCat(result["data"]);
      })
      .catch((error) => console.log(error));

    getListDanhMuc()
      .then((result) => {
        setDanhMuc(result["data"]);
      })
      .catch((error) => console.log(error));
  }, []);

  function handleInputChange(e) {
    setProduct({
      ...product,
      [e.target.name]: e.target.type != "file" ? e.target.value : "",
      ["dateUpdate"]: new Date().getTime() / 1000,
    });
    console.log(product);
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
    product && (
      <>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            props.save(product);
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
              maxLength="255"
              required
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
              maxLength="32"
              required
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
              maxLength="10"
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
              maxLength="5"
            />
          </div>

          <div>
            <h3>Danh mục</h3>
            <div className="cat-list">
              <select
                name="danhMuc"
                id=""
                onChange={ handleInputChange }
              >
                {danhMuc.map((dm) => (
                  <option value={dm.id} > {dm.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <h3>Loại </h3>
            <div className="cat-list">
              {Object.keys(product).length != 0 &&
                cat.map((cat) => (
                  <span
                    style={{
                      background:
                        product["cats"].indexOf(cat.id) == -1
                          ? ""
                          : "aquamarine",
                    }}
                    data-id={cat.id}
                    onClick={handleCatChange}
                  >
                    {cat.name}
                  </span>
                ))}
            </div>
          </div>
          <div>
            <h3>Ảnh bìa</h3>
            <input name="image" style={{ width: "auto" }} type="file" />
            <img
              src={product.image == null ? "" : product.image}
              alt=""
              height="150px"
              width="170px"
            />
          </div>
          <input type="submit" value="Lưu"></input>
        </form>
      </>
    )
  );
}
