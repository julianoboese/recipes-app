import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import App from '../../App';

export const history = createMemoryHistory();
export const renderUrl = (URL) => {
  history.push(URL);

  const { ...resources } = render(<Router history={ history }><App /></Router>);
  return { ...resources, history };
};
