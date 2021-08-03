import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from '../auth.service';

import { MainConstructBlock } from './main-app.interfaces';
import { UserOption } from '../interface/IuserOption';

@Component({
  selector: 'app-main-app',
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.scss'],
})
export class MainAppComponent implements OnInit {
  private unsubscribe$ = new Subject();

  public todo: Array<MainConstructBlock> = [];

  public done: Array<MainConstructBlock> = [
    {
      id: 'Input',
      placeholder: 'Input',
      styles: {
        width: '200px',
        height: '30px',
        border: '2px solid black',
        borderRadius: '5px',
        color: 'black',
      },
    },
    {
      id: 'Button',
      placeholder: 'Button',
      styles: {
        width: '50px',
        height: '30px',
        border: 'none',
        borderRadius: '10px',
        backgroundColor: 'blue',
        color: 'white',
      },
    },
    { id: 'checkbox', placeholder: 'checkbox', styles: {} },
    {
      id: 'Select',
      placeholder: 'Select',
      styles: {
        width: '80px',
        height: '20px',
        border: 'none',
        backgroundColor: 'white',
        color: 'black',
      },
    },
    {
      id: 'Textarea',
      placeholder: 'Textarea',
      styles: {
        width: '200px', height: '50px', border: '2px solid black', color: 'black',
      },
    },
  ];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService
      .getOptionUser()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (res: UserOption) => { this.todo = res.option!; },
        (err) => console.log(err),
      );
  }

  private existIdCheck(item: MainConstructBlock): boolean {
    const id = item.id + this.todo.length;
    const value = this.todo.some((todo: MainConstructBlock) => (
      todo.id === id
    ));

    return value;
  }

  public onAdd(item: MainConstructBlock): void {
    if (this.existIdCheck(item)) {
      this.todo.push({
        id: item.id + Date.now(),
        placeholder: item.placeholder,
        styles: item.styles,
      });
    } else {
      this.todo.push({
        id: item.id + this.todo.length,
        placeholder: item.placeholder,
        styles: item.styles,
      });
    }
  }

  public onRemove(item: string): void {
    this.todo.splice(
      this.todo.findIndex((i: MainConstructBlock) => i.id === item),
      1,
    );
  }

  public saveData(): void {
    this.authService.optionUserChange({ userOption: this.todo }).subscribe(
      () => console.log('Save'),
      (err) => console.log(err),
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

export default MainAppComponent;
