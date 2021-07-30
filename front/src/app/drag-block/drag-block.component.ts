import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { constructBlock } from '../interface/IconstructBlock';


@Component({
  selector: 'app-drag-block',
  templateUrl: './drag-block.component.html',
  styleUrls: ['./drag-block.component.scss']
})
export class DragBlockComponent implements OnInit {

  @Input() item!: constructBlock
  @Input() check?: boolean

  @Output() onAdd = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  onClick(item: constructBlock): void {
    this.onAdd.emit(item)
  }
}
