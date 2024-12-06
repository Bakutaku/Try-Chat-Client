import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export default auth(async (req: NextRequest) => {
  // セッション取得
  const session = await auth();

  // 未検証のユーザをログインページに
  if (!session && !["/"].includes(req.nextUrl.pathname)) {
    // リダイレクト
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  }

  // 認証済みの場合
  // そのままリクエスト
  return NextResponse.next();
});

// 適応するパス
export const config = {
  matcher: ["/((?!api/*|_next/static|_next/image|favicon.ico|Try-Chat_icon.svg).*)"],
};
