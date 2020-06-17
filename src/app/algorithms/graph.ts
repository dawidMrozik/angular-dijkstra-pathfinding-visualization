import PriorityQueue from './PriorityQueue';

export default class Graph {
  edges = {};
  nodes = [];
  path = {};

  addNode(node: string): void {
    this.nodes.push(node);
    this.edges[node] = [];
  }

  removeNode(node: string): void {
    this.edges[node].forEach((edge) => {
      this.edges[edge.node] = this.edges[edge.node].filter(
        (x) => x.node !== node
      );
    });
  }

  addEdge(node1: string, node2: string, weight: number = 1): void {
    this.edges[node1].push({ node: node2, weight });
    this.edges[node2].push({ node: node1, weight });
  }

  addDirectedEdge(node1, node2, weight = 1) {
    this.edges[node1].push({ node: node2, weight: weight });
  }

  display() {
    let graph = '';
    this.nodes.forEach((node) => {
      graph +=
        node + '->' + this.edges[node].map((n) => n.node).join(', ') + '\n';
    });
    console.log(graph);
  }
}
