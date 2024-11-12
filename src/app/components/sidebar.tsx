"use client"
import { useState } from "react";
import HamburgerMenu from "./hamburgerMenu";
import ServerBar from "./serverBar";

/**
 * サイドバー
 */
export default function Sidebar() {
  const [isOpen,setIsOpen] = useState(false);  // 開閉管理用
  return (
    <nav className="sidebar d-flex align-items-center justify-content-center rounded-pill">
      <div className="pt-2 pb-4">
        {/* ハンバーガーボタン */}
        <button className="btn my-2" onClick={() => setIsOpen(!isOpen)}>
          <HamburgerMenu isOpen={isOpen} />
        </button>
        {/* 線 */}
        <div className="border-bottom border-3 border-black border-opacity-50"></div>
        {/* 選択欄 */}
        <ul className="fs-1 nav flex-column d-flex align-items-center">
          <li className="nav-item">
            <i className="bi bi-house-door"></i>
          </li>
          <li className="nav-item">
            <i className="bi bi-envelope"></i>
          </li>
          <li className="nav-item">
            <i className="bi bi-people"></i>
          </li>
          <li className="nav-item">
            <i className="bi bi-hdd-stack"></i>
          </li>
        </ul>
        <div className="border-bottom border-3 border-black border-opacity-50"></div>
        <ServerBar />
      </div>
    </nav>
);
}
