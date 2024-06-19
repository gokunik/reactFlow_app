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

    try {
      const response = await fetch("http://localhost:8000/pipelines/parse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nodes, edges }),
      });

      const data = await response.json();

      if (
        response.ok &&
        data.num_nodes !== undefined &&
        data.num_edges !== undefined &&
        data.is_dag !== undefined
      ) {
        alert(
          `Number of nodes: ${data.num_nodes}\nNumber of edges: ${data.num_edges}\nIs DAG: ${data.is_dag}`
        );
      } else {
        alert("Could not fetch the correct data from the server");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong, check console for error");
    }
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
