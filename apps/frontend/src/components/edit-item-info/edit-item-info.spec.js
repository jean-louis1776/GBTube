import { render } from '@testing-library/react';
import EditItemInfo from './edit-item-info';
describe('EditItemInfo', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EditItemInfo />);
    expect(baseElement).toBeTruthy();
  });
});
