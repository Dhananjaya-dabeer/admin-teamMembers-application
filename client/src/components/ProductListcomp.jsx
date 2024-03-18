import React, { useContext, useEffect, useState } from "react";
import style from "../style/ProductListcomp.module.css";
import axios from "axios";
import {useNavigate} from "react-router-dom"
import ProductContext from "../context/productContext";
const ProductListcomp = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate()
  const {setUniqueElement} = useContext(ProductContext)

  useEffect(() => {
    (async () => {
      try {
        const productData = await axios.get(
          "http://localhost:4000/api/v2/products/data/products"
        );
        setData(productData.data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const clickHandler = (item) => {
    setUniqueElement(item)
    navigate("/description")
  }
  return (
    <div className={style.parent}>
      <div className={style.child}>
        <div className={style.productList}>
          {data &&
            data.length &&
            data.map((item) => (
              <div key={item._id} className={style.renderedProducts}>
                <div className={style.uniqueProduct}>
                  <div className={style.renderedImage}>
                    <img src={item.image[0]} alt="" onClick={() => clickHandler(item)} />
                  </div>
                  <div className={style.productName}>
                    <p>{item.productName}</p>
                  </div>
                  <div className={style.price}>
                    <p>₹{item.price}</p>
                  </div>
                  <div className="department">
                    <span>Department: </span> <span> {item.department}</span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductListcomp;
