"use client";
import { SignIn } from "@/util/signIn";

export default function User() {
  return (
    <form
      action={async () => {
        await SignIn();
      }}
    >
      <button className="btn btn-change text-white" type="submit">
        ログイン
      </button>
    </form>
  );
}
