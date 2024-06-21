import React from 'react';
import { TextField, MenuItem } from '@mui/material';

const CurrencySelect = ({ label, value, onChange, currencies }) => {
  return (
    <TextField
      select
      label={label}
      value={value}
      onChange={onChange}
      variant="outlined"
      fullWidth
    >
      {Object.keys(currencies).map((currency) => (
        <MenuItem key={currency} value={currency}>
          {currency.toUpperCase()}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default CurrencySelect;
