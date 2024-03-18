import React, { useState } from "react";
import style from "../style/EditFieldComp.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const EditFieldComp = ({ prop }) => {
  const [productInfo, setProductInfo] = useState({
    productName: "",
    price: "",
    image: [],
    productDescription: "",
    isPending: true,
    isApproved: false,
    productId: prop._id,
  });
  const userId = JSON.parse(localStorage.getItem("userId"));
  const navigate = useNavigate();
  const submitHandler = async () => {
    if (
      !(productInfo.image.length >= 1) ||
      !productInfo.price ||
      !productInfo.productName ||
      !productInfo.productDescription
    ) {
      alert("all fields are required!");
      return;
    }

    try {
      const postProductInfo = await axios.post(
        "http://localhost:4000/api/v3/approval/modify",
        {
          userId,
          productInfo,
        }
      );
      if (postProductInfo.data.message) {
        alert(postProductInfo.data.message);
       JSON.parse(localStorage.getItem("isAdmin")) ?  navigate("/admin") :  navigate("/pendingPage");
      }
    } catch (error) {}
  };
  return (
    <div className={style.parent}>
      <div className={style.child}>
        <div className={style.imagelink}>
          <input
            type="text"
            placeholder="Give links in comma-separated format."
            onChange={(e) =>
              setProductInfo({
                ...productInfo,
                image: e.target.value.split(","),
              })
            }
          />
        </div>
        <div className={style.productName}>
          <input
            type="text"
            placeholder="Product Name"
            onChange={(e) =>
              setProductInfo({ ...productInfo, productName: e.target.value })
            }
          />
        </div>
        <div className={style.productDescription}>
          <input
            type="text"
            placeholder="product description"
            onChange={(e) =>
              setProductInfo({
                ...productInfo,
                productDescription: e.target.value,
              })
            }
          />
        </div>
        <div className={style.price}>
          <input
            type="text"
            placeholder="price"
            onChange={(e) =>
              setProductInfo({ ...productInfo, price: e.target.value })
            }
          />
        </div>
        <div className={style.button}>
          {JSON.parse(localStorage.getItem("isAdmin")) ? (
            <button onClick={submitHandler}>save changes as admin</button>
          ) : (
            <button onClick={submitHandler}>Submit changes for approval</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditFieldComp;
