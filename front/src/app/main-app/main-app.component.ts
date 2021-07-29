import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth.service';

export interface stylesBlock {
  width?: string,
  height?: string,
  border?: string,
  borderRadius?: string,
  backgroundColor?: string,
  color?: string,
  [key: string]: string | undefined
}

export interface ConstructBlock {
  id: string,
  placeholder: string,
  styles: stylesBlock
}

@Component({
  selector: 'app-main-app',
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.scss']
})
export class MainAppComponent implements OnInit {

  todo: Array<ConstructBlock> = [];
  private sub?: Subscription

  done: Array<ConstructBlock> = [
    {id: 'Input', placeholder: 'Input', styles: {width: '200px', height: '30px', border: '2px solid black', borderRadius: '5px', color: 'black'}},
    {id: 'Button', placeholder: 'Button', styles: {width: '50px', height: '30px', border: 'none', borderRadius: '10px', backgroundColor: 'blue', color: 'white'}},
    {id: 'checkbox', placeholder: 'checkbox', styles: {}},
    {id: 'Select', placeholder: 'Select', styles: {width: '80px', height: '20px', border: 'none', backgroundColor: 'white', color: 'black'}},
    {id: 'Textarea', placeholder: 'Textarea', styles: {width: '200px', height: '50px', border: '2px solid black', color: 'black'}}
  ];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.sub = this.authService.optionUser()
      .subscribe(
        (res: any) => this.todo = res.option,
        err => console.log(err)
      )
  }

  onAdd(item: ConstructBlock): void {
    if (this.todo.some((todo: any) => todo.id === item.id + this.todo.length)) {
      this.todo.push({
        id: item.id + Date.now(),
        placeholder: item.placeholder,
        styles: item.styles
      })
    } else {
      this.todo.push({
        id: item.id + this.todo.length,
        placeholder: item.placeholder,
        styles: item.styles
      })
    }
  }

  onRemove(item: string): void {
    this.todo.splice(this.todo.findIndex((i: any) => i.id === item), 1)
  }

  saveData(): void {
    this.authService.loginedUser({userOption: this.todo})
      .subscribe(
        res => console.log('Save'),
        err => console.log(err)
      )
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe()
  }

}
