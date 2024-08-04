import React from 'react';
import { Container, Typography, AppBar, Toolbar, CssBaseline, ThemeProvider } from '@mui/material';
import CurrencyConverter from './components/CurrencyConverter';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ background: 'linear-gradient(to right, #6a11cb, #2575fc, #f953c6)', minHeight: '100vh' }}>
        <AppBar position="static">
          <Toolbar  >
            <Typography variant="h6" style={{ flexGrow: 1, color: '#646cffaa'}} >
              Currency Converter
            </Typography>
          </Toolbar>
        </AppBar>
        <Container>
          <Typography variant="h4" gutterBottom style={{ marginTop: '20px', textAlign: 'center' }}>
            Convert Currencies With Ease
          </Typography>
          <CurrencyConverter />
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
