import { Handle, NodeProps, Position } from "@xyflow/react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import breaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import "github-markdown-css/github-markdown.css";

export default function TestNode({ data, isConnectable }: NodeProps) {
  const [text, setText] = useState("# Hello");
  return (
    <div className="react-flow_node_default">
      <textarea onChange={(e) => setText(e.target.value)} value={text} />
      <ReactMarkdown remarkPlugins={[remarkGfm, breaks]}>{text}</ReactMarkdown>
      {data.label ? <div>{data.label as string}</div> : ""}
      <Handle
        id="d"
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
      <Handle
        id="a"
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <Handle
        id="b"
        type="source"
        position={Position.Left}
        isConnectable={isConnectable}
      />
      <Handle
        id="c"
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
      />
    </div>
  );
}
