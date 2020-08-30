import Node from './Node';
import Queue from './Queue';

export default class Graph {
  constructor() {
    this.nodes = {};
  }

  addNode(value) {
    this.nodes[value] = new Node();
  }

  removeNode(value) {
    delete this.nodes[value];
    Object.keys(this.nodes).forEach((node) => {
      this.nodes[node].edges = this.nodes[node].edges.filter(
        (edge) => edge !== value
      );
    });
  }

  getNode(value) {
    return this.nodes[value];
  }

  addEdge(value1, value2) {
    const node1 = this.getNode(value1);

    node1.edges.push(value2);
  }

  BFS(startValue, currentFunction) {
    let q = new Queue();
    let explored = new Set();
    q.enqueue(startValue);

    explored.add(startValue);

    while (!q.isEmpty()) {
      let currentValue = q.dequeue();

      const shouldEnd = currentFunction(currentValue);
      if (shouldEnd) return;

      this.nodes[currentValue].edges
        .filter((n) => !explored.has(n))
        .forEach((n) => {
          explored.add(n);
          q.enqueue(n);
        });
    }
  }
}
