import { NodeProps, NodeResizer } from "@xyflow/react";
import { ChangeEvent, useState } from "react";

/**
 * コメント用のノード
 */
export default function CommentNode({ data, selected }: NodeProps) {
  const [text, setText] = useState("コメント"); // 入力値

  // 入力のイベント
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    // データを書き換える
    data.text = e.target.value;

    // 更新
    setText(e.target.value);
  };

  return (
    <div style={{ zIndex: 9999 }}>
      {data.edit ? (
        <div className="card p-2 h-100 w-100">
          <div className="fs-1">#</div>
          <input
            className="form-control bg-base-1 fs-2 h-100 w-100"
            onChange={onChange}
            value={text}
          />
        </div>
      ) : (
        <div className="fs-2">{text}</div>
      )}
      <NodeResizer
        minWidth={100}
        minHeight={30}
        isVisible={selected}
        lineStyle={{ borderRadius: "8px", border: "5px solid #00aaff" }}
      />
    </div>
  );
}
