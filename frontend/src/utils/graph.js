export const isDag = (nodes, edges) => {
  const graph = {};
  const indegree = {};

  // Build DAG adjacency list from the current ReactFlow graph.
  nodes.forEach((node) => {
    graph[node.id] = [];
    indegree[node.id] = 0;
  });

  edges.forEach((edge) => {
    if (graph[edge.source] && indegree[edge.target] !== undefined) {
      graph[edge.source].push(edge.target);
      indegree[edge.target] += 1;
    }
  });

  const queue = Object.keys(indegree).filter((nodeId) => indegree[nodeId] === 0);
  let visited = 0;

  while (queue.length) {
    const current = queue.shift();
    visited += 1;

    graph[current].forEach((neighbor) => {
      indegree[neighbor] -= 1;

      if (indegree[neighbor] === 0) {
        queue.push(neighbor);
      }
    });
  }

  return visited === nodes.length;
};

