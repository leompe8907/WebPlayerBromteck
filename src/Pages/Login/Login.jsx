import "./Login.scss";

import logoB from "../../Media/Img/logoB.png";
import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"
import md5 from "md5";

import GetUdid from "../../CV/Udid.js";
import { CV } from "../../CV/cv.js";

const apiToken = "iKBHPqlolcxiVgZrAcvK"

function Login() {

  const navigate = useNavigate()

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  useEffect(() => {
    GetUdid();
  },[]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const passwordHash = md5(password+"_panaccess");
    CV.call(
        "clientLogin",
        {
          apiToken:apiToken,
          clientId:username,
          pwd:passwordHash,
          udid:localStorage.getItem("udid")
        },
        (result) => {
          if(result["success"]){
          const sessionId = result["answer"]
          localStorage.setItem("sessionId",sessionId)
          navigate("/profile")
          if (localStorage.getItem(sessionId) === ""){
            alert("failed to fetch result" +result["errorMessage"])
          }
          }else{
          alert("failed to fetch result"+result["errorMessage"])
          }
        }
    )
    CV.call("getResponsibleServer",
    {
      sessionId: localStorage.getItem("sessionId"),
      username:username,
    },
    (result) => {
        if (result["success"]) {
            const data = result["answer"];
            console.log(data);
        }else{
            alert("failed to fetch result" + result["errorMessage"]);
        }
    }
    )
  }


  return (
    <>
      <div className="Background">
        <div className="Login">
          <div className="logo">
            <img src={logoB} alt="Logo" className="Logo" />
          </div>
          <form onSubmit={handleSubmit} className="formLogin">
            <div className="" >
              <input
                type="text"
                id="username"
                className="user"
                autoComplete="off"
                value={username}
                placeholder="Usuario..."
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="" >
              <input
                type="password"
                id="password"
                className="user"
                autoComplete="off"
                value={password}
                placeholder="Password..."
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="button"> Sign In </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
