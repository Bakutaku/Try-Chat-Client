import Image from "next/image";
import Logo from "./Logo";


/**
 * ヘッダー
 */
export default function Header(){
  return (
    <header>
      <div className="row">
        <div className="col-3 ms-2 d-flex align-items-center"><Logo/></div>
        <div className="col-5 d-flex align-items-center justify-content-center">a</div>
        <div className="col-3 d-flex align-items-center justify-content-end">
          <button className="btn btn-post text-white"><i className="bi bi-pencil-square"></i>投稿</button>
          <Image src={"https://placehold.jp/150x150.png"} alt={"User Icon"} className="rounded-circle bg-base-4 ms-3" width={50} height={50} />
        </div>
      </div>
    </header>
  );
}