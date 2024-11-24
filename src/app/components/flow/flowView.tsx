"use client";

import { Controls, Edge, MiniMap, Node, ReactFlow } from "@xyflow/react";
import NodeInspector from "./debug";
import TestNode from "./node/testNode";
import MarkdownNode from "./node/markdownNode";
import CommentNode from "./node/commentNode";
import InputNode from "./node/inputNode";
import { useMemo } from "react";

// 引数
interface Props {
  miniMap?: boolean;
  debug?: boolean;
  controls?: boolean;
  initialNodes?: Node[]; // 初期値
  initialEdges?: Edge[]; // 初期値
}

// エッジオプション
const defaultEdgeOptions = { style: { strokeWidth: 10 } };

/**
 * フローチャートの作業パーツ
 */
export default function FlowView({
  miniMap,
  debug,
  controls,
  initialNodes = [],
  initialEdges = [],
}: Props) {
  // React Flowを動かす準備
  const nodeType = useMemo(
    // カスタムノードを追加するもの
    () => ({
      test: TestNode,
      text: MarkdownNode,
      comment: CommentNode,
      inputTitle: InputNode,
    }),
    []
  );

  // ノードを修正不可にする
  const nodeChange = () => {
    return initialNodes.map((node) => ({
      ...node,
      data: {
        ...node.data,
        edit: false,
        resizer: false,
      },
      deletable: false,
    }));
  };
  // エッジを修正不可にする
  const edgeChange = () => {
    return initialEdges.map((edge) => ({
      ...edge,
      deletable: false,
    }));
  };

  // 変換
  initialNodes = nodeChange();
  initialEdges = edgeChange();

  return (
    <ReactFlow
      nodeTypes={nodeType}
      nodes={initialNodes}
      edges={initialEdges}
      defaultEdgeOptions={defaultEdgeOptions}
      fitViewOptions={{ padding: 1 }}
      minZoom={0.5}
      maxZoom={2}
      fitView
    >
      {/*背景*/}
      {controls && <Controls />}
      {/*左下に出てくるボタン*/}
      {miniMap && <MiniMap />}
      {/*ミニマップ*/}
      {debug && <NodeInspector />}
      {/* デバック用 */}
    </ReactFlow>
  );
}
