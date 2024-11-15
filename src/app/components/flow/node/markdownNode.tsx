import { Handle, NodeProps, Position } from "@xyflow/react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import breaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import "github-markdown-css/github-markdown.css";

/**
 * マークダウンのノード
 */
export default function MarkdownNode({ data, isConnectable }: NodeProps) {
  const [text, setText] = useState("# Hello World"); // 入力値
  const [isMark, setIsMark] = useState(data.edit); // 表示切替

  // 入力のイベント
  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    // データを書き換える
    data.text = e.target.value;
    // 更新
    setText(e.target.value);

    // リサイズ
    handleResize();
  };

  // 入力欄の自動調整
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const handleResize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // 一度高さをリセット
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // 内容に合わせた高さに変更
    }
  };
  useEffect(() => {
    handleResize(); // 初期呼び出し
  }, [isMark]);

  return (
    <div className="card p-3" style={{ minWidth: "500px" }}>
      {data.edit ? (
        <button
          className="btn btn-change text-white"
          onClick={() => setIsMark(!isMark)}
        >
          表示切り替え
        </button>
      ) : (
        ""
      )}
      <div className="mt-2 w-100">
        {isMark && data.edit ? (
          <textarea
            className="overflow-hidden form-control w-100"
            ref={textareaRef}
            value={text}
            onChange={onChange}
            contentEditable
            style={{ whiteSpace: "nowrap", resize: "none" }}
          />
        ) : (
          <ReactMarkdown remarkPlugins={[remarkGfm, breaks]}>
            {text}
          </ReactMarkdown>
        )}
      </div>
      <Handle
        id="a"
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <Handle
        id="b"
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </div>
  );
}
