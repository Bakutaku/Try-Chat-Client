"use server";
import { auth } from "@/auth";

// 引数
interface RequestProps {
  url: string;
  option: RequestInit;
}

/**
 * リクエストベース(認証あり)
 */
async function requestAuth({ url, option }: RequestProps) {
  // セッション取得
  const session = await auth();

  // リクエスト
  return await request({
    url: url,
    option: {
      ...option,
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    },
  });
}

/**
 * リクエストベース
 */
async function request({ url, option }: RequestProps) {
  // リクエスト
  const res = await fetch(`${url}`, {
    ...option,
  }).catch((e) => {
    console.error(e);
    throw new Error(`リクエストが失敗しました`);
  });

  // 結果を返す
  return await res.json();
}

interface QuestionListRequest {
  baseURL: string;
  page: number;
  size: number;
}

/**
 * 質問一覧取得
 */
export async function questionListRequest({
  baseURL,
  page,
  size,
}: QuestionListRequest) {
  // URL作成
  const param = new URLSearchParams();
  param.set("page", String(page));
  param.set("size", String(size));
  const url = new URL(`${baseURL}/api/question/public?${param.toString()}`);

  return await request({
    url: url.toString(),
    option: {
      method: "GET",
    },
  });
}
