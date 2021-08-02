import { Component, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators'

import { AuthService } from '../auth.service';

import { mainConstructBlock } from './main-app.interfaces';
import { userOption } from '../interface/IuserOption';


@Component({
  selector: 'app-main-app',
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.scss']
})
export class MainAppComponent implements OnInit {
  private unsubscribe$ = new Subject

  public todo: Array<mainConstructBlock> = [];

  public done: Array<mainConstructBlock> = [
    {id: 'Input', placeholder: 'Input', styles: {width: '200px', height: '30px', border: '2px solid black', borderRadius: '5px', color: 'black'}},
    {id: 'Button', placeholder: 'Button', styles: {width: '50px', height: '30px', border: 'none', borderRadius: '10px', backgroundColor: 'blue', color: 'white'}},
    {id: 'checkbox', placeholder: 'checkbox', styles: {}},
    {id: 'Select', placeholder: 'Select', styles: {width: '80px', height: '20px', border: 'none', backgroundColor: 'white', color: 'black'}},
    {id: 'Textarea', placeholder: 'Textarea', styles: {width: '200px', height: '50px', border: '2px solid black', color: 'black'}}
  ];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getOptionUser()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (res: userOption) => this.todo = res.option!,
        err => console.log(err)
      )
  }

  private existIdCheck(item: mainConstructBlock): boolean {
    return this.todo.some((todo: mainConstructBlock) => {
      todo.id === item.id + this.todo.length
    })
  }

  public onAdd(item: mainConstructBlock): void {
    if (this.existIdCheck(item)) {
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

  public onRemove(item: string): void {
    this.todo.splice(this.todo.findIndex((i: mainConstructBlock) => i.id === item), 1)
  }

  public saveData(): void {
    this.authService.optionUserChange({userOption: this.todo})
      .subscribe(
        res => console.log('Save'),
        err => console.log(err)
      )
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

}
