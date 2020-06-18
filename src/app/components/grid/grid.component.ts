import { Component, OnInit, OnChanges } from '@angular/core';
import { GraphService } from 'src/app/services/graph.service';
import PriorityQueue from '../../algorithms/PriorityQueue';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit {
  nodes = [];
  distances = {};
  startNode: string = null;
  endNode: string = null;
  path = {};
  nodesOnPath = [];
  state = 'idle';

  constructor(private graphService: GraphService) {}

  ngOnInit(): void {
    this.nodes = this.graphService.getNodes();
  }

  async startAlgorithm() {
    await this.djikstraAlgorithm(this.graphService.getGraph(), this.startNode);
    this.path = this.graphService.getPath();
    this.buildPath();
  }

  resetGrid() {
    this.graphService.resetGraph();
    this.nodes = this.graphService.getNodes();
    this.distances = [];
    this.path = {};
    this.nodesOnPath = [];
    this.startNode = null;
    this.endNode = null;
    this.state = 'idle';
  }

  async buildPath() {
    const pathExists: boolean = this.distances[this.endNode] !== Infinity;

    if (pathExists) {
      let currentNode = this.path[this.endNode];

      while (
        currentNode !== this.startNode ||
        this.path[currentNode] !== null
      ) {
        this.nodesOnPath.unshift(currentNode);
        currentNode = this.path[currentNode];
        await new Promise((r) => setTimeout(r, 100));
      }
    } else {
      console.log('Path does not exist :(');
    }
  }

  async djikstraAlgorithm(graph, startNode) {
    let pq = new PriorityQueue(graph.nodes.length * graph.nodes.length);
    let currentIteration = 0;

    // Set distances to all nodes to be infinite except startNode
    this.distances[startNode] = 0;
    pq.enqueue(startNode, 0);

    graph.nodes.forEach((node) => {
      if (node !== startNode) this.distances[node] = Infinity;
      graph.path[node] = null;
    });

    while (!pq.isEmpty()) {
      let minNode = pq.dequeue();
      let currNode = minNode.data;
      let weight = minNode.priority;

      for (let neighbor of graph.edges[currNode]) {
        let alt = this.distances[currNode] + neighbor.weight;
        if (alt < this.distances[neighbor.node]) {
          this.distances[neighbor.node] = alt;
          graph.path[neighbor.node] = currNode;
          pq.enqueue(neighbor.node, this.distances[neighbor.node]);
        }
      }

      if (currentIteration % 1000 === 0)
        await new Promise((r) => setTimeout(r, 1));

      currentIteration++;
    }
  }

  checkIfReadyToWalls() {
    if (this.startNode && this.endNode) this.state = 'readyToWalls';
  }

  setStartNode(node) {
    this.startNode = node;
    this.state = 'startSelected';
    this.checkIfReadyToWalls();
  }

  setEndNode(node) {
    this.endNode = node;
    this.state = 'endSelected';
    this.checkIfReadyToWalls();
  }
}
