"use client"
import { useState } from "react";
import HamburgerMenu from "./hamburgerMenu";

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
        <ul className="fs-3 bg-base-4 list-group rounded-pill server m-auto mt-2" style={{height:"20rem",width:"4rem"}}>
          <li className="bg-text text-white rounded-circle m-2 d-flex justify-content-center align-items-center" style={{width:"3rem",height:"3rem"}}>
            <div>S</div>
          </li>
          <li className="bg-text text-white rounded-circle m-2 d-flex justify-content-center align-items-center" style={{width:"3rem",height:"3rem"}}>
            <div>S</div>
          </li>
          <li className="bg-text text-white rounded-circle m-2 d-flex justify-content-center align-items-center" style={{width:"3rem",height:"3rem"}}>
            <div>S</div>
          </li>
          <li className="mt-auto bg-text text-white rounded-circle m-2 d-flex justify-content-center align-items-center" style={{width:"3rem",height:"3rem"}}>
            <div>+</div>
        </li>
        </ul> 
        
      </div>
    </nav>
);
}
