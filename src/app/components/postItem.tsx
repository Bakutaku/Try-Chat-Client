"use client"

import Image from "next/image";

interface Data {
  userName : string
  userIcon : string
  title : string
  message : string
}

/**
 * ホーム画面で使用する投稿を表示するやつ
 */
export default function PostItem(data:Data){
  return (
    <div className="box rounded-5 bg-white p-3 mt-3">
      <div className="d-flex align-items-center">
        <Image className="bg-text rounded-pill" src={data.userIcon} alt={"User Icon"} width={40} height={40} />
        <div className="ms-1">{data.userName}</div>
      </div>
      <div className="text-info fs-4">{data.title}</div>
      <div className="mt-1">{data.message}</div>
    </div>
  );
}