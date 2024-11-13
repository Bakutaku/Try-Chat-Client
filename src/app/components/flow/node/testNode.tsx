import { Handle, NodeProps, Position } from "@xyflow/react";

export default function TestNode({ data, isConnectable }:NodeProps){

    return(
        <div className="react-flow__node_default">
            {data.label ? <div>{data.label as string}</div> : ""}
            <Handle id="d" type="source" position={Position.Bottom} isConnectable={isConnectable}/>
            <Handle id="a" type="target" position={Position.Top} isConnectable={isConnectable}/>
            <Handle id="b" type="source" position={Position.Left} isConnectable={isConnectable}/>
            <Handle id="c" type="source" position={Position.Right} isConnectable={isConnectable}/>
        </div>
    );

}