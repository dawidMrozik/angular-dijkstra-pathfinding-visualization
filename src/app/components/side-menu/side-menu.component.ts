import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
  @Output() startAlgorithm: EventEmitter<any> = new EventEmitter();
  @Output() resetGrid: EventEmitter<any> = new EventEmitter();
  hint: string = 'Hey! Select your starting point with left click';

  constructor() {}

  ngOnInit(): void {}

  onStartAlgorithm() {
    this.startAlgorithm.emit();
  }

  onResetGrid() {
    this.resetGrid.emit();
  }
}
