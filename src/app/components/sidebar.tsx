"use client";
import { useEffect, useState } from "react";
import HamburgerMenu from "./hamburgerMenu";
import ServerBar from "./serverBar";
import Tooltip from "./tooltip";
import { motion, Variants } from "framer-motion";
import Link from "next/link";

/**
 * サイドバー
 */
export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true); // 開閉管理用 //TODO
  const [server, setServer] = useState(["http://backend:8081"]); // サーバ一覧
  const [select, setSelect] = useState("http://backend:8081"); // 選択しているサーバ

  useEffect(() => {
    const serverLocal = window?.localStorage.getItem("server");
    const selectLocal = window?.localStorage.getItem("select");

    if (serverLocal && selectLocal) {
      try {
        setServer(JSON.parse(serverLocal));
        setSelect(selectLocal);
      } catch {
        alert("エラーが発生しました。");
      }
    }
  }, []);

  useEffect(() => {
    window?.localStorage.setItem("server", JSON.stringify(server));
    window?.localStorage.setItem("select", select as string);
  }, [server, select]);

  // アニメーション定義
  const animation: Variants = {
    open: {
      clipPath: "inset(0% -100% 0% -100% round 10px)",
      height: "auto",
      transition: {
        duration: 0.5,
      },
    },
    closed: {
      height: 0,
      clipPath: "inset(0% 0% 100% 0% round 10px)",
    },
  };

  return (
    <nav className="sidebar d-flex align-items-center justify-content-center rounded-pill">
      <div className="pt-2 pb-2">
        {/* ハンバーガーボタン */}
        <div className="d-flex align-items-center justify-content-center">
          <button
            className="btn my-2 d-flex align-items-center justify-content-center"
            onClick={() => setIsOpen(!isOpen)}
            style={{ width: 50, height: 50 }}
          >
            <HamburgerMenu isOpen={isOpen} />
          </button>
        </div>
        {/* 線 */}
        <motion.div animate={isOpen ? "open" : "closed"} variants={animation}>
          <div className="border-bottom border-3 border-black border-opacity-50"></div>
          {/* 選択欄 */}
          <ul className="fs-1 nav flex-column d-flex align-items-center">
            <Link href="/">
              <li className="nav-item">
                <Tooltip text="Home">
                  <i className="bi bi-house-door"></i>
                </Tooltip>
              </li>
            </Link>
            <Link href="/mail">
              <li className="nav-item">
                <Tooltip text="Mail(準備中)">
                  <i className="bi bi-envelope"></i>
                </Tooltip>
              </li>
            </Link>
            <Link href="/friend">
              <li className="nav-item">
                <Tooltip text="Friend(準備中)">
                  <i className="bi bi-people"></i>
                </Tooltip>
              </li>
            </Link>
            <Link href="/server">
              <li className="nav-item">
                <Tooltip text="Server(準備中)">
                  <i className="bi bi-hdd-stack"></i>
                </Tooltip>
              </li>
            </Link>
          </ul>
          <div className="border-bottom border-3 border-black border-opacity-50"></div>
          <ServerBar
            servers={server}
            onChange={(str) => {
              setSelect(str);
            }}
          />
        </motion.div>
      </div>
    </nav>
  );
}
