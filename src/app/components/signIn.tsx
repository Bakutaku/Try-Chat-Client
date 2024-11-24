import { signIn } from "@/auth";

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("keycloak");
      }}
    >
      <button className="btn btn-change text-white" type="submit">
        ログイン
      </button>
    </form>
  );
}
