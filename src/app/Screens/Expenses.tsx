import { Box, Tab, Tabs } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { formatNumber } from '../helpers/numberHelper';
import { getExpensesEndpoint, IExpense, IUser } from '../services/backend';
import ExpensesCategory from './ExpensesCategory';
import ExpensesHeader from './ExpensesHeader';
import ExpensesTable from './ExpensesTable';

interface IExpensesProps {
  onSignOut: () => void;
  user: IUser;
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Expenses(props: IExpensesProps) {
  const [desp, setDesp] = useState<IExpense[] | null>([]);
  const history = useHistory();
  const { month } = useParams<{ month: string }>();
  const [value, setValue] = useState(0);

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

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

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
      <Box>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
          }}
        >
          <Tabs
            centered
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Resumo" {...a11yProps(0)} />
            <Tab label="Detalhes" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <ExpensesCategory desp={desp} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ExpensesTable desp={desp} />
        </TabPanel>
      </Box>
    </>
  );
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}
