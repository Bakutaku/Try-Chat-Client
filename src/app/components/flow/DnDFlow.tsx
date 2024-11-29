"use client";

import {
  addEdge,
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  MiniMap,
  Node,
  Panel,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import TestNode from "./node/testNode";
import { DnDProvider, useDnD } from "./DnDContext";
import ContentSidebar from "./contentSidebar";
import NodeInspector from "./debug";
import MarkdownNode from "./node/markdownNode";
import { v4 as uuidv4 } from "uuid";
import CommentNode from "./node/commentNode";
import InputNode from "./node/inputNode";
import { useSession } from "next-auth/react";

// 引数
interface Props {
  miniMap?: boolean; // ミニマップのオンオフ
  debug?: boolean; // デバックのオンオフ
  controls?: boolean; // コントローラのオンオフ
  getValue: (node: Node[], edges: Edge[]) => void; // 値取得用の関数
  initialNodes?: Node[]; // 初期値
  initialEdges?: Edge[]; // 初期値
}

// エッジオプション
const defaultEdgeOptions = { style: { strokeWidth: 10 } };

// ノードID生成の関数
const getID = () => uuidv4();

const DnDFlow: React.FC<Props> = ({
  miniMap,
  debug,
  controls,
  getValue,
  initialNodes = [],
  initialEdges = [],
}) => {
  const reactFlowWrapper = useRef<HTMLDivElement | null>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>(initialNodes); // ノードの管理を行うもの
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(initialEdges); // エッジの管理を行うもの
  const [show, setShow] = useState(true); // 表示管理
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
  const { screenToFlowPosition } = useReactFlow(); // スクリーン座標をReact Flow座標に変換する関数
  const [type] = useDnD(); // 現在ドラッグ中のノードタイプを取得

  // ノードが接続された際に呼ばれるコールバック
  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)), // 新しいエッジを追加する
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // セッション取得
  const { data: session } = useSession();

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  // ドロップイベントの処理。ノードを追加する
  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault(); // デフォルトの挙動を無効化（ドロップ後のページ遷移等を防ぐ）

      if (!type) {
        return; // ドラッグ中のタイプが無効なら何もしない
      }

      // ドラッグされた位置をReact Flowの座標系に変換
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      // 新しいノードの作成
      const newNode = {
        id: getID(), // 新しいIDを生成
        type: type, // ドラッグされたタイプを使用
        position, // 新しい位置
        data: {
          edit: true,
          resizer: true,
          name: session?.user?.name,
          icon: session?.image,
          userID: session?.userId,
        }, // ラベルとしてタイプを設定
        deletable: true, // 削除できるか
      };

      // 新しいノードをノードリストに追加
      setNodes((nds) => nds.concat(newNode));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [screenToFlowPosition, type] // screenToFlowPositionとtypeが変更される度に再評価される
  );

  // 実際の表示に切り替える
  const nodeShowChange = () => {
    setNodes(
      nodes.map((node) => ({
        ...node,
        data: {
          ...node.data,
          edit: !show,
        },
      }))
    );
    setShow(!show);
  };

  // 値渡す用
  useEffect(() => {
    getValue(nodes, edges);
  }, [nodes, edges, getValue]);

  return (
    <div
      className="d-flex w-100 h-100 position-relative"
      ref={reactFlowWrapper}
    >
      <ReactFlow
        nodeTypes={nodeType}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodesDraggable={true}
        nodesConnectable={true}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        defaultEdgeOptions={defaultEdgeOptions}
        fitViewOptions={{ padding: 1 }}
        minZoom={0.5}
        maxZoom={2}
        fitView
      >
        <Background variant={BackgroundVariant.Lines} />
        {/*背景*/}
        {controls && <Controls />}
        {/*左下に出てくるボタン*/}
        {miniMap && <MiniMap />}
        {/*ミニマップ*/}
        {debug && <NodeInspector />}
        {/* デバック用 */}
      </ReactFlow>
      <ContentSidebar />
      <Panel position="top-left">
        <button className="btn btn-change text-white" onClick={nodeShowChange}>
          切り替え
        </button>
      </Panel>
    </div>
  );
};

// アプリケーション全体のコンポーネント。ReactFlowProviderとDnDProviderをラップして、DnDFlowコンポーネントを表示
const DnDFlowEdit: React.FC<Props> = ({
  miniMap,
  debug,
  controls,
  getValue,
  initialNodes,
  initialEdges,
}) => (
  <ReactFlowProvider>
    <DnDProvider>
      <DnDFlow
        miniMap={miniMap}
        debug={debug}
        controls={controls}
        getValue={getValue}
        initialNodes={initialNodes}
        initialEdges={initialEdges}
      />
    </DnDProvider>
  </ReactFlowProvider>
);

export default DnDFlowEdit; // Appコンポーネントをデフォルトエクスポート
