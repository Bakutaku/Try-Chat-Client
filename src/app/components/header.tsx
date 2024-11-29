import Logo from "./Logo";
import Link from "next/link";
import User from "./user";

/**
 * ヘッダー
 */
export default function Header() {
  return (
    <header>
      <div className="row">
        <div className="col-3 ms-2 d-flex align-items-center">
          <Logo />
        </div>
        <form
          role="search"
          className="col-5 d-flex align-items-center justify-content-center"
        >
          <button
            type="submit"
            className="mx-3 btn rounded-circle shadow bg-white d-flex align-items-center justify-content-center"
            style={{ width: "35px", height: "35px" }}
          >
            <i className="bi bi-search d-inline-block fs-6"></i>
          </button>
          <input
            type="search"
            className="form-control rounded-pill shadow"
            placeholder="検索"
            aria-label="Search"
          />
        </form>
        <div className="col-3 d-flex align-items-center justify-content-end">
          <Link
            href="/question/post"
            className="btn btn-post text-white shadow me-2"
          >
            <i className="bi bi-pencil-square"></i>投稿
          </Link>
          <User />
        </div>
      </div>
    </header>
  );
}
