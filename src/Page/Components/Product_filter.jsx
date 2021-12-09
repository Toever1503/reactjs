import { useEffect, useState } from "react";
import $ from 'jquery';

export default function Product_filter(props) {
  const [cat, setCat] = useState([]);
  const [filter, setFilter] = useState([]);


  function filterOnChange(c){
    const catId = c.target.dataset.catid; 
    if (filter.indexOf(catId) == -1) {
      c.target.style.background = "aquamarine";
      setFilter([...filter, catId]);
    } else {
      setFilter(filter.filter((id) => id != catId));

      c.target.style.background = "";
    }
  }
  function filterSubmit(){
    props.setListProduct(filter);
  }

  useEffect(() => {
    
    fetch("https://618d287fedab980017fd5248.mockapi.io/api/v1/Cat")
      .then((res) => res.json())
      .then((result) => {
        setCat(result);
      })
      .catch((error) => console.log(error));
  }, []);



  return (
    <div className="product-cat" style={{ border: "1px solid black" }}>
      <h3 style={{ textAlign: "center" }}>Lọc</h3>
      <div className="cat-list">
        {cat.map((x) => (
          <p className='cat-item'
            style={{ cursor: "pointer" }}
            data-catId={x.id}
            onClick={filterOnChange}
          >
            {x.name}
          </p>
        ))}
      </div>
      <button onClick={filterSubmit} className="btn btn-outline-success m-1">
        Lọc
      </button>
      <button className="btn btn-outline-success m-1" onClick={()=>{
        props.refreshOriginal();
        setFilter([])
        let list = document.getElementsByClassName("cat-item");
        for(let i = 0; i < list.length; ++i){
          list[i].style.background='';
        }
      }}>Bỏ lọc</button>
    </div>
  );
}