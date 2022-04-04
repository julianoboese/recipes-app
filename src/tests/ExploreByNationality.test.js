import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderUrl } from './helpers/renderUrl';
import '@testing-library/jest-dom';
import japaneseMeals from './mocks/japaneseFoodsMock';

describe('Desenvolva os testes unitários para explorar comidas por nacionalidade', () => {
  beforeEach(() => {
    renderUrl('/explore/foods');
  });
  it('Verifique se o botão "By Nationality" existe quando explorar comidas', () => {
    const byNationalityButton = screen.getByRole('button', {
      name: /by nationality/i,
    });
    expect(byNationalityButton).toBeInTheDocument();
  });
  it('Teste se as opções são randomizadas em select', async () => {
    const byNationalityButton = screen.getByRole('button', {
      name: /by nationality/i,
    });
    userEvent.click(byNationalityButton);
    const selectBox = await screen.findByText('All');
    userEvent.selectOptions(selectBox, 'Japanese');
    expect(screen.getByText('Japanese')).toBeTruthy();
  });
});

describe('Desenvolva os testes da pagina explorar comidas por nacionalidade', () => {
  it('Teste se ao clicar no card aparecem os detalhes da receita', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(japaneseMeals),
    });
    renderUrl('/explore/foods');
    const byNationalityButton = screen.getByRole('button', {
      name: /by nationality/i,
    });
    userEvent.click(byNationalityButton);
    const selectBox = await screen.findByText('All');
    userEvent.selectOptions(selectBox, 'Japanese');
    const firstFood = screen.getByRole('link', {
      name: /chicken karaage chicken karaage/i,
    });
    userEvent.click(firstFood);
    await waitForElementToBeRemoved(() => firstFood);
    expect(global.fetch).toHaveBeenCalled();
  });
  it('Teste se retorna mensagem "Not found" quando buscar /drinks/nationalities', () => {
    const { history } = renderUrl('/');
    history.push('/explore/drinks/nationalities');
    const notFoundMsg = screen.getByText(/not found/i);
    expect(notFoundMsg).toBeInTheDocument();
  });
});
