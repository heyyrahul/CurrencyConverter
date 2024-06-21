
import React from 'react';
import { Paper, List, ListItem, ListItemText, Typography } from '@mui/material';

const TransactionHistory = ({ transactions }) => {
  return (
    <Paper elevation={3} style={{ padding: '20px', backgroundColor: 'rgba(30, 30, 30, 0.1)' }}>
      <Typography variant="h6" gutterBottom style={{ textAlign: 'center', color: '#ffffff' }}>
        Transaction History
      </Typography>
      <List>
        {transactions.map((transaction, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={`Converted ${transaction.amount} ${transaction.from} to ${transaction.convertedAmount} ${transaction.to}`}
              secondary={transaction.date}
              primaryTypographyProps={{ style: { color: '#ffffff' } }}
              secondaryTypographyProps={{ style: { color: '#aaaaaa' } }}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default TransactionHistory;
