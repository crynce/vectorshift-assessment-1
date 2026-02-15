from fastapi import FastAPI, Form

app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

from pydantic import BaseModel
from typing import List, Dict, Any

class PipelineData(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: PipelineData):
    nodes = pipeline.nodes
    edges = pipeline.edges
    num_nodes = len(nodes)
    num_edges = len(edges)

    # Build adjacency list for DAG check
    adj = {node['id']: [] for node in nodes}
    for edge in edges:
        source = edge['source']
        target = edge['target']
        if source in adj:
            adj[source].append(target)

    
    # Check for cycles using DFS
    visited = set()
    rec_stack = set()
    
    def is_cyclic(node):
        visited.add(node)
        rec_stack.add(node)
        
        if node in adj:
            for neighbor in adj[node]:
                if neighbor not in visited:
                    if is_cyclic(neighbor):
                        return True
                elif neighbor in rec_stack:
                    return True
        
        rec_stack.remove(node)
        return False
        
    is_dag = True
    for node in adj:
        if node not in visited:
            if is_cyclic(node):
                is_dag = False
                break

    return {'num_nodes': num_nodes, 'num_edges': num_edges, 'is_dag': is_dag}
