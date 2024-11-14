"use client";

import DnDFlowEdit from "../components/flow/DnDFlow";

/**
 * 投稿ページ
 */
export default function Post() {
  return (
    <div className="row align-items-center justify-content-center m-2">
      <div className="d-flex justify-content-center">
        <div className="h1 col">質問</div>
        <div className="float-right">
          <button className="btn btn-post text-white fs-4 p-1 px-3">
            投稿
          </button>
        </div>
      </div>
      <div
        className="border border-5 rounded-5 shadow border-edit"
        style={{ width: "70vw", height: "70vh" }}
      >
        <DnDFlowEdit miniMap controls debug />
      </div>
    </div>
  );
}
