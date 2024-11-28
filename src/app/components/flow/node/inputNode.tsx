import { Handle, NodeProps, NodeResizer, Position } from "@xyflow/react";
import { ChangeEvent, useState } from "react";
import UserBar from "../../userBar";

/**
 * コメント用のノード
 */
export default function InputNode({
  data,
  isConnectable,
  selected,
}: NodeProps) {
  const [text, setText] = useState(
    data.text ? (data.text as string) : "タイトル"
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
    <>
      <UserBar name={data.name as string} icon={data.icon as string} />
      <div className="card fs-2 p-3 fw-bold w-100 h-100">
        {data.label ? (
          <div className="w-100">{data.label as string}</div>
        ) : (
          <div className="w-100"></div>
        )}
        {data.edit && data.resizer ? (
          <input
            className="form-control bg-base-1 fs-2 w-100 h-100"
            onChange={onChange}
            value={text}
            style={{ boxSizing: "border-box" }}
          />
        ) : (
          <div>{text}</div>
        )}

        {data.label ? (
          <></>
        ) : (
          <Handle
            id="a"
            type="target"
            className="handle"
            style={{ width: 10, height: 10 }}
            position={Position.Top}
            isConnectable={isConnectable}
          />
        )}

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
