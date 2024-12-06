"use client";
import { useEffect, useState } from "react";
import PostItem from "./components/postItem";
import { questionListRequest } from "@/util/server";
import InfiniteScroll from "react-infinite-scroll-component";
import Link from "next/link";

interface PostItemProp {
  id: string;
  title: string;
  explanation: string;
  userID: string;
  createAt: Date;
}

export default function Home() {
  const [posts, setPosts] = useState<PostItemProp[]>([]); // 投稿一覧
  const [page, setPage] = useState(0); // ページ数
  const [hasMore, setHasMore] = useState(true); // 次があるか

  const fetchData = async () => {
    try {
      const rs = await questionListRequest({
        baseURL: window?.localStorage.getItem("select") as string,
        page: page,
        size: 10,
      });
      if (!rs) return;
      const newPosts = rs.data;

      //次のページがなければ
      if (!newPosts.next) {
        setHasMore(false);
      }

      // 追加
      setPosts((p) => [...p, ...newPosts.items]);
      setPage((page) => page + 1);
    } catch (e) {
      console.log(e);
      setHasMore(false);
    }
  };

  // 初回ロード
  useEffect(() => {
    return () => {
      fetchData();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="">
      <div className="fs-1 text-shadow">Try{"{"}</div>
      <div className="mx-5">
        <InfiniteScroll
          className="h-100 w-100 overflow-visible"
          dataLength={posts.length} // 現在のアイテム数
          next={fetchData} // 次のデータ読み込み用の関数
          hasMore={hasMore} // 無限スクロール可能か
          loader={
            <div className="row align-items-center justify-content-center m-2 mt-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          } // ロード中の表記
          endMessage={
            <div className="fs-1 text-shadow">
              <div>{"} chat{"}</div>
              <div className="ms-5">Console.log({'"No Data"'})</div>
              <div>{"}"}</div>
            </div>
          } // 最後の表記
        >
          <div>
            {posts.map((post) => (
              <Link key={post.id} href={`/question/${post.id}`}>
                <PostItem
                  key={post.id}
                  userId={post.userID}
                  title={post.title}
                  message={post.explanation}
                />
              </Link>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
}
