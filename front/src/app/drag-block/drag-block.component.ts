import {
  Component, EventEmitter, Input, Output,
} from '@angular/core';

import { MainConstructBlock } from '../main-app/main-app.interfaces';

@Component({
  selector: 'app-drag-block',
  templateUrl: './drag-block.component.html',
  styleUrls: ['./drag-block.component.scss'],
})
export class DragBlockComponent {
  @Input() public item!: MainConstructBlock;

  @Input() public check?: boolean;

  @Output() public add = new EventEmitter();

  // constructor() {}

  // ngOnInit(): void {}

  public onClick(item: MainConstructBlock): void {
    this.add.emit(item);
  }
}

export default DragBlockComponent;
