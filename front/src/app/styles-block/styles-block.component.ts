import {
  Component, EventEmitter, Input, Output,
} from '@angular/core';

import { MainConstructBlock } from '../main-app/main-app.interfaces';
import { StylesBlock } from './styles-block.interfaces';

@Component({
  selector: 'app-styles-block',
  templateUrl: './styles-block.component.html',
  styleUrls: ['./styles-block.component.scss'],
})
export class StylesBlockComponent {
  @Input() public item!: MainConstructBlock;

  @Output() public deleteItem = new EventEmitter();

  @Output() public redact = new EventEmitter();

  public active: string = '';

  public change: boolean = false;

  public keys: Array<string> = [];

  public obj: StylesBlock = {};

  // constructor() {}

  // ngOnInit(): void {}

  public onSelect(item: string): void {
    if (this.active !== item) {
      this.active = item;
    } else {
      this.active = '';
    }

    if (this.keys.length === 0) {
      this.keys = Object.keys(this.item.styles);
    }
  }

  public onChange(): void {
    this.change = !this.change;
  }

  public onStyle(key: string, event: Event): void {
    if (this.obj.width === undefined) {
      this.obj = this.item.styles;
    }

    this.obj[key] = (<HTMLInputElement>event.target).value;
  }

  public onApply(): void {
    this.change = false;
    this.active = '';
    const { obj } = this;

    if (this.obj.width !== undefined) {
      Object.assign(this.item, { styles: obj });
    }
  }

  public onDelete(item: string): void {
    this.deleteItem.emit(item);
  }
}

export default StylesBlockComponent;
