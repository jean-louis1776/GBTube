import { render } from '@testing-library/react';
import ChildItem from './child-item';
describe('ChildItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChildItem />);
    expect(baseElement).toBeTruthy();
  });
});
