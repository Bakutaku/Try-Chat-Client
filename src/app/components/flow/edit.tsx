"use client"

import { addEdge, Background, BackgroundVariant, Controls, MiniMap, ReactFlow, useEdgesState, useNodesState } from "@xyflow/react";
import { useCallback, useMemo } from "react";
import NodeInspector from "./debug";
import TestNode from "./node/testNode";

// 引数
interface Props{
    miniMap? : boolean
    debug? : boolean
    controls? : boolean
}



// 初期設定
// ノード
const initialNodes = [
    { id: '1',type: "test", position: { x: 0, y: 0 }, data: { label: 'This is Node.' } },
    { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
];
// エッジ
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];
// エッジオプション
const defaultEdgeOptions = { animated: true };


/**
 * フローチャートの作業パーツ
 */
export default function Edit({miniMap,debug,controls}:Props){
    // React Flowを動かす準備
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);   // ノードの管理を行うもの
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);   // エッジの管理を行うもの
    const nodeType = useMemo(() => ({test:TestNode}),[]);   // カスタムノードを追加するもの
    const onConnect = useCallback(  // エッジを追加するもの
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    return(
        <ReactFlow
            nodeTypes={nodeType}
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            defaultEdgeOptions={defaultEdgeOptions}
        >
            <Background variant={BackgroundVariant.Dots}  />{/*背景*/}
            {controls && <Controls />}{/*左下に出てくるボタン*/}
            {miniMap && <MiniMap />}{/*ミニマップ*/}
            {debug && <NodeInspector />}{/* デバック用 */}
        </ReactFlow>
    );
}