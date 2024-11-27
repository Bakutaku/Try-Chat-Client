import NextAuth from "next-auth";
import Keycloak from "next-auth/providers/keycloak";
import { getUserProfile } from "./util/server";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    image?: string;
  }
}
declare module "@auth/core/jwt" {
  interface JWT {
    accessToken?: string;
    userId?: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  // 認証先設定
  providers: [Keycloak],

  callbacks: {
    // トークン
    async jwt({ token, account }) {
      // トークンを保存
      if (account) {
        token.accessToken = account?.access_token;
        token.userId = account?.providerAccountId;
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
