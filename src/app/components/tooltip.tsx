"use client"
import { useState } from "react";

interface data{
  text : string,
  children : React.ReactNode
}

/**
 * マウスカーソルを合わせたときの文字
 */
export default function Tooltip({text,children}:data) {
  // オンオフ
  const [isHover,setIsHover] = useState(false)

  return (
    <div className="position-relative d-inline-block" onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
      {children}
      {isHover && 
        <div className="position-absolute fs-6 top-50 start-100 translate-middle-y mt-2 p-1 text-white bg-dark rounded shadow z-3">
          {text}
        </div>
      }
    </div>
  );
}