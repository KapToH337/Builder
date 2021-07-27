import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-styles-block',
  templateUrl: './styles-block.component.html',
  styleUrls: ['./styles-block.component.scss']
})
export class StylesBlockComponent implements OnInit {

  @Input() item?: any

  @Output() deleteItem = new EventEmitter()
  @Output() redact = new EventEmitter()

  active: string = ''
  change: boolean = false

  keys: Array<string> = []
  obj: any = {}

  constructor() { }

  ngOnInit(): void {
  }

  onSelect = (item: string) => {
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

  onChange = () => {
    this.change = !this.change
  }

  onStyle = (key : string, event: any) => {
    if (this.obj.width === undefined) {
      this.obj = Object.assign({}, this.item.styles)
    }

    this.obj[key] = event.target.value
  }

  onApply = () => {
    this.change = false
    this.active = ''
    const obj = Object.assign({}, this.obj)

    if (this.obj.width !== undefined) {
      Object.assign(this.item, {styles: obj})
    }
  }

  onDelete = (item: string) => {
    this.deleteItem.emit(item)
  }
}
