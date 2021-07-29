import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ConstructBlock, stylesBlock } from '../main-app/main-app.component';

@Component({
  selector: 'app-styles-block',
  templateUrl: './styles-block.component.html',
  styleUrls: ['./styles-block.component.scss']
})
export class StylesBlockComponent implements OnInit {

  @Input() item!: ConstructBlock

  @Output() deleteItem = new EventEmitter()
  @Output() redact = new EventEmitter()

  active: string = ''
  change: boolean = false

  keys: Array<string> = []
  obj: stylesBlock = {}

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(item: string): void {
    if (this.active !== item) {
      this.active = item
    } else {
      this.active = ''
    }

    if (this.keys.length === 0) {
      for (let key in this.item.styles) {
        this.keys.push(key)
      }
    }
  }

  onChange(): void {
    this.change = !this.change
  }

  onStyle(key : string, event: any): void {
    if (this.obj.width === undefined) {
      this.obj = Object.assign({}, this.item.styles)
    }

    this.obj[key] = event.target.value
  }

  onApply(): void {
    this.change = false
    this.active = ''
    const obj = Object.assign({}, this.obj)

    if (this.obj.width !== undefined) {
      Object.assign(this.item, {styles: obj})
    }
  }

  onDelete(item: string): void {
    this.deleteItem.emit(item)
  }
}
