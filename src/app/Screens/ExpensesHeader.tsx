import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import { useRef } from 'react';
import { YEARS, MONTH } from '../helpers/dateHelper';

interface IExpensesHeaderProps {
  month: string;
  total: string;
  toggleYear: (val: string) => void;
  toggleMonth: (val: string) => void;
}

export default function ExpensesHeader(props: IExpensesHeaderProps) {
  const selectYear = useRef<HTMLSelectElement | null>();
  const selectMonth = useRef<HTMLSelectElement | null>();
  const [ano, mes] = props.month.split('-');

  return (
    <Box
      height="100%"
      display="flex"
      marginLeft="8px"
      alignItems="center"
      marginRight="8px"
      overflow="hidden"
    >
      <Box className="w-40 mr-8">
        <FormControl margin="normal" fullWidth>
          <InputLabel id="select-ano">Ano</InputLabel>
          <Select
            inputRef={selectYear}
            value={ano}
            labelId="select-ano"
            onChange={evt => props.toggleYear(evt.target.value as string)}
          >
            {YEARS.map(year => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box className="w-40">
        <FormControl margin="normal" fullWidth>
          <InputLabel id="select-mes">Mês</InputLabel>
          <Select
            labelId="select-mes"
            value={mes}
            inputRef={selectMonth}
            onChange={evt => props.toggleMonth(evt.target.value as string)}
          >
            {MONTH.map((mes, index) => (
              <MenuItem
                key={index}
                value={(index + 1).toString().padStart(2, '0')}
              >
                {mes}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box flex="1" />
      <Box>
        Despesa total: <strong>{props.total}</strong>
      </Box>
    </Box>
  );
}
