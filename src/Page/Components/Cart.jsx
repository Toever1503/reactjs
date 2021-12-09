import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../css/cart.css";
export default function Cart() {
    const dispatch = useDispatch();
    const carts = useSelector((state)=>state.cart);
    console.log(carts)

  return (
    <>
      <div className="cart-container position-absolute">
        <h3 className="text-center">Giỏ hàng</h3>
        <table className="cart-list">
          <thead>
            <tr>
              <th></th>
              <th>Sản Phẩm</th>
              <th>Giá</th>
              <th>Số lượng </th>
            </tr>
          </thead>
          <tbody>
            {carts.length !=0 && carts.map((cart) => (
              <tr>
                <td>
                  <img
                    className="d-block m-auto"
                    width="80px"
                    height="100px"
                    src="http://placeimg.com/640/480/animals"
                    alt=""
                  />
                </td>
                <td>Smanfffaa</td>
                <td>12999419</td>
                <td>
                  <input
                    type="number"
                    value="1"
                    min="1"
                    max="1000"
                    step="1"
                    onChange={(e) => {
                      console.log((e.target.value = e.target.value));
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
