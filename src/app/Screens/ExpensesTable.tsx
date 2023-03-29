import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  makeStyles,
} from '@material-ui/core';
import { formatNumber } from '../helpers/numberHelper';
import { IExpense } from '../services/backend';

const useStyles = makeStyles({
  table: {
    borderTop: '1px solid rgb(224,224,224)',
    minHeight: '100%',
    tableLayout: 'fixed',
    '& td ~ td, & th ~ th': {
      borderLeft: '1px solid rgb(224,224,224)',
    },
    '& td': {
      verticalAlign: 'top',
      overflow: 'hidden',
      padding: '8px 4px',
    },
  },
});

interface IExpensesTableProps {
  desp: IExpense[] | null;
}

export default function ExpensesTable({ desp }: IExpensesTableProps) {
  const cellTitle = ['Despesa', 'Categoria', 'Dia', 'Valor (R$)'];
  const classes = useStyles();

  return (
    <Box display="flex" flexDirection="column">
      <TableContainer component={'div'}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {cellTitle.map((title, index) => (
                <TableCell key={index} align="center">
                  {title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {desp &&
              desp.map(d => (
                <TableRow key={d.id}>
                  <TableCell>{d.descricao}</TableCell>
                  <TableCell>{d.categoria}</TableCell>
                  <TableCell align="center">{d.dia}</TableCell>
                  <TableCell align="right">{formatNumber(d.valor)}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
