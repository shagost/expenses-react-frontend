export interface IExpense {
  id: number;
  descricao: string;
  categoria: string;
  valor: number;
  mes: string;
  dia: string;
}

export interface IUser {
  nome: string;
  email: string;
}

const url = 'http://localhost:3001';

export function getExpensesEndpoint(date: string): Promise<IExpense[]> {
  return fetch(`${url}/despesas?mes=${date}&_sort=dia`, {
    credentials: 'include',
  }).then(handleResponse);
}

export function getUserEndpoint(): Promise<IUser> {
  return fetch(`${url}/sessao/usuario`, {
    credentials: 'include',
  }).then(handleResponse);
}

export function signInEndpoint(email: string, senha: string): Promise<IUser> {
  return fetch(`${url}/sessao/criar`, {
    credentials: 'include',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha }),
  }).then(handleResponse);
}

export function signOutEndpoint(): Promise<void> {
  return fetch(`${url}/sessao/finalizar`, {
    credentials: 'include',
    method: 'POST',
  }).then(handleResponse);
}

function handleResponse(resp: Response) {
  if (resp.ok) {
    return resp.json();
  } else {
    throw new Error(resp.statusText);
  }
}
