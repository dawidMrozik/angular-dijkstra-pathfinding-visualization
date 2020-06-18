import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit, OnChanges {
  @Input() state: string;
  @Output() startAlgorithm: EventEmitter<any> = new EventEmitter();
  @Output() resetGrid: EventEmitter<any> = new EventEmitter();
  hint: string = 'Hey! Select your starting point with left click';

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    if (this.state === 'startSelected')
      this.hint = 'Select end point with right click';
    if (this.state === 'endSelected')
      this.hint = 'Select your starting point with left click';
    if (this.state === 'readyToWalls')
      this.hint = 'Now you can setup walls with left click';
  }

  onStartAlgorithm() {
    this.startAlgorithm.emit();
  }

  onResetGrid() {
    this.resetGrid.emit();
  }
}
