"use client";

import { useState } from "react";
import { Edge, Node } from "@xyflow/react";
import DnDFlowEdit from "@/app/components/flow/DnDFlow";
import { useSession } from "next-auth/react";
import { questionPostRequest } from "@/util/server";

/**
 * 投稿ページ
 */
export default function Post() {
  const [nodes, setNodes] = useState<Node[]>([]); // 入力内容格納用
  const [edges, setEdges] = useState<Edge[]>([]);

  const { data: session, status } = useSession(); // セッション取得

  // session読み込み中の場合
  if (status === "loading") {
    return (
      <div
        className="row align-items-center justify-content-center m-2"
        style={{ width: "70vw", height: "70vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // TODO 未ログインの場合は表記を変える

  // 初期設定
  const initialNodes: Node[] = [
    {
      id: "1",
      type: "inputTitle",
      data: {
        label: "タイトル",
        edit: true,
        resizer: true,
        name: session?.user?.name,
        icon: session?.image,
      },
      position: { x: 290, y: -250 },
      deletable: false,
    },
    {
      id: "2",
      type: "text",
      data: {
        label: "# 説明",
        edit: true,
        resizer: true,
        name: session?.user?.name,
        icon: session?.image,
      },
      position: { x: 250, y: 5 },
      deletable: false,
    },
  ];
  // エッジ
  const initialEdges = [
    { id: "e1-2", source: "1", target: "2", deletable: false },
  ];

  // 入力内容取得用
  const getValue = (n: Node[], e: Edge[]) => {
    setNodes(n);
    setEdges(e);
  };

  // 実際の表示に切り替える
  const nodeChange = () => {
    return nodes.map((node) => ({
      ...node,
      data: {
        ...node.data,
        edit: false,
      },
    }));
  };

  // 投稿関数
  const addPost = async () => {
    // アップロード用に変換
    const node = nodeChange();

    // タイトルのノード取得
    const titleNode: Node | undefined = node.find((_node) => _node.id === "1");

    // 説明のノード取得
    const exp: Node | undefined = node.find((_node) => _node.id === "2");

    // アップロード
    const res = await questionPostRequest({
      baseURL: "http://127.0.0.1:8081",
      title: titleNode?.data?.text as string | "No Data",
      explanation: exp?.data?.text as string | "No Data",
      edges: JSON.stringify(edges),
      nodes: JSON.stringify(node),
    });

    if (res.status == "success") {
      alert("投稿できました");
    } else {
      alert(
        `投稿に失敗しました\n何度も表示される場合は開発者にお問合せください`
      );
    }
  };

  return (
    <div className="row align-items-center justify-content-center m-2">
      <div className="d-flex justify-content-center">
        <div className="h1 col">質問</div>
        <div className="float-right">
          <button
            className="btn btn-post text-white fs-4 p-1 px-3"
            onClick={addPost}
          >
            投稿
          </button>
        </div>
      </div>
      <div
        className="border border-3 rounded-5 shadow border-edit bg-flow"
        style={{ width: "70vw", height: "70vh" }}
      >
        <DnDFlowEdit
          miniMap
          controls
          getValue={getValue}
          initialNodes={initialNodes}
          initialEdges={initialEdges}
        />
      </div>
    </div>
  );
}
