"use client";
import DnDFlowEdit from "@/app/components/flow/DnDFlow";
import FlowView from "@/app/components/flow/flowView";
import { Edge, Node } from "@xyflow/react";
import { useState } from "react";

// ページの引数
interface Params {
  params: {
    id: string; // 投稿ID
  };
}

// 初期設定
const initialNodes: Node[] = [
  {
    id: "1",
    type: "inputTitle",
    data: { label: "タイトル", edit: true, resizer: false },
    position: { x: 290, y: -250 },
    deletable: false,
    draggable: false, // ドラックを無効にする処理
  },
  {
    id: "2",
    type: "text",
    data: { label: "# 説明", edit: true, resizer: false },
    position: { x: 250, y: 5 },
    deletable: false,
    draggable: false,
  },
];
// エッジ
const initialEdges = [
  { id: "e1-2", source: "1", target: "2", deletable: false },
];

/**
 * 質問閲覧ページ
 */
export default function QuestionItemPage({ params }: Params) {
  const [nodes, setNodes] = useState<Node[]>([]); // ノード用
  const [edges, setEdges] = useState<Edge[]>([]); // エッジ用

  // 内容取得用
  const getValue = (n: Node[], e: Edge[]) => {
    setNodes(n);
    setEdges(e);
  };

  // TODO 既存の質問の操作をすべて無効にするdraggable: false,などを追加する

  // ノードの操作を無効にする処理
  const nodeDeletable = (nodes_p: Node[]) => {
    return nodes_p.map((n) => ({
      ...n,
      data: {
        ...n.data,
        edit: false,
        resizer: false,
      },
      deletable: false,
      draggable: false,
    }));
  };
  // エッジの操作を無効にする処理
  const edgeDeletable = (edges_p: Edge[]) => {
    return edges_p.map((e) => ({
      ...e,
      deletable: false,
    }));
  };

  // 無効化
  const defaultNode = nodeDeletable(initialNodes);
  const defaultEdge = edgeDeletable(initialEdges);

  return (
    <div className="box rounded-4 bg-white p-3 mt-3">
      <div>
        <div className="h1">質問</div>
        <div>Username</div>
      </div>
      <div
        className="border border-3 rounded-5 shadow border-edit-item bg-flow mx-5"
        style={{ height: "80vh" }}
      >
        <FlowView
          initialNodes={defaultNode}
          initialEdges={defaultEdge}
          controls
        />
      </div>
      <div className="mt-5 h1">コメント</div>
      <div
        className="border border-3 rounded-5 shadow border-edit bg-flow mx-5"
        style={{ height: "80vh" }}
      >
        <DnDFlowEdit
          getValue={getValue}
          miniMap
          controls
          initialNodes={defaultNode}
          initialEdges={defaultEdge}
        />
      </div>
    </div>
  );
}
