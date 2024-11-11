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
        <form role="search" className="col-5 d-flex align-items-center justify-content-center">
            <button type="submit" className="mx-5 btn rounded-circle shadow">
              <i className="bi bi-search"></i>
            </button>
            <input type="search" className="form-control rounded-pill shadow" placeholder="検索" aria-label="Search"/>
        </form>
        <div className="col-3 d-flex align-items-center justify-content-end">
          <button className="btn btn-post text-white shadow"><i className="bi bi-pencil-square"></i>投稿</button>
          <Image src={"https://placehold.jp/150x150.png"} alt={"User Icon"} className="rounded-circle bg-base-4 ms-3 shadow" width={50} height={50} />
        </div>
      </div>
    </header>
  );
}