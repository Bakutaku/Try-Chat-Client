"use server";
import { auth } from "@/auth";
import { env } from "process";

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
        "Content-Type": "application/json",
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

/**
 * KeyCloakの管理者アクセストークン取得
 */
async function getKeyCloakAdminToken() {
  // 必要な情報取得
  const user = env.AUTH_KEYCLOAK_ADMIN_USER_NAME;
  const password = env.AUTH_KEYCLOAK_ADMIN_PASSWORD;
  const base_url = env.AUTH_KEYCLOAK_ADMIN_URL_BASE;

  // ボディ作成
  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "password");
  urlencoded.append("username", user as string);
  urlencoded.append("password", password as string);
  urlencoded.append("client_id", "admin-cli");

  return await request({
    url: `${base_url}/realms/master/protocol/openid-connect/token`,
    option: {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
      body: urlencoded,
    },
  });
}

interface KeyCloakToken {
  token: string;
}

/**
 * トークンの無効化
 */
async function logoutKeycloakToken({ token }: KeyCloakToken) {
  // 情報取得
  const base_url = env.AUTH_KEYCLOAK_ADMIN_URL_BASE;

  // ボディ作成
  const urlencoded = new URLSearchParams();
  urlencoded.append("token", token);
  urlencoded.append("client_id", "admin-cli");

  await request({
    url: `${base_url}/realms/master/protocol/openid-connect/revoke`,
    option: {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: urlencoded,
    },
  });
}

interface GetUserProfileProps {
  userId: string;
}

/**
 * ユーザのプロフィールの内容を取得
 */
export async function getUserProfile({ userId }: GetUserProfileProps) {
  // 管理者トークン取得
  const token = await getKeyCloakAdminToken();

  // ベースURL取得
  const base_url = env.AUTH_KEYCLOAK_ADMIN_URL_BASE;
  const realms = env.AUTH_KEYCLOAK_REALMS;

  // リクエスト
  const res = await request({
    url: `${base_url}/admin/realms/${realms}/users/${userId}`,
    option: {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    },
  });

  // トークン無効化
  await logoutKeycloakToken(token);

  return {
    id: res.id,
    username: res.username,
    image: res?.attributes?.icon[0]
      ? res?.attributes?.icon[0]
      : "https://placehold.jp/150x150.png",
  };
}

interface QuestionPostProps {
  baseURL: string;
  title: string;
  explanation: string;
  nodes: string;
  edges: string;
}
/**
 * 質問投稿
 */
export async function questionPostRequest({
  baseURL,
  title,
  explanation,
  nodes,
  edges,
}: QuestionPostProps) {
  // リクエスト
  return await requestAuth({
    url: `${baseURL}/api/question`,
    option: {
      method: "POST",
      body: JSON.stringify({
        title: title,
        explanation: explanation,
        nodes: nodes,
        edges: edges,
      }),
    },
  });
}
