import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ConstructBlock } from '../main-app/main-app.component';

@Component({
  selector: 'app-drag-block',
  templateUrl: './drag-block.component.html',
  styleUrls: ['./drag-block.component.scss']
})
export class DragBlockComponent implements OnInit {

  @Input() item!: ConstructBlock
  @Input() check?: boolean

  @Output() onAdd = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  onClick(item: ConstructBlock): void {
    this.onAdd.emit(item)
  }
}
