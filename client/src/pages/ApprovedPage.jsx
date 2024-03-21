import React, { useEffect, useState } from "react";
import style from "../style/PendingPage.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ApprovedPage = () => {
    const [requestInfo, setRequestInfo] = useState([]);
    const userId = JSON.parse(localStorage.getItem("userId"));
    const navigate = useNavigate();
    useEffect(() => {
      try {
        (async () => {
          const requestData = await axios.get(
            `https://admin-teammembers-application.onrender.com/api/v3/approval/requestdata?userId=${userId}`
          );
          if (requestData.data.data) {
            setRequestInfo(requestData.data.data);
          } else {
            alert(requestData.data.message);
            navigate("/team-member");
          }
        })();
      } catch (error) {}
    }, []);
    console.log(
      requestInfo.map((item) => {
        return item.productInfo.changesForApproval.image;
      })
    );
    return (
      <div className={style.parent}>
        <div className={style.child}>
          <div className={style.requestsRenderd}>
            {requestInfo &&
              requestInfo.length &&
              requestInfo.map((item) => {
                return (
                  item.productInfo.isPending == false && item.productInfo.isApproved.approved == true && (
                    <div key={item._id} className={style.parentImgInfo}>
                      <div className={style.img}>
                        <img
                          src={item.productInfo.changesForApproval.image[0]}
                          alt=""
                        />
                        <div className={style.smallImg}>
                          {item.productInfo.changesForApproval.image.length > 1 &&
                            item.productInfo.changesForApproval.image.map(
                              (item, index) =>
                                index > 0 && <img src={item} alt="" />
                            )}
                        </div>
                      </div>
                      <div className={style.reqestedChanges}>
                        <div className={style.name}>
                          <span className={style.bold}>ProductName:</span>
                          <span>
                            {item.productInfo.changesForApproval.productName}{" "}
                          </span>
                        </div>
                        <div className={style.productDescription}>
                          <span className={style.bold}>Product Description:</span>
                          <span>
                            {
                              item.productInfo.changesForApproval
                                .productDescription
                            }
                          </span>
                        </div>
                        <div className={style.price}>
                          <span className={style.bold}>Price : </span>
                          <span>{item.productInfo.changesForApproval.price}</span>
                        </div>
                        <div className={style.isPending}>
                          <span className={style.bold}>Request : </span>
                          <span>Approved</span>
                        </div>
                      </div>
                    </div>
                  )
                );
              })}
          </div>
        </div>
      </div>
    );
}

export default ApprovedPage
