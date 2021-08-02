import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { mainConstructBlock } from '../main-app/main-app.interfaces';
import { stylesBlock } from './styles-block.interfaces';


@Component({
  selector: 'app-styles-block',
  templateUrl: './styles-block.component.html',
  styleUrls: ['./styles-block.component.scss']
})
export class StylesBlockComponent implements OnInit {

  @Input() public item!: mainConstructBlock

  @Output() public deleteItem = new EventEmitter()
  @Output() public redact = new EventEmitter()

  public active: string = ''
  public change: boolean = false

  public keys: Array<string> = []
  public obj: stylesBlock = {}

  constructor() { }

  ngOnInit(): void {
  }

  public onSelect(item: string): void {
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

  public onChange(): void {
    this.change = !this.change
  }

  public onStyle(key: string, event: Event): void {
    if (this.obj.width === undefined) {
      this.obj = Object.assign({}, this.item.styles)
    }

    this.obj[key] = (<HTMLInputElement>event.target).value
  }

  public onApply(): void {
    this.change = false
    this.active = ''
    const obj = Object.assign({}, this.obj)

    if (this.obj.width !== undefined) {
      Object.assign(this.item, {styles: obj})
    }
  }

  public onDelete(item: string): void {
    this.deleteItem.emit(item)
  }
}
