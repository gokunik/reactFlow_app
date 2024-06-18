import { useReactFlow } from "reactflow";

export const SubmitButton = () => {
  const { getNodes, getEdges } = useReactFlow();

  const handleSubmit = async () => {
    const nodes = getNodes().map((node) => node.id);
    const edges = getEdges().map((edge) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
    }));

    const response = await fetch("http://localhost:8000/pipelines/parse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nodes, edges }),
    });

    const data = await response.json();
    alert(
      `Number of nodes: ${data.num_nodes}\nNumber of edges: ${data.num_edges}\nIs DAG: ${data.is_dag}`
    );
  };
  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2">
      <button
        onClick={handleSubmit}
        type="button"
        className="bg-violet-600 text-white py-2 px-4 rounded"
      >
        Submit
      </button>
    </div>
  );
};
