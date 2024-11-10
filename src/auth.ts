import NextAuth from "next-auth";
import Keycloak from "next-auth/providers/keycloak";

declare module "next-auth"{
  interface Session {
    accessToken?:string
  }
}
declare module "@auth/core/jwt"{
  interface JWT {
    accessToken?:string
  }
}

export const { handlers, signIn, signOut, auth} = NextAuth({
  // 認証先設定
  providers:[Keycloak],

  callbacks: {
    // トークン
    async jwt({token,account}) {
      // トークンを保存
      if(account){
        token.accessToken = account?.access_token;
      }
      return token;
    },
    // セッション
    async session({session,token}){
      // トークンを保存
      session.accessToken = token.accessToken;
      return session;
    }
  },
});