import { useEffect, useState } from "react";
import { useParams } from "react-router";
import "../api/websiteApi.jsx";
import ProductList from "./Components/ProductList.jsx";
import { getListProduct } from "../api/websiteApi.jsx";

export default function Search() {
  const { product_name } = useParams();
  const [result, setResult] = useState([]);

  useEffect(() => {
    getListProduct()
      .then((res) => {
        setResult(
          res["data"].filter((product) => product.name.includes(product_name))
        );
      })
      .catch((error) => console.log(error));
  }, [product_name]);

  return (
    <>
      <h5 className="mt-5">
        {result.length} Kết quả tìm kiếm với{" "}
        <span style={{ color: "red" }}>{product_name}:</span>
      </h5>
      <div className="result-search">
        {result.length == 0 ? (
          <h3>Không tìm thấy sản phẩm nào</h3>
        ) : (
          <ProductList listProduct={result} />
        )}
      </div>
    </>
  );
}
