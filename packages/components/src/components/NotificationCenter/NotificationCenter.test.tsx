import React from 'react';
import { render } from '@testing-library/react';
import { NotificationCenter } from './NotificationCenter';
describe('NotificationCenter', () => { it('renders without crashing', () => { render(<NotificationCenter />); }); });
