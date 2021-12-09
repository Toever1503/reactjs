import Breadcrumb from "./Components/Breadcrumb";
import "./css/contact.css";

export default function Contact() {
  return (
    <>
      <div className="main-content" style={{ minHeight: "700px" }}>
        <Breadcrumb name="Liên Hệ" />
        <div className="m-auto" style={{ width: "800px" }}>
          <img
            src="https://toplist.vn/images/800px/nha-sach-phuong-nam-562779.jpg"
            alt=""
          />
        </div>
        <div className="DiaChi">
          <h3>Địa chỉ mua hàng:</h3>
          <p>
            Cơ sở 1: 212 ấp hung thanh, Xã Hưng Lộc, Huyện Thống Nhất, Đồng Nai
            <p>SĐT: 0355296245 </p>
          </p>
          <p>
            Cơ sở 2: 84 Nga Chương Huyện Phú Lương, Thái Nguyên
            <p>SĐT: 0648789478 </p>
          </p>
          <p>
            Cơ sở 3: 36 Tân Bình, Phường Tân Phước Khánh, Thị xã Tân Uyên, Bình
            Dương
            <p>SĐT: 0546795985 </p>
          </p>
          <p>
            Mọi khó khăn hoặc cần tư vấn thêm về sản phẩm, mọi người có thể liên
            hệ qua facebook:
            <a href="https://www.facebook.com/truyenmoinhatz">Tại đây</a> hoặc
            SĐT 1800.1060 ( trong giờ hành chính 7h-22h)
          </p>
        </div>
      </div>
    </>
  );
}
