import { useReactFlow, useUpdateNodeInternals } from "reactflow";
import { CustomHandle } from "../CustomHandle";
import { useEffect, useRef, useState } from "react";

const nodeList = {
  customInput: CustomInputNode,
  customOutput: CustomOutputNode,
  text: TextNode,
  note: NoteNode,
  llm: LlmNode,
  vector_store: CustomInputNode,
};

export function CreateNode({ data }) {
  const { setNodes } = useReactFlow();

  const { id, label, iconUrl, handleInfo } = data;

  const CustomNode = nodeList[data.type];

  return (
    <div
      className={`custom-node bg-white p-2 border-2 border-violet-600/35 
        rounded-md min-h-[200px] max-w-[400px] min-w-[200px]
        flex flex-col
    `}
    >
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <img
            src={iconUrl}
            alt="import"
            className="nodrag w-[18px] h-[18px]"
            draggable="false"
          />
          <h3 className="uppercase font-medium">{label}</h3>
        </div>
        <div className="flex items-center top">
          <img
            src="https://img.icons8.com/material-outlined/24/cancel--v1.png"
            alt="cancel"
            className="nodrag w-[18px] h-[18px] cursor-pointer"
            title="Delete node"
            onClick={() =>
              setNodes((nodes) => nodes.filter((node) => node.id !== id))
            }
          />
        </div>
      </div>

      {nodeList[data.type] && <CustomNode id={id} data={data} />}

      {handleInfo.map((handle) => {
        return (
          <CustomHandle
            key={handle.id}
            id={handle.id}
            type={handle.type}
            position={handle.position}
          />
        );
      })}
    </div>
  );
}

const inputStyles = "border w-full border-gray-300 rounded-md px-2 py-1 nodrag";

function CustomInputNode({ id, data }) {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace("customInput-", "input_")
  );

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const [inputType, setInputType] = useState("Text");
  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };
  return (
    <div className="p-4">
      <div className="flex flex-col gap-4">
        <label className="flex flex-col gap-2">
          Name:
          <input
            type="text"
            value={currName}
            onChange={handleNameChange}
            className={inputStyles}
          />
        </label>
        <label className="flex flex-col gap-2">
          Type:
          <select
            value={inputType}
            onChange={handleTypeChange}
            className={inputStyles}
          >
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </label>
      </div>
    </div>
  );
}

function CustomOutputNode({ id, data }) {
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace("customOutput-", "output_")
  );
  const [outputType, setOutputType] = useState(data.outputType || "Text");

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };
  return (
    <div className="p-4">
      <div className="flex flex-col gap-4">
        <label className="flex flex-col gap-2">
          Name:
          <input
            type="text"
            value={currName}
            onChange={handleNameChange}
            className={inputStyles}
          />
        </label>
        <label className="flex flex-col gap-2">
          Type:
          <select
            value={outputType}
            onChange={handleTypeChange}
            className={inputStyles}
          >
            <option value="Text">Text</option>
            <option value="File">Image</option>
          </select>
        </label>
      </div>
    </div>
  );
}

function TextNode({ id, data }) {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");
  const [handles, setHandles] = useState([]);
  const inputRef = useRef(null);
  const updateNodeInternals = useUpdateNodeInternals();

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  useEffect(() => {
    if (inputRef.current) {
      const { current } = inputRef;
      current.style.height = "auto";
      current.style.height = `${current.scrollHeight}px`;

      current.style.width = "auto";
      current.style.width = `${current.scrollWidth}px`;

      if (current.scrollWidth >= 300) {
        current.style.minWidth = "300px";
        current.style.whiteSpace = "normal";
      }
    }
  }, [currText]);

  useEffect(() => {
    const createHandles = () => {
      const variableRegex = /\{\{(\w+)\}\}/g;
      let match;
      const newHandles = [];

      while ((match = variableRegex.exec(currText)) !== null) {
        newHandles.push({
          id: `input-${match[1]}`,
          type: "target",
          position: "left",
        });
      }

      setHandles(newHandles);

      setTimeout(() => {
        updateNodeInternals(id);
      }, 0);
    };

    createHandles();
  }, [currText, id, updateNodeInternals]);

  return (
    <div className="p-4 relative">
      <div className="flex flex-col gap-4">
        <label className="flex flex-col gap-2">
          Text:
          <textarea
            ref={inputRef}
            value={currText}
            onChange={handleTextChange}
            draggable={false}
            className={`resize-none overflow-hidden text-nowrap max-w-[400px] nodrag ${inputStyles}`}
          />
        </label>
      </div>
      <div className="handles-container">
        {handles.map((handle, index) => (
          <CustomHandle
            key={handle.id}
            id={handle.id}
            type={handle.type}
            position={handle.position}
            style={{
              top: `${(index * 100) / handles.length}%`,
              left: "-16px",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default TextNode;

function NoteNode({ id, data }) {
  const [currText, setCurrText] = useState(
    data?.text || "Enter Your Note here..."
  );

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };
  return (
    <div className="pt-4 px-2 relative h-full grow">
      <textarea
        value={currText}
        onChange={handleTextChange}
        draggable={false}
        rows={6}
        cols={30}
        className={`resize h-full max-w-[300px] nodrag ${inputStyles}`}
      />
    </div>
  );
}

function LlmNode({ id, data }) {
  const [currText, setCurrText] = useState(data?.text || "Enter Prompt.");

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  const [inputType, setInputType] = useState("Text");
  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  return (
    <div className="p-4">
      <div className="flex flex-col gap-4">
        <label className="flex flex-col gap-2">
          Prompt
          <input
            type="text"
            value={currText}
            onChange={handleTextChange}
            className={inputStyles}
          />
        </label>
        <label className="flex flex-col gap-2">
          Model
          <select
            value={inputType}
            onChange={handleTypeChange}
            className={inputStyles}
          >
            <option value="Text">Chapt GPT 4</option>
            <option value="File">Chapt GPT 3.5</option>
          </select>
        </label>
      </div>
    </div>
  );
}
