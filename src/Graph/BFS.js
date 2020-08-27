import Queue from './Queue';

export default function BFS(graph, startValue, currentNodeFunction) {
  let startNode = graph.getNode(startValue);
  let visitedNodesHash = graph.nodes.reduce((accumulator, currentNode) => {
    accumulator[currentNode.value] = false;
    return accumulator;
  }, {});

  const queue = new Queue();
  queue.enqueue(startNode);
  while (!queue.isEmpty()) {
    let currentNode = queue.dequeue();
    if (!visitedNodesHash[currentNode.value]) {
      const shouldEnd = currentNodeFunction(currentNode);
      if (shouldEnd) return;
      visitedNodesHash[currentNode.value] = true;
    }

    currentNode.edges.forEach((node) => {
      if (!visitedNodesHash[node.value]) {
        queue.enqueue(node);
      }
    });
  }
}
