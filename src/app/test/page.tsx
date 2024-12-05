"use client";
import { useState } from "react";
import MarkdownEditor from "../components/markdown/markdownEditor";
import Tooltip from "../components/tooltip";
import ReactMarkdown from "react-markdown";
import breaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import "github-markdown-css/github-markdown.css";

export default function Test() {
  const [text, setText] = useState("# Hello");

  return (
    <div className="text-black">
      <button onClick={() => alert(window?.localStorage.getItem("select"))}>テストボタン</button>
      <Tooltip text={"Server"}>ここをクリック</Tooltip>

      <MarkdownEditor text={text} setText={setText} />
      <ReactMarkdown remarkPlugins={[remarkGfm, breaks]}>{text}</ReactMarkdown>
    </div>
  );
}
