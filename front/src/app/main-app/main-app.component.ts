import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-main-app',
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.scss']
})
export class MainAppComponent implements OnInit {

  todo: any = [];

  done = [
    {id: 'Input', placeholder: 'Input', styles: {width: '200px', height: '30px', border: '2px solid black', borderRadius: '5px', color: 'black'}},
    {id: 'Button', placeholder: 'Button', styles: {width: '50px', height: '30px', border: 'none', borderRadius: '10px', backgroundColor: 'blue', color: 'white'}},
    {id: 'checkbox', placeholder: 'checkbox', styles: {}},
    {id: 'Select', placeholder: 'Select', styles: {width: '80px', height: '20px', border: 'none', backgroundColor: 'white', color: 'black'}},
    {id: 'Textarea', placeholder: 'Textarea', styles: {width: '200px', height: '50px', border: '2px solid black', color: 'black'}}
  ];

  constructor(private _auth: AuthService) { }

  ngOnInit(): void {
    this._auth.optionUser()
      .subscribe(
        (res: any) => this.todo = res.option,
        err => console.log(err)
      )
  }

  onAdd = (item: any) => {
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

  onRemove = (item: string) => {
    this.todo.splice(this.todo.findIndex((i: any) => i.id === item), 1)
  }

  saveData = () => {
    this._auth.loginedUser({userOption: this.todo})
      .subscribe(
        res => console.log('Save'),
        err => console.log(err)
      )
  }

}
