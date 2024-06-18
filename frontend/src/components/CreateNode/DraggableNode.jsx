export const DraggableNode = ({ nodeData }) => {
  const { type, iconUrl, label } = nodeData;
  const onDragStart = (event) => {
    event.target.style.cursor = "grabbing";
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(nodeData)
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className={`${type} cursor-grab px-2 min-w-20 h-20 flex items-center rounded-lg border bg-white border-zinc-300 justify-center flex-col`}
      onDragStart={(event) => onDragStart(event)}
      onDragEnd={(event) => (event.target.style.cursor = "grab")}
      draggable
    >
      <img
        width="24"
        height="24"
        src={iconUrl}
        alt="import"
        className="nodrag"
        draggable="false"
      />
      <span>{label}</span>
    </div>
  );
};
