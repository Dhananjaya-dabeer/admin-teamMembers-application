import React from "react";
import style from "../style/AdminPage.module.css";
import ProductListcomp from "../components/ProductListcomp";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
 
       const navigate = useNavigate();
  return (
    <div className={style.parent}>
      <div className={style.child}>
        <div className={style.nav}>
          <div className={style.approved}>
            <p onClick={() => navigate("/ApprovedPage")}>Approved</p>
          </div>
          <div className={style.rejected}>
            <p onClick={() => navigate("/rejectedPage")}>Rejected</p>
          </div>
          <div className={style.pending}>
            <p onClick={() => navigate("/pendingPage")}>Pending</p>
          </div>
        </div>
        <div className={style.admin_temaMember}>
          {JSON.parse(localStorage.getItem("isAdmin")) ? (
            <p>Hi Admin</p>
          ) : (
            <p>Hi Team Member</p>
          )}
        </div>
        <ProductListcomp />
      </div>
    </div>
  );
};

export default AdminPage;
