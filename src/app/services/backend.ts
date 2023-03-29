export interface IExpense {
  id: number;
  descricao: string;
  categoria: string;
  valor: number;
  mes: string;
  dia: string;
}

export function getExpensesEndpoint(date: string): Promise<IExpense[]> {
  return fetch(`http://localhost:3001/despesas?mes=${date}&_sort=dia`).then(
    resp => {
      return resp.json();
    }
  );
}
