import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { formatNumber } from '../helpers/numberHelper';
import { getExpensesEndpoint, IExpense, IUser } from '../services/backend';
import ExpensesHeader from './ExpensesHeader';
import ExpensesTable from './ExpensesTable';

interface IExpensesProps {
  onSignOut: () => void;
  user: IUser;
}

export default function Expenses(props: IExpensesProps) {
  const [desp, setDesp] = useState<IExpense[] | null>([]);
  const history = useHistory();
  const { month } = useParams<{ month: string }>();

  useEffect(() => {
    getExpensesEndpoint(month).then(resp => setDesp(resp));
  }, [month]);

  function toggleYear(newYear: string) {
    const date = `${newYear}-${month.split('-')[1]}`;
    history.push('/despesas/' + date);
  }

  function toggleMonth(newMonth: string) {
    const date = `${month.split('-')[0]}-${newMonth}`;
    history.push('/despesas/' + date);
  }

  function calcTotal() {
    if (desp) {
      const total = desp
        .map(valor => valor.valor)
        .reduce((acc, valor) => acc + valor, 0);
      return formatNumber(total);
    }
    return formatNumber(0);
  }

  const total = calcTotal();

  return (
    <>
      <ExpensesHeader
        user={props.user}
        onSignOut={props.onSignOut}
        month={month}
        total={total}
        toggleMonth={toggleMonth}
        toggleYear={toggleYear}
      />
      <ExpensesTable desp={desp} />
    </>
  );
}
