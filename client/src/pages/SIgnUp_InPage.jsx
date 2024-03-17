import React, { useState } from "react";
import style from "../style/SignUp_InPage.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const SIgnUp_InPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(null);
  const navigate = useNavigate()
  const LoginHandler = async () => {
    if (!email || !password || isAdmin === null) {
      alert("all fields are required!");
      return;
    }
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!regex.test(email)) {
        alert("please enter valid email id")
        return;
    }

    try {
      const postData = await axios.post(
        `http://localhost:4000/api/v1/users/signin`,
        {
          email,
          password,
          isAdmin,
        }
      );
      if (postData.data.message) {
        alert(postData.data.message);
        return;
      }
      localStorage.setItem("token", JSON.stringify(postData.data.token))
      localStorage.setItem("userId", JSON.stringify(postData.data.id))
      localStorage.setItem("isAdmin", JSON.stringify(postData.data.admin))
      
      postData.data.admin ? navigate("/admin") : navigate("/team-member")
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={style.parent}>
      <div className={style.child}>
        <div className={style.Header}>
          <h2>Register or Login</h2>
        </div>
        <div className={style.inputFields}>
          <div className={style.email}>
            <input
              type="text"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={style.password}>
            <input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className={style.isAdminField}>
          <div>
            <input
              type="radio"
              onChange={(e) => setIsAdmin(true)}
              checked={isAdmin === true}
            />
            <label htmlFor="">admin</label>
          </div>
          <div>
            <input
              type="radio"
              onChange={(e) => setIsAdmin(false)}
              checked={isAdmin === false}
            />
            <label htmlFor="">team member</label>
          </div>
        </div>
        <div className={style.reg_login}>
          <button onClick={LoginHandler}>Register/Login</button>
        </div>
      </div>
    </div>
  );
};

export default SIgnUp_InPage;
