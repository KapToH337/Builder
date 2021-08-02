import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { mainConstructBlock } from '../main-app/main-app.interfaces';


@Component({
  selector: 'app-drag-block',
  templateUrl: './drag-block.component.html',
  styleUrls: ['./drag-block.component.scss']
})
export class DragBlockComponent implements OnInit {

  @Input() public item!: mainConstructBlock
  @Input() public check?: boolean

  @Output() public onAdd = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  public onClick(item: mainConstructBlock): void {
    this.onAdd.emit(item)
  }
}
