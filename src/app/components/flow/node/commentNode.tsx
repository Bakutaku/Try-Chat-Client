import { NodeProps, NodeResizer } from "@xyflow/react";
import { ChangeEvent, useState } from "react";
import UserBar from "../../userBar";

/**
 * コメント用のノード
 */
export default function CommentNode({ data, selected }: NodeProps) {
  const [text, setText] = useState(
    data.text ? (data.text as string) : "コメント"
  ); // 入力値

  // 入力のイベント
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    // データを書き換える
    data.text = e.target.value;

    // 更新
    setText(e.target.value);
  };

  // リサイズの設定
  const isVisible = !!(selected && data.resizer);

  return (
    <div style={{ zIndex: 9999 }}>
      <UserBar name={data.name as string} icon={data.icon as string} />
      {data.edit && data.resizer ? (
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
        isVisible={isVisible}
        lineStyle={{ borderRadius: "8px", border: "5px solid #00aaff" }}
      />
    </div>
  );
}
