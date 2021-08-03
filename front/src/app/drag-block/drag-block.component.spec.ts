import { DragBlockComponent } from './drag-block.component';

describe('DragBlockComponent', () => {
  let commponent: DragBlockComponent;

  beforeEach(() => {
    commponent = new DragBlockComponent();
  });

  it('should increment value by event emitter', () => {
    let result = '';
    commponent.onAdd.subscribe((item) => { result = item; });

    commponent.onClick({ id: 'input', placeholder: 'input', styles: {} });

    expect(result).toBe('input');
  });
});
