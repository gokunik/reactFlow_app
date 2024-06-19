# to install all the dependencies run: pip install -r requirements.txt
# to run the app run: uvicorn main:app --reload

from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import networkx as nx



app = FastAPI()

class Edge(BaseModel):
    id: str
    source: str
    target: str

class Pipeline(BaseModel):
    nodes: List[str]
    edges: List[Edge]

origins = [
    "http://localhost:3000", 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
async def parse_pipeline(pipeline: Pipeline):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    
    graph = nx.DiGraph()
    for node_id in pipeline.nodes:
        graph.add_node(node_id)
    for edge in pipeline.edges:
        graph.add_edge(edge.source, edge.target)
    
    is_dag = nx.is_directed_acyclic_graph(graph)
    
    return {"num_nodes": num_nodes, "num_edges": num_edges, "is_dag": is_dag}
