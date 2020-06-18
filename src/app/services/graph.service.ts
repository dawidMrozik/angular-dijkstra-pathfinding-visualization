import { Injectable } from '@angular/core';
import Graph from '../algorithms/graph';

@Injectable({
  providedIn: 'root',
})
export class GraphService {
  graph;
  WIDTH = 30;
  HEIGHT = 30;

  constructor() {
    this.resetGraph();
  }

  getGraph() {
    return this.graph;
  }

  resetGraph() {
    this.graph = new Graph();

    for (let row = 0; row < this.HEIGHT; row++) {
      for (let col = 0; col < this.WIDTH; col++) {
        this.graph.addNode(`${row}|${col}`);
      }
    }

    for (let row = 0; row < this.HEIGHT; row++) {
      for (let col = 0; col < this.WIDTH; col++) {
        this.addEdges(row, col);
      }
    }
  }

  addEdges(row, col) {
    if (row !== 0) {
      this.graph.addEdge(`${row}|${col}`, `${row - 1}|${col}`);
    }

    if (col !== 0) {
      this.graph.addEdge(`${row}|${col}`, `${row}|${col - 1}`);
    }

    if (col !== this.WIDTH - 1) {
      this.graph.addEdge(`${row}|${col}`, `${row}|${col + 1}`);
    }

    if (row !== this.HEIGHT - 1)
      this.graph.addEdge(`${row}|${col}`, `${row + 1}|${col}`);
  }

  getNodes() {
    return this.graph.nodes;
  }

  getEdges() {
    return this.graph.edges;
  }

  getPath() {
    return this.graph.path;
  }

  removeNode(node: string) {
    this.graph.removeNode(node);
  }
}
