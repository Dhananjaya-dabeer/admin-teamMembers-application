import React, { useContext, useState } from "react";
import style from "../style/DescriptionPage.module.css";
import ProductContext from "../context/productContext";
import EditFieldComp from "../components/EditFieldComp";
const DescriptionPage = () => {
  const { uniqueElement } = useContext(ProductContext);
  const [popup, setPopoup] = useState(false);
  const setPopuptoFalse = () => {
    setPopoup(false);
  };
  return (
    <div className={popup && style.parent} onClick={() => setPopoup(false)}>
      <div className={style.child}>
        <div className={style.renderedProduct}>
          {uniqueElement && (
            <div className={style.renderedElements}>
              <div className={style.image}>
                <img src={uniqueElement.image[0]} alt="" />
                {uniqueElement.image > 1 &&
                  uniqueElement.image.map((item) => {
                    <div className={style.smallImages}>
                      <img src={item} alt="" />
                    </div>;
                  })}
              </div>
              <div className={style.productInfo}>
                <div className={style.productName}>
                  <span className={style.bold}>Product Name :</span>{" "}
                  <span> {uniqueElement.productName} </span>
                </div>
                <div className={style.productDescription}>
                  <span className={style.bold}> ProductDescription :</span>
                  <span>{uniqueElement.productDescription} </span>
                </div>
                <div className={style.price}>
                  <span className={style.bold}>Price :</span>{" "}
                  <span>₹ {uniqueElement.price} </span>
                </div>
              </div>
            </div>
          )}
        </div>
        {uniqueElement && (
          <div className={style.makeChnages}>
            <button
              onClick={(e) => {
                setPopoup(!popup);
                e.stopPropagation();
              }}
            >
              Make Changes
            </button>
          </div>
        )}
      </div>
      <div className={style.editFieldComp} onClick={(e) => e.stopPropagation()}>
        {popup && (
          <div className={style.croosElement}>
            <img
              src="https://i.ibb.co/z8hMrfx/2919590.png"
              alt=""
              onClick={() => setPopoup(false)}
            />
          </div>
        )}
        {popup && <EditFieldComp prop={uniqueElement} />}
      </div>
    </div>
  );
};

export default DescriptionPage;
