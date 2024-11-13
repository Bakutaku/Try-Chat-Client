/* eslint-disable @typescript-eslint/no-unused-vars */

import { useDnD } from "./DnDContext";


/**
 * ノード一覧を配置するサイドバー
 */
export default function ContentSidebar(){
    const [_,setType] = useDnD();

    // ドラッグの設定?
    const onDragStart = (event : React.DragEvent<HTMLDivElement>,nodeType:string) => {
        setType(nodeType);  // ドラックされたノードタイプを設定
        event.dataTransfer.effectAllowed = "move"   // ドラック効果を設定
    };

    return (
        <div>
            ノード一覧だよ
            <div className="bg-base-4"
                onDragStart={(event) => onDragStart(event,"default")}
                draggable
            >
                ノード1
            </div>
            <div className="bg-base-4"
                onDragStart={(event) => onDragStart(event,"test")}
                draggable
            >
                ノード2
            </div>
        </div>
    );
}