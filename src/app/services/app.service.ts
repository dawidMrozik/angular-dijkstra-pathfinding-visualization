import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private state: string = 'idle';
  private startNode: string = null;
  private endNode: string = null;

  constructor() {}

  getState() {
    return this.state;
  }

  setState(state) {
    this.state = state;
  }

  getStartNode() {
    return this.startNode;
  }

  setStartNode(startNode) {
    this.startNode = startNode;
  }

  getEndNode() {
    return this.endNode;
  }

  setEndNode(endNode) {
    this.endNode = endNode;
  }
}
