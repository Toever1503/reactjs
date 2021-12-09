import { useState } from "react";

export default function FormSearch(){
    const [search, setSearch] = useState('');
    return (
      <form onSubmit={(e)=>{
          e.preventDefault();
          window.location.replace('/search/'+search);
      }}>
        <input type="text" style={{fontSize: '12px'}} value={search} defaultValue='' onChange={(e)=>{
            setSearch(e.target.value);
        }} placeholder='Nhập tên sản phẩm' />
        <i className="fas fa-search"></i>
      </form>
    );
}