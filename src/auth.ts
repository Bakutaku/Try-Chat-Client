import NextAuth from "next-auth";
import Keycloak from "next-auth/providers/keycloak";
import { getUserProfile, refreshToken } from "./util/server";
import { jwtDecode } from "jwt-decode";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    image?: string;
    userId?: string;
  }
}
declare module "@auth/core/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    userId?: string;
    expToken?: number;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  // 認証先設定
  trustHost: true,
  debug: true,
  providers: [Keycloak],
  session: {
    strategy: "jwt",
  },
  jwt: {
    maxAge: 60 * 60,
  },
  callbacks: {
    // トークン
    async jwt({ token, account }) {
      // トークンを保存
      if (account) {
        token.accessToken = account?.access_token;
        token.refreshToken = account?.refresh_token;
        token.userId = account?.providerAccountId;

        // アクセストークンをデコードする
        const decodedToken = jwtDecode(account?.access_token as string);

        // アクセストークンの有効期限を設定する
        token.expToken = decodedToken.exp;
      } else {
        // トークンがまだ有効か調べる
        if (Date.now() / 1000 >= (token.expToken as number)) {
          // 有効期限が切れている場合
          const refToken = await refreshToken({
            refreshToken: token.refreshToken as string,
          });

          // 値の設定
          token.accessToken = refToken.access_token;
          token.refreshToken = refToken.refresh_token;
          // アクセストークンをデコードする
          const decodedToken = jwtDecode(refToken?.access_token as string);
          token.expToken = decodedToken.exp;

          console.log("更新!");
        }
      }
      return token;
    },
    // セッション
    async session({ session, token }) {
      // トークンを保存
      session.accessToken = token.accessToken;
      session.userId = token.userId as string;

      // サーバにリクエスト
      const data = await getUserProfile({ userId: token.userId as string });

      session.image = data.image;
      session.user.name = data.username;

      return session;
    },
  },
});
