import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function ProductList(props) {
  return (
    <div className="product-list">
      {props.listProduct.length != 0 ? (
        props.listProduct.map((data) => <Product product={data} />)
      ) : (
        <div className="text-center">
          <h3>Không có sản phẩm nào!</h3>
        </div>
      )}
    </div>
  );
}

function Product(props) {
  const dispatch = useDispatch();
  return (
    <div className="product-item" data-id={props.product.id}>
      <div className="product-image" style={{ height: "60%" }}>
        <a href={"/" + props.product.name + "/" + props.product.id}>
          <img src={props.product.image} alt="" />
        </a>
      </div>

      <div className="product-title text-center">
        <h5>{props.product.name}</h5>
      </div>
      <div className="product-price ml-1">
        <span>${props.product.prices}</span>
      </div>
      <div className="product-action p-1">
        <span
          className="add-item"
          onClick={() => {
            console.log("begin add");
            dispatch({
              type: "addProduct",
              payload: {
                id: props.product.id,
                product: props.product,
                quantity: 1,
              },
            });
          }}
        >
          Thêm
        </span>
      </div>
    </div>
  );
}
