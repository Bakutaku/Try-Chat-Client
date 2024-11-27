"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function User() {
  // セッション取得
  const { data: session } = useSession();

  // ログインしているとき
  if (session?.user) {
    return (
      <div>
        <Image
          src={
            session?.image ? session?.image : "https://placehold.jp/150x150.png"
          }
          alt={"User Icon"}
          className="rounded-circle bg-base-4 ms-3 shadow"
          width={50}
          height={50}
        />
        <button
          className="btn btn-change text-white ms-2"
          onClick={() => signOut()}
        >
          ログアウト
        </button>
      </div>
    );
  }

  // ログインしてない時
  return (
    <button
      className="btn btn-change text-white"
      onClick={() => signIn("keycloak")}
    >
      ログイン
    </button>
  );
}
