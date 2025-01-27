import React from "react";
import "./App.css";
import { useState, useEffect } from "react";

export default function App() {

  const[loading,setLoading] = useState(false);
  const[products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [disableButton, setDisableButton] = useState(false);

  async function fetchProducts() {
    try {
      setLoading(true);
      const response = await fetch(
        `https://dummyjson.com/products?limit=20&skip=${count === 0 ? 0: count * 20}`
      );

      const result =  await response.json();

      if(result && result.products && result.products.length){
        setProducts([...products, ...result.products]);
        setLoading(false);
      }
      console.log(result)
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [count]);

  useEffect(()=>{
    if(products && products.length === 100){
      setDisableButton(true);
    }
  },[products]);

  if(loading){
    return <div className="loading">Loading data! Please Wait.</div>
  }

  return <div className="container">
    <div className="product-container">
      {
        products && products.length ? 
        products.map((product)=>(
          <div className="product" key={product.id}>
            <img src={product.thumbnail} alt={product.title}/>
            <p>{product.title}</p>
          </div>
        ))
        :null
      }
    </div>
    <button disabled={disableButton} className="btn" onClick={()=> setCount(count + 1)}>Load More Products</button>
    {
      disableButton ? <p className="message">You have reached to 100 Products.</p>:null
    }
  </div>;
}
