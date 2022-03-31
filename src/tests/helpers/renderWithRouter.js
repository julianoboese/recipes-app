import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

export const history = createMemoryHistory();
export function renderWithRouter(component) {
  return { ...render(<Router history={ history }>{component}</Router>), history };
}
