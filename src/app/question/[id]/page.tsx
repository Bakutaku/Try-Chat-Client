"use client";
import DnDFlowEdit from "@/app/components/flow/DnDFlow";
import FlowView from "@/app/components/flow/flowView";
import {
  answerListRequest,
  answerPostRequest,
  questionItemRequest,
} from "@/util/server";
import { Edge, Node } from "@xyflow/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

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
  const [nodes, setNodes] = useState<Node[]>(initialNodes); // ノード用
  const [edges, setEdges] = useState<Edge[]>(initialEdges); // エッジ用
  const [ansNodes, setAnsNodes] = useState<Node[]>(initialNodes); // ノード用
  const [ansEdges, setAnsEdges] = useState<Edge[]>(initialEdges); // エッジ用
  const [load, setLoad] = useState(true); // 読み込み管理

  const { data: session, status } = useSession(); // セッション取得

  // サーバからデータを取得
  const fetchData = async () => {
    // リクエスト
    // 質問
    const resQuestion = await questionItemRequest({
      baseURL: window?.localStorage.getItem("select") as string,
      id: params.id,
    });
    // 回答一覧
    const resAnswer = await answerListRequest({
      baseURL: window?.localStorage.getItem("select") as string,
      id: params.id,
    });

    // データ設定
    setNodes(JSON.parse(resQuestion.data.nodes));
    setEdges(JSON.parse(resQuestion.data.edges));

    const nodeData = resAnswer.data.map((_data: { nodes: string }) =>
      JSON.parse(_data.nodes)
    );
    const edgesData = resAnswer.data.map((_data: { edges: string }) =>
      JSON.parse(_data.edges)
    );

    setAnsNodes(nodeData.flat(1));
    setAnsEdges(edgesData.flat(1));

    // 読み込み完了にする
    setLoad(false);
    console.log("読み込み完了!!");
  };

  // 初回ロード
  useEffect(() => {
    return () => {
      // サーバにリクエスト
      fetchData();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 読み込み中の場合
  if (status === "loading" || load) {
    return (
      <div className="row align-items-center justify-content-center m-2">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // 内容取得用
  const getValue = (n: Node[], e: Edge[]) => {
    setAnsNodes(n);
    setAnsEdges(e);
  };

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

  // ユーザIDが同じものは有効にする
  const nodeUnDeletable = (_nodes: Node[]) => {
    return [
      ..._nodes
        .filter((_n) => _n.data.userID == session?.userId)
        .map((n) => ({
          ...n,
          data: {
            ...n.data,
            edit: false,
            resizer: true,
          },
          deletable: true,
          draggable: true,
        })),
      ..._nodes.filter((_n) => _n.data.userID != session?.userId),
    ];
  };
  const edgeUnDeletable = (_edges: Edge[]) => {
    return [
      ..._edges
        .filter((_e) => _e.data?.userID == session?.userId)
        .map((e) => ({
          ...e,
          data: {
            ...e.data,
            edit: false,
            resizer: true,
          },
          deletable: true,
          draggable: true,
        })),
      ..._edges.filter((_e) => _e.data?.userID != session?.userId),
    ];
  };

  // 無効化
  const defaultNode = nodeDeletable(nodes);
  const defaultEdge = edgeDeletable(edges);

  // 回答で本人の物は有効にする
  const ansDefaultNode = nodeUnDeletable(nodeDeletable(ansNodes));
  const ansDefaultEdge = edgeUnDeletable(edgeDeletable(ansEdges));

  // 投稿処理
  const addPost = async () => {
    // アップロード
    const res = await answerPostRequest({
      baseURL: window?.localStorage.getItem("select") as string,
      id: params.id,
      edges: JSON.stringify(
        ansEdges.filter((e) => e.data?.userID != session?.userId)
      ),
      nodes: JSON.stringify(
        ansNodes.filter((n) => n.data.userID == session?.userId)
      ),
    });

    // 結果
    if (res.status == "success") {
      alert("投稿できました");
    } else {
      alert(
        `投稿に失敗しました\n何度も表示される場合は開発者にお問合せください`
      );
    }
  };

  return (
    <div className="box rounded-4 bg-white p-3 mt-3">
      <div>
        <div className="h1">質問</div>
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
      <div className="mt-5 h1 row">
        <div className="col">コメント</div>
        <div className="col d-flex justify-content-end align-items-center me-5">
          <button className="btn btn-post text-white" onClick={() => addPost()}>
            投稿
          </button>
        </div>
      </div>
      <div
        className="border border-3 rounded-5 shadow border-edit bg-flow mx-5"
        style={{ height: "80vh" }}
      >
        <DnDFlowEdit
          getValue={getValue}
          miniMap
          controls
          initialNodes={ansDefaultNode}
          initialEdges={ansDefaultEdge}
        />
      </div>
    </div>
  );
}
