"use client"

import { addEdge, Background, BackgroundVariant, Controls, MiniMap, ReactFlow, useEdgesState, useNodesState } from "@xyflow/react";
import NodeInspector from "../components/flow/debug";
import { useCallback } from "react";


// 初期設定
// ノード
const initialNodes = [
    { id: '1',type: "test", position: { x: 0, y: 0 }, data: { label: 'This is Node.' } },
    { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
];
// エッジ
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];
// エッジのオプション
const defaultEdgeOptions = { animated: true };


/**
 * 投稿ページ
 */
export default function Post(){
    // React Flowを動かす準備
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);   // ノードの管理を行うもの
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);   // エッジの管理を行うもの
    // const nodeType = useMemo(() => ({test:TestNode}),[]);   // カスタムノードを追加するもの
    const onConnect = useCallback(  // エッジを追加するもの
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    return(
        <div className="w-50 h-50">
            <ReactFlow
                // nodeTypes={nodeType}
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                defaultEdgeOptions={defaultEdgeOptions}
            >
            <Background variant={BackgroundVariant.Dots}  />
            <Controls />
            <MiniMap />
            <NodeInspector />

            </ReactFlow>
        </div>
    );
}