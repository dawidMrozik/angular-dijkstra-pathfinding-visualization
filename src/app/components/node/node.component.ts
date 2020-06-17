import { Component, OnInit, Input } from '@angular/core';
import { GraphService } from 'src/app/services/graph.service';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss'],
})
export class NodeComponent implements OnInit {
  @Input() node: string;
  @Input() distance: number;
  @Input() isOnPath: boolean;
  @Input() isEndNode: boolean;
  @Input() isStartNode: boolean;
  isWall: boolean = false;

  constructor(
    private graphService: GraphService,
    private appService: AppService
  ) {}

  ngOnInit(): void {}

  handleNodeLeftClick() {
    const state = this.appService.getState();

    if (state === 'idle') {
      this.appService.setStartNode(this.node);
    }
  }

  onRightClick() {
    const state = this.appService.getState();

    if (state === 'idle') this.appService.setEndNode(this.node);
  }

  distanceToShow() {
    return this.distance === Infinity ? '' : this.distance;
  }

  toggleWall() {
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
