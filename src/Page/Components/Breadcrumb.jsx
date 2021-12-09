export default function Breadcrumb(props){

    return (
      <>
        <div style={{ margin: "10px 0" }}>
          <a href="/">Trang chủ</a> {">"} {props.name}
        </div>
      </>
    );
}