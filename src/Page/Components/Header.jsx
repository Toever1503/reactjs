import { signOut } from "@firebase/auth";
import { googleAuth } from "../../Firebase/firebase.config";
import FormSearch from "./FormSearch";

export default function Header() {
  return (
    <header>
      <nav className="container">
        <a href="/">
          <div className="logo-web"></div>
        </a>
        <div className="main-menu">
          <div className="menu-item">
            <a href="/category/1">Sản Phẩm 1</a>
          </div>
          <div className="menu-item">
            <a href="/category/2">Sản Phẩm 2</a>
          </div>
          <div className="menu-item">
            <a href="/contact">Liên hệ</a>
          </div>
          {/* <div className="menu-item">
              <a href="/">Đồ lưu niệm</a>
            </div> */}
        </div>
        <div className="seach-bar" style={{ paddingTop: 10 }}>
          <FormSearch />
        </div>
        <div className="user-account ml-2">
          {!localStorage.getItem("has_logged") ? (
            <LoginLogout />
          ) : (
            <div
              className="btn btn-outline-primary p-1 mt-2 ml-3"
              onClick={() => {
                signOut(googleAuth)
                  .then(() => {
                    localStorage.removeItem("has_logged");
                    window.location.reload();
                  })
                  .catch((error) => console.log(error));
              }}
            >
              Đăng Xuất
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

function LoginLogout() {
  return (
    <div className="d-flex" style={{ paddingTop: 6 }}>
      <div className="btn btn-outline-primary mr-1">
        <a href="/login">Đăng nhập</a>
      </div>
      <div className="btn btn-outline-primary">
        <a href="/register">Đăng ký</a>
      </div>
    </div>
  );
}
