import { StylesBlockComponent } from './styles-block.component';

describe('StylesBlockComponent', () => {
  let commponent: StylesBlockComponent;

  beforeEach(() => {
    commponent = new StylesBlockComponent();
  });

  it('should increment value by event emitter', () => {
    let result = '';
    commponent.deleteItem.subscribe((value) => { result = value; });

    commponent.onDelete('item');

    expect(result).toBe('item');
  });

  it('should change boolean value', () => {
    commponent.change = false;
    commponent.onChange();
    expect(commponent.change).toBe(true);
  });
});
