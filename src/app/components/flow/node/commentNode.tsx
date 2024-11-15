import { NodeProps } from "@xyflow/react";
import { ChangeEvent, useState } from "react";

/**
 * コメント用のノード
 */
export default function CommentNode({ data }: NodeProps) {
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
        <div className="card p-2">
          <input
            className="form-control bg-base-1 fs-2"
            onChange={onChange}
            value={text}
          />
        </div>
      ) : (
        <div className="fs-2">{text}</div>
      )}
    </div>
  );
}
