"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import breaks from "remark-breaks";
import { getUserProfile } from "@/util/server";
import { useEffect, useState } from "react";

interface Data {
  userId: string;
  title: string;
  message: string;
}

/**
 * ホーム画面で使用する投稿を表示するやつ
 */
export default function PostItem(data: Data) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(); // ユーザプロフィール格納用
  const [load, setLoad] = useState(true); // ロード検知

  // ユーザ情報取得
  const getUser = async () => {
    const user = await getUserProfile({ userId: data.userId });
    setUser(user);

    setLoad(false);
  };

  // 初期化
  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (load) {
    return (
      <motion.div className="box rounded-4 bg-white p-3 mt-3">
        <div className="d-flex align-items-center justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div className="box rounded-4 bg-white p-3 mt-3">
      <div className="d-flex align-items-center">
        <Image
          className="bg-text rounded-pill"
          src={user?.image}
          alt={"User Icon"}
          width={40}
          height={40}
        />
        <div className="ms-1">{user?.username}</div>
      </div>
      <div className="text-info fs-4">{data.title}</div>
      <div className="overflow-y-scroll scroll_item" style={{ maxHeight: 250 }}>
        <ReactMarkdown remarkPlugins={[remarkGfm, breaks]}>
          {data.message}
        </ReactMarkdown>
      </div>
    </motion.div>
  );
}
