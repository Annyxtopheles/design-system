import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Accordion, AccordionItem } from './Accordion';

describe('Accordion Component', () => {
  it('renders accordion items', () => {
    render(
      <Accordion>
        <AccordionItem title="Item 1">Content 1</AccordionItem>
        <AccordionItem title="Item 2">Content 2</AccordionItem>
      </Accordion>
    );
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('toggles item on click', () => {
    render(
      <Accordion>
        <AccordionItem title="Item 1">Content 1</AccordionItem>
      </Accordion>
    );
    const header = screen.getByRole('button', { name: 'Item 1' });
    expect(header).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(header);
    expect(header).toHaveAttribute('aria-expanded', 'true');
  });

  it('handles allowMultiple correctly', () => {
    render(
      <Accordion allowMultiple>
        <AccordionItem title="Item 1">Content 1</AccordionItem>
        <AccordionItem title="Item 2">Content 2</AccordionItem>
      </Accordion>
    );
    const header1 = screen.getByRole('button', { name: 'Item 1' });
    const header2 = screen.getByRole('button', { name: 'Item 2' });
    
    fireEvent.click(header1);
    fireEvent.click(header2);

    expect(header1).toHaveAttribute('aria-expanded', 'true');
    expect(header2).toHaveAttribute('aria-expanded', 'true');
  });

  it('supports keyboard navigation', () => {
    render(
      <Accordion>
        <AccordionItem title="Item 1">Content 1</AccordionItem>
        <AccordionItem title="Item 2">Content 2</AccordionItem>
        <AccordionItem title="Item 3">Content 3</AccordionItem>
      </Accordion>
    );
    
    const headers = screen.getAllByRole('button');
    headers[0].focus();
    
    fireEvent.keyDown(headers[0], { key: 'ArrowDown', code: 'ArrowDown' });
    expect(document.activeElement).toBe(headers[1]);
    
    fireEvent.keyDown(headers[1], { key: 'End', code: 'End' });
    expect(document.activeElement).toBe(headers[2]);
    
    fireEvent.keyDown(headers[2], { key: 'Home', code: 'Home' });
    expect(document.activeElement).toBe(headers[0]);
  });
});
