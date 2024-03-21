import React, { useEffect, useState } from "react";
import style from "../style/PendingPage.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const PendingPage = () => {
  const [requestInfo, setRequestInfo] = useState([]);
  const userId = JSON.parse(localStorage.getItem("userId"));
  const isUserAdmin = JSON.parse(localStorage.getItem("isAdmin"));
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
    } catch (error) {
      console.log(error);
    }
  }, []);

  const approveHandler = async (memberId) => {
    const request = {
      adminId: userId,
      isApproved: true,
      isPending: false,
      productId: memberId.productInfo.productId,
      memberId: memberId.userId,
    };
    try {
      const postRequest = await axios.patch(
        "https://admin-teammembers-application.onrender.com/api/v3/approval/approvalRequest",
        request
      );

      if (postRequest.data.message) alert(postRequest.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  const rejectHandler = async (memberId) => {
    const request = {
      adminId: userId,
      isApproved: false,
      isPending: false,
      productId: memberId.productInfo.productId,
      memberId: memberId.userId,
    };
    try {
      const postRequest = await axios.patch(
        "https://admin-teammembers-application.onrender.com/api/v3/approval/approvalRequest",
        request
      );

      if (postRequest.data.message) alert(postRequest.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(
    requestInfo.map((item) => {
      return item;
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
                item.productInfo.isPending == true &&
                item.productInfo.isApproved.approved == false && (
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
                        <span>Pending</span>
                      </div>
                    </div>
                    {isUserAdmin && (
                      <div className={style.button}>
                        <button
                          className={style.approve}
                          onClick={() => approveHandler(item)}
                        >
                          Approve
                        </button>
                        <button
                          className={style.reject}
                          onClick={() => rejectHandler(item)}
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                )
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default PendingPage;
