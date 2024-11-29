import Image from "next/image";

// 引数
interface Props {
  name: string; // ユーザ名
  icon: string; // ユーザアイコン
}

/**
 * ユーザの情報を表示する
 */
export default function UserBar({ name, icon }: Props) {
  return (
    <div className="w-100 d-flex align-items-center">
      <Image
        width={50}
        height={50}
        src={icon}
        alt={"User Icon"}
        className="rounded-circle bg-base-4 shadow"
      />
      <div className="fs-3 ms-2">{name}</div>
    </div>
  );
}
