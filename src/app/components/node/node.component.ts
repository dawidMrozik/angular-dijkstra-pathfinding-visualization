import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GraphService } from 'src/app/services/graph.service';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss'],
})
export class NodeComponent implements OnInit {
  @Input() node: string;
  @Input() state: string;
  @Input() distance: number;
  @Input() isOnPath: boolean;
  @Input() isEndNode: boolean;
  @Input() isStartNode: boolean;
  isWall: boolean = false;
  @Output() setStartNode: EventEmitter<string> = new EventEmitter();
  @Output() setEndNode: EventEmitter<string> = new EventEmitter();

  constructor(private graphService: GraphService) {}

  ngOnInit(): void {}

  handleNodeLeftClick() {
    if (this.state !== 'readyToWalls') {
      this.setStartNode.emit(this.node);
    } else {
      this.toggleWall();
    }
  }

  onRightClick() {
    this.setEndNode.emit(this.node);

    return false; // disables default behavior
  }

  distanceToShow() {
    return this.distance === Infinity ? '' : this.distance;
  }

  toggleWall() {
    if (!this.isStartNode && !this.isEndNode) {
      if (!this.isWall) {
        this.graphService.removeNode(this.node);
        this.isWall = true;
      } else {
        const [rowString, colString] = this.node.split('|');
        const row = Number(rowString);
        const col = Number(colString);
        this.graphService.addEdges(row, col);
        this.isWall = false;
      }
    }
  }
}
