import { useSession } from "next-auth/react";
import Image from "next/image";
/**
 * ユーザの情報を表示する
 */
export default function UserBar() {
  const { data: session } = useSession();

  return (
    <div className="h-100 w-100 d-flex align-items-center">
      {session?.user && (
        <>
          <Image
            width={50}
            height={50}
            src={"https://placehold.jp/150x150.png"}
            alt={"User Icon"}
            className="rounded-circle bg-base-4 shadow"
          />
          <div className="fs-3 ms-2">{session?.user?.name}</div>
        </>
      )}
    </div>
  );
}
