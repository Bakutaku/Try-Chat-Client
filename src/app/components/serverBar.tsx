"use client";
import ServerBarItem from "./ServerBarItem";

interface Props {
  servers: string[];
  onChange: (ip: string) => void;
}

/**
 * サイドバーのサーバ選択欄
 */
export default function ServerBar({ servers, onChange }: Props) {
  return (
    <ul className="fs-3 bg-base-4 list-group rounded-pill server m-auto mt-2" style={{ maxHeight: "20rem", width: "4rem" }}>
      {servers.map((_server) => (
        <div key={_server} onClick={() => onChange(_server)}>
          <ServerBarItem />
        </div>
      ))}
      <li
        className="mt-auto server-add text-white rounded-circle m-2 d-flex justify-content-center align-items-center"
        style={{ width: "3rem", height: "3rem" }}
      >
        <i className="bi bi-plus-lg"></i>
      </li>
    </ul>
  );
}
