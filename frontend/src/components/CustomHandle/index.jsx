import { Handle, Position } from "reactflow";

export function CustomHandle({ id, position, type, style = {} }) {
  return (
    <Handle
      type={type}
      style={style}
      position={Position[position]}
      id={`${id}`}
      className={` ${
        type === "target" ? "!rounded-full" : "!rounded-sm"
      } !bg-violet-500 !w-3 !h-3 outline -right-[5px] outline-violet-500 outline-offset-1`}
    />
  );
}
