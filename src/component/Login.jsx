import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "@firebase/auth";
import React, { useState } from "react";
import { googleAuth } from "../Firebase/firebase.config.jsx";
import { useForm } from "react-hook-form";
import loginStyle from "./css/Login.module.css";
import { createUser, getAllUser } from "../api/accountApi.jsx";

export default function Login() {
  const isLogged = localStorage.getItem("has_logged");
  if (isLogged && isLogged === "true") window.location.replace("/");

  return (
    (isLogged === null) | (isLogged === "false") && (
      <>
        <div className="container">
          <div className={loginStyle.user_login}>
            <a href="/">
              <img
                className="d-block"
                src="https://seeklogo.com/images/M/manga-logo-26D5521A34-seeklogo.com.png"
                alt=""
                style={{ margin: "auto" }}
              />
            </a>
            <h1 className="text-center">Đăng nhập</h1>
            <Login_Form />
            {/* end login form */}

            <div className={loginStyle.login_method}>
              <div
                className="sign_up btn btn-outline-success"
                onClick={() => {
                  window.location.replace("/register");
                }}
              >
                Đăng ký tài khoản mới
              </div>
            </div>
            {/* end login action */}
          </div>
        </div>
      </>
    )
  );
}

function Login_Form() {
  const [notice, setNotice] = useState({
    result: false,
    message: "",
  });
  const { register, handleSubmit } = useForm();

  function user_login(data) {
    getAllUser()
      .then((res) => {
        const user = res["data"].map((u) => {
          if (
            (JSON.stringify(u.email) === JSON.stringify(data.username)) |
            (u.username == data.username)
          )
            return u;
        });

        if ((user.length > 1) | (user[0] == null)) {
          setNotice({
            result: true,
            message: "Tài khoản hoặc mật khẩu không chính xác!",
          });
        } else {
          if (user[0].password != data.password) {
            setNotice({
              result: true,
              message: "Tài khoản hoặc mật khẩu không chính xác1!",
            });
          } else {
            setNotice({
              result: true,
              message: "Đăng nhập thành công! Bạn sẽ được quay về trang chủ!",
            });
            localStorage.setItem("has_logged", "true");
            console.log(user[0].email);
            signInWithEmailAndPassword(googleAuth, user[0].email, data.password)
              .then((userCredential) => {
              })
              .catch((error) => {
                console.log(error)
                signInWithEmailAndPassword(
                  googleAuth,
                  user[0].email,
                  data.password
                );
              });
              window.location.replace("/");
          }
        }
      })
      .catch((error) => {
        console.log(error);
        setNotice({
          result: true,
          message: "Đăng nhập thất bại!",
        });
      });
  }
  return (
    <>
      <form onSubmit={handleSubmit(user_login)}>
        <div className="form-group ">
          <label for="username">Tài Khoản:</label>
          <input
            type="text"
            name="username"
            id="username"
            className="form-control"
            {...register("username")}
            required
          />
        </div>
        <div className="form-group">
          <label for="password">Mật Khẩu:</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Nhập mật khẩu"
            {...register("password")}
            required
          />
        </div>
        <p
          className={
            "notice bg-warning " + (notice.result ? "pl-2 pt-1 pb-1" : "")
          }
          style={{ fontSize: "13px" }}
        >
          {notice.message}
        </p>

        <input
          className="submit btn btn-outline-success d-inherit mr-3"
          type="submit"
          value="Đăng nhập"
        />
        <GoogleSignin
          setMessage={(message) => {
            setNotice(message);
          }}
        />
      </form>
    </>
  );
}

function GoogleSignin(props) {
  function signinWithGoogle() {
    signInWithPopup(googleAuth, new GoogleAuthProvider())
      .then((userCredential) => {
        if (userCredential == null)
          props.setMessage({
            result: true,
            message: "Đăng nhập thất bại!",
          });
        else {
          localStorage.setItem("has_logged", "true");
          props.setMessage({
           result: true,
           message: "Đăng nhập thành công! Bạn sẽ được quay về trang chủ!",
         });
         console.log(userCredential.user.email)
         console.log(userCredential.user.uid)
         getAllUser().then(res=>{
           let check = 0;
           res["data"].map((u) => {
             if (u.email === userCredential.user.email) {
               check = 1;
             }
           });
           if (check == 0) {
             createUser({
               id: new Date().getTime(),
               username: userCredential.user.uid,
               password: "",
               role: "user",
               email: userCredential.user.email,
             }).catch((error) => console.log(error));
           }

           window.location.replace('/');
         }).catch(error=> console.log(error))
         
          
        }
      })
      .catch((error) => console.log(error));
  }

  return (
    <div
      className={"btn btn-outline-success " + loginStyle.login_via_google}
      onClick={signinWithGoogle}
    >
      Đăng nhập với google
    </div>
  );
}
