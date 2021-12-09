import Breadcrumb from "./Components/Breadcrumb.jsx";
import Category from "./Components/Product_filter.jsx";
import  './css/header.css';
import  './css/cat.css';
import  './css/product.css';
import  './css/home.css';
import ProductList from "./Components/ProductList.jsx";
import { useEffect, useState } from "react";
import {getListProduct} from '../api/websiteApi.jsx';

export default function Home(){

    const [productBanner, setProductBanner] = useState([]);
    const [products, setProducts] = useState([]);
    useEffect(()=>{
        getListProduct()
          .then((res) => {
            setProducts(res['data'].slice(3, 23));
            setProductBanner(res["data"].slice(1,3));
          })
          .catch((error) => console.log(error));
    },[]);
    let check = 1;
    function Slide(){
      return (
        <>
          {  
          productBanner.map(product => {
            const item = (<div className={'carousel-item '+ (productBanner[0].id==product.id ?'active': '')} >
                <a href={product.name + "/" + product.id}>
                  <img src={product.imageBanner} alt={product.name} />
                </a>
              </div>)
            return item;
          })
          
          }
        </>
      );
    }

    return (
      <>
        <div id="product-slide" className="carousel slide" data-ride="carousel">
          {/* <!-- Indicators --> */}
          <ul className="carousel-indicators">
            <li
              data-target="#product-slide"
              data-slide-to="0"
              className="active"
            ></li>
            <li data-target="#product-slide" data-slide-to="1"></li>
            <li data-target="#product-slide" data-slide-to="2"></li>
          </ul>

          {/* <!-- The slideshow --> */}
          <div className="carousel-inner">
            <Slide />
          </div>

          {/* <!-- Left and right controls --> */}
          <a
            className="carousel-control-prev"
            href="#product-slide"
            data-slide="prev"
          >
            <span className="carousel-control-prev-icon"></span>
          </a>
          <a
            className="carousel-control-next"
            href="#product-slide"
            data-slide="next"
          >
            <span className="carousel-control-next-icon"></span>
          </a>
        </div>
        {
          /* end carousel */
        }
        <div className="section-product">
          <h4>Sản Phẩm Mới</h4>
          <ProductList listProduct={products} />
        </div>
        {/* <div className="section-product">
          <h4>Action</h4>
          <ProductList filter="" />
        </div>
        <div className="section-product">
          <h4>Romance</h4>
          <ProductList filter="" />
        </div> */}
      </>
    );
}
