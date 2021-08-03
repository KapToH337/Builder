import { AuthService } from '../auth.service';
import { MainAppComponent } from './main-app.component';

describe('MainAppComponent', () => {
  let commponent: MainAppComponent;
  let authService: AuthService;

  beforeEach(() => {
    commponent = new MainAppComponent(authService);
  });

  it('should create id', () => {
    commponent.todo = [];
    const { length } = commponent.todo;

    commponent.onAdd({ id: 'input', placeholder: 'input', styles: {} });
    expect(commponent.todo[0].id).toBe(`input${length}`);
  });

  it('should create id if id already create', () => {
    commponent.todo = [{ id: 'input1', placeholder: 'input', styles: {} }];

    commponent.onAdd({ id: 'input', placeholder: 'input', styles: {} });
    expect(commponent.todo[1].id).toBe(`input${Date.now()}`);
  });

  it('should remove item in array', () => {
    commponent.todo = [{ id: 'input1', placeholder: 'input', styles: {} }];

    commponent.onRemove('input1');
    expect(commponent.todo.length).toBe(0);
  });
});
