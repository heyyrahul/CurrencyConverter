import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Paper, Typography, CircularProgress, IconButton } from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import CurrencySelect from './CurrencySelect';
import TransactionHistory from './TransactionHistory';
import { fetchCurrencies } from '../../api';

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState({});
  const [fromCurrency, setFromCurrency] = useState('aed');
  const [toCurrency, setToCurrency] = useState('usd');
  const [amount, setAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem('transactions');
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadCurrencies = async () => {
      const data = await fetchCurrencies();
      setCurrencies(data);
    };
    loadCurrencies();
  }, []);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const handleConvert = () => {
    if (!amount || isNaN(amount)) {
      setError('Please enter a valid number');
      return;
    }
    if (!currencies[fromCurrency] || !currencies[toCurrency]) return;

    setLoading(true);
    const rate = currencies[toCurrency] / currencies[fromCurrency];
    const result = amount * rate;
    setConvertedAmount(result.toFixed(4));

    const transaction = {
      amount,
      from: fromCurrency,
      to: toCurrency,
      convertedAmount: result.toFixed(4),
      date: new Date().toLocaleString(),
    };

    setTransactions([transaction, ...transactions.slice(0, 4)]);
    setLoading(false);
  };

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const handleAmountChange = (e) => {
    if (isNaN(e.target.value)) {
      setError('Please enter a valid number');
    } else {
      setError('');
      setAmount(e.target.value);
    }
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', marginTop: '20px', backgroundColor: 'rgba(30, 30, 30, 0.8)' }}>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} md={5}>
          <CurrencySelect
            label="From"
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            currencies={currencies}
          />
        </Grid>
        <Grid item xs={12} md={2} style={{ textAlign: 'center' }}>
          <IconButton onClick={handleSwap}>
            <SwapHorizIcon fontSize="large" />
          </IconButton>
        </Grid>
        <Grid item xs={12} md={5}>
          <CurrencySelect
            label="To"
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            currencies={currencies}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Amount"
            value={amount}
            onChange={handleAmountChange}
            variant="outlined"
            fullWidth
            error={!!error}
            helperText={error}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleConvert}
            fullWidth
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Convert'}
          </Button>
        </Grid>
        {convertedAmount && (
          <Grid item xs={12}>
            <Typography variant="h5" style={{ textAlign: 'center', margin: '20px 0' }}>
              Converted Amount: {convertedAmount} {toCurrency}
            </Typography>
          </Grid>
        )}
        <Grid item xs={12}>
          <TransactionHistory transactions={transactions} />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CurrencyConverter;
