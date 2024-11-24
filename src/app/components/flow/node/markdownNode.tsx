import { Handle, NodeProps, NodeResizer, Position } from "@xyflow/react";
import { ChangeEvent, useState } from "react";
import ReactMarkdown from "react-markdown";
import breaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import "github-markdown-css/github-markdown.css";
import UserBar from "../../userBar";

/**
 * マークダウンのノード
 */
export default function MarkdownNode({
  data,
  isConnectable,
  selected,
}: NodeProps) {
  const [text, setText] = useState(data.label as string); // 入力値
  const [isMark, setIsMark] = useState(data.edit); // 表示切替

  // 入力のイベント
  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    // データを書き換える
    data.text = e.target.value;
    // 更新
    setText(e.target.value);
  };

  // リサイズの設定
  const isVisible = !!(selected && data.resizer);

  return (
    <>
      <UserBar name={data.name as string} icon={data.icon as string} />
      <div className="card p-3 h-100" style={{ minWidth: "500px" }}>
        {data.edit && data.resizer ? (
          <button
            className="btn btn-change text-white"
            onClick={() => setIsMark(!isMark)}
          >
            表示切り替え
          </button>
        ) : (
          ""
        )}
        <div className="mt-2 w-100 h-100">
          {isMark && data.edit ? (
            <textarea
              className="overflow-hidden form-control w-100 h-100"
              value={text}
              onChange={onChange}
              contentEditable
              style={{ whiteSpace: "nowrap", resize: "none" }}
            />
          ) : (
            <div className="h-100">
              <ReactMarkdown remarkPlugins={[remarkGfm, breaks]}>
                {text}
              </ReactMarkdown>
            </div>
          )}
        </div>
        <Handle
          id="a"
          type="target"
          className="handle"
          style={{ width: 10, height: 10 }}
          position={Position.Top}
          isConnectable={isConnectable}
        />
        <Handle
          id="b"
          type="source"
          style={{ width: 10, height: 10 }}
          position={Position.Bottom}
          isConnectable={isConnectable}
        />
        <NodeResizer
          minWidth={100}
          minHeight={30}
          isVisible={isVisible}
          lineStyle={{ borderRadius: "8px", border: "5px solid #00aaff" }}
        />
      </div>
    </>
  );
}
