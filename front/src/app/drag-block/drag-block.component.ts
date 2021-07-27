import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-drag-block',
  templateUrl: './drag-block.component.html',
  styleUrls: ['./drag-block.component.scss']
})
export class DragBlockComponent implements OnInit {

  @Input() item!: any
  @Input() check!: boolean

  @Output() onAdd = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  onClick = (item: string) => {
    this.onAdd.emit(item)
  }
}
