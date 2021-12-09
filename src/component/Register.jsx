import {
  ActionCodeURL,
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  reauthenticateWithCredential,
  reauthenticateWithPopup,
  sendEmailVerification,
  sendSignInLinkToEmail,
  signInWithPopup,
} from "@firebase/auth";
import {
  getUserByUsername,
  getAllUser,
  createUser,
} from "../api/accountApi.jsx";

import React, { useState } from "react";
import { googleAuth } from "../Firebase/firebase.config.jsx";
import { useForm } from "react-hook-form";
import loginStyle from "./css/Login.module.css";

export default function Register() {
  const isLogged = localStorage.getItem("has_logged");
  if (isLogged && isLogged === "true") window.location.replace("/");

  return (isLogged===null | isLogged === "false")&&(
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
          <h1 className="text-center">Đăng ký</h1>
          <Register_Form />
          {/* end login form */}
        </div>
      </div>
    </>
  );
}

function Register_Form() {
  const provider = new GoogleAuthProvider();
  const [notice, setNotice] = useState({
    result: false,
    message: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();
  function user_register(data) {
    const user = {
      id: new Date().getTime(),
      username: data.username,
      email: data.email,
      password: data.password,
      role: 'user'
    };
    console.log(user);

    getAllUser()
      .then((res) => {
        if (
          res["data"].find((u) => {
            if ((u.username == user.username) | (u.email == user.email))
              return u;
          }) != null
        ) {
          setNotice({
            result: false,
            message: "Tài khoản đã đã tồn tại!",
          });
        } else {
          createUserWithEmailAndPassword(googleAuth, user.email, user.password)
            .then((credential) => {
              createUser(user)
                .then((result) => {
                  if (JSON.stringify(user) === JSON.stringify(result["data"])) {
                    setNotice({
                      result: true,
                      message:
                        "Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ",
                    });
                    reset({
                      username: "",
                      password: "",
                      confirm_password: "",
                      email: "",
                    });
                  }
                })
                .catch((error) => console.log(error));
            })
            .catch((errors) => {
              console.log(errors.message);
              console.log(errors.code);
              if (errors.code === "auth/email-already-in-use")
                setNotice({
                  result: false,
                  message: "Tài khoản đã tồn tại!",
                });
              else
                setNotice({
                  result: false,
                  message: "Đăng ký thất bại!",
                });
            });
        }
      })
      .catch((error) => console.log(error));
  }
  return (
    <>
      <form onSubmit={handleSubmit(user_register)}>
        <div className="form-group ">
          <label for="username">Tài Khoản:</label>
          <input
            type="text"
            className="form-control mb-1"
            id="username"
            placeholder="Tài khoản"
            {...register("username", {
              required: true,
            })}
          />
          {errors.username && (
            <p
              className="notice bg-warning p-1 rounded-5 d-inline mt-1"
              style={{ fontSize: "12px" }}
            >
              Tên tài khoản không được bỏ trống
            </p>
          )}
        </div>
        <div className="form-group">
          <label for="password">Mật Khẩu:</label>
          <input
            type="password"
            className="form-control mb-1"
            id="password"
            placeholder="Nhập mật khẩu"
            {...register("password", {
              required: true,
              pattern: "{6,}",
              minLength: 6,
            })}
          />
          {errors.password && (
            <p
              className="notice bg-warning p-1 rounded-5 d-inline mt-1"
              style={{ fontSize: "12px" }}
            >
              Mật khẩu phải từ 6 ký tự trở lên
            </p>
          )}
        </div>
        <div className="form-group">
          <label for="confirm_password">Nhập Lại Mật Khẩu:</label>
          <input
            type="password"
            className="form-control mb-1"
            id="confirm_password"
            placeholder="Nhập lại mật khẩu"
            {...register("confirm_password", {
              validate: (a) => {
                if (!(a === getValues("password"))) return false;
              },
            })}
          />
          {errors.confirm_password && (
            <p
              className="notice bg-warning p-1 rounded-5 d-inline mt-1"
              style={{ fontSize: "12px" }}
            >
              Mật khẩu nhập lại không khớp
            </p>
          )}
        </div>
        <div className="form-group">
          <label for="email">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Nhập email"
            {...register("email")}
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
          className={
            "submit btn btn-outline-success d-inherit mr-3 " +
            (!notice.result ? "" : "disabled")
          }
          type="submit"
          value="Đăng ký"
        />
        <div
          className={"btn btn-outline-success " + loginStyle.login_via_google}
          onClick={() => {
            window.location.replace("/login");
          }}
        >
          Đăng nhập
        </div>
      </form>
    </>
  );
}

