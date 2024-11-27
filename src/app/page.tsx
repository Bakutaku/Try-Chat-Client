"use client";
import { useEffect, useState } from "react";
import PostItem from "./components/postItem";
import { questionListRequest } from "@/util/server";
import InfiniteScroll from "react-infinite-scroll-component";

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
        baseURL: "http://127.0.0.1:8081",
        page: page,
        size: 10,
      });
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
        {/* TODO テスト用 */}
        <PostItem
          userName="UserName"
          title="タイトル"
          message="質問内容"
          userIcon="Try-Chat_icon.svg"
        />
        <InfiniteScroll
          dataLength={posts.length} // 現在のアイテム数
          next={fetchData} // 次のデータ読み込み用の関数
          hasMore={hasMore} // 無限スクロール可能か
          loader={<h1>ロード中</h1>} // ロード中の表記
          endMessage={<h1>最後</h1>} // 最後の表記
        >
          <>
            {posts.map((post) => (
              <div key={post.id} style={{}}>
                {post.title}
              </div>
            ))}
          </>
        </InfiniteScroll>
      </div>
    </div>
  );
}
