import React from 'react';
import { render } from '@testing-library/react';
import { Modal } from './Modal';
describe('Modal', () => {
  it('renders without crashing when open', () => {
    const { getByText } = render(
      <Modal open={true} onClose={() => {}} title="Test Modal">
        Modal Content
      </Modal>
    );
    expect(getByText('Test Modal')).toBeInTheDocument();
    expect(getByText('Modal Content')).toBeInTheDocument();
  });

  it('renders nothing when closed', () => {
    const { queryByText } = render(
      <Modal open={false} onClose={() => {}} title="Closed Modal">
        Hidden Content
      </Modal>
    );
    expect(queryByText('Closed Modal')).not.toBeInTheDocument();
  });

  it('supports compound subcomponents Modal.Header, Modal.Body, and Modal.Footer', () => {
    const { getByTestId } = render(
      <Modal open={true} onClose={() => {}}>
        <Modal.Header data-testid="modal-h">Compound Header</Modal.Header>
        <Modal.Body data-testid="modal-b">Compound Body</Modal.Body>
        <Modal.Footer data-testid="modal-f"><button>Submit</button></Modal.Footer>
      </Modal>
    );
    expect(getByTestId('modal-h')).toHaveTextContent('Compound Header');
    expect(getByTestId('modal-b')).toHaveTextContent('Compound Body');
    expect(getByTestId('modal-f')).toHaveTextContent('Submit');
  });
});
