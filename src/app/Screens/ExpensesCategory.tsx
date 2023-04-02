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
import React from 'react';
import { formatNumber } from '../helpers/numberHelper';
import { IExpense, IExpenseCategory } from '../services/backend';

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

export default function ExpensesCategory({ desp }: IExpensesTableProps) {
  const cellTitle = ['Categoria', 'Valor (R$)'];
  const classes = useStyles();
  const grouped = groupByCategories();

  function groupByCategories() {
    let despesasPorCategoria: IExpenseCategory[] = [];
    let categoriaId: number = 0;
    if (desp !== null) {
      let d = [...desp];
      const categorias = Array.from(new Set(d.map(x => x.categoria)));
      for (let categoria of categorias) {
        let valor = d
          .filter(x => x.categoria === categoria)
          .reduce((acc, current) => acc + current.valor, 0);
        despesasPorCategoria.push({
          categoriaId: categoriaId++,
          categoria,
          valor,
        });
      }
    }
    return despesasPorCategoria.sort((a, b) => b.valor - a.valor);
  }

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
            {grouped &&
              grouped.map(d => (
                <TableRow key={d.categoriaId}>
                  <TableCell>{d.categoria}</TableCell>
                  <TableCell align="right">{formatNumber(d.valor)}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
