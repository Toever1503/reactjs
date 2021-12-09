import { useEffect, useState } from "react";
import Breadcrumb from "./Components/Breadcrumb.jsx";
import ProductList from "./Components/ProductList.jsx";
import Product_filter from "./Components/Product_filter.jsx";
import "../api/websiteApi.jsx";
import { getListProduct } from "../api/websiteApi.jsx";
import { useParams } from "react-router";

export default function Page() {
  const [products, setProducts] = useState([]);
  const { pageID } = useParams();
  useEffect(() => {
    getListProduct()
      .then((res) => {
        setProducts(
          res["data"].filter((p) => {
            if (p.DanhMuc == pageID) return p;
          })
        );
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    products.length != 0 && (
      <>
        <Breadcrumb name={"Sản Phẩm " + pageID} />
        <div className="main-content d-flex">
          <aside className="product-filter" style={{ width: "30%" }}>
            <Product_filter
              refreshOriginal={() => {
                getListProduct()
                  .then((res) => {
                    setProducts(res["data"]);
                  })
                  .catch((error) => console.log(error));
              }}
              setListProduct={(filter) => {
                getListProduct().then((res) => {
                  let array = [];
                  console.log(filter);
                  setProducts(
                    res["data"].filter((p) => {
                      if (filter.indexOf(p.cats[0]) != -1) return p;
                    })
                  );
                });
              }}
            />
          </aside>
          <ProductList listProduct={products} />
        </div>
      </>
    )
  );
}
