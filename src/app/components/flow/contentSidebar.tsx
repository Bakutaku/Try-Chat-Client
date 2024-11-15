/* eslint-disable @typescript-eslint/no-unused-vars */

import { useDnD } from "./DnDContext";

/**
 * ノード一覧を配置するサイドバー
 */
export default function ContentSidebar() {
  const [_, setType] = useDnD();

  // ドラッグの設定?
  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string
  ) => {
    setType(nodeType); // ドラックされたノードタイプを設定
    event.dataTransfer.effectAllowed = "move"; // ドラック効果を設定
  };

  return (
    <div
      className="border-start border-3 border-edit"
      style={{ width: "10vw" }}
    >
      <div className="card w-100">
        <div className="card-header">ノード一覧</div>
        <div className="card-body">
          <div className="card-title">
            ドラック&ドロップでノードを追加しよう！
          </div>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <div onDragStart={(event) => onDragStart(event, "text")} draggable>
              テキストボックス
            </div>
          </li>
          <li className="list-group-item">
            <div
              onDragStart={(event) => onDragStart(event, "comment")}
              draggable
            >
              コメント
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
