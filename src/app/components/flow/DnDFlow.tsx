"use client"

import { addEdge, Background, BackgroundVariant, Connection, Controls, Edge, MiniMap, ReactFlow, ReactFlowProvider, useEdgesState, useNodesState, useReactFlow } from "@xyflow/react";
import { useCallback, useMemo, useRef } from "react";
import TestNode from "./node/testNode";
import { DnDProvider, useDnD } from "./DnDContext";
import ContentSidebar from "./contentSidebar";
import NodeInspector from "./debug";



// 引数
interface Props{
  miniMap? : boolean
  debug? : boolean
  controls? : boolean
}


// 初期設定
const initialNodes = [
  {
    id: '1',
    type: 'test',
    data: { label: 'input node' },
    position: { x: 250, y: 5 },
  },
];


// ノードIDのカウンタ
let id = 0;

// ノードID生成の関数
const getID = () => `try${id++}`;

const DnDFlow:React.FC<Props> = ({miniMap,debug,controls}) => {
  const reactFlowWrapper = useRef<HTMLDivElement | null>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);   // ノードの管理を行うもの
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);   // エッジの管理を行うもの
  const nodeType = useMemo(() => ({test:TestNode}),[]);   // カスタムノードを追加するもの
  const { screenToFlowPosition } = useReactFlow();  // スクリーン座標をReact Flow座標に変換する関数
  const [type] = useDnD();  // 現在ドラッグ中のノードタイプを取得
  
  // ノードが接続された際に呼ばれるコールバック
  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)), // 新しいエッジを追加する
    [],
  );

  const onDragOver = useCallback((event : React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  },[]);

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
        type:type, // ドラッグされたタイプを使用
        position, // 新しい位置
        data: { label: `${type} node` }, // ラベルとしてタイプを設定
      };

      // 新しいノードをノードリストに追加
      setNodes((nds) => nds.concat(newNode));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [screenToFlowPosition, type], // screenToFlowPositionとtypeが変更される度に再評価される
  );
  return (
    <div className="w-100 h-100">
      <ReactFlow
        nodeTypes={nodeType}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        fitView
      >
        <Background variant={BackgroundVariant.Dots}  />{/*背景*/}
        {controls && <Controls />}{/*左下に出てくるボタン*/}
        {miniMap && <MiniMap />}{/*ミニマップ*/}
        {debug && <NodeInspector />}{/* デバック用 */}
      </ReactFlow>
      <ContentSidebar/>
    </div>
  );
}

// アプリケーション全体のコンポーネント。ReactFlowProviderとDnDProviderをラップして、DnDFlowコンポーネントを表示
const DnDFlowEdit: React.FC<Props> = ({miniMap,debug,controls}) => (
  <ReactFlowProvider>
    <DnDProvider>
      <DnDFlow miniMap={miniMap} debug={debug} controls={controls} />
    </DnDProvider>
  </ReactFlowProvider>
);

export default DnDFlowEdit; // Appコンポーネントをデフォルトエクスポート