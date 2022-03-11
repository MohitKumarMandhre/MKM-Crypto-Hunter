import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/header';
import HomePage from './pages/homePage.js';
import CoinPage from './pages/coinPage.js';
import { makeStyles } from '@material-ui/core';
import Alert from './components/alert';

const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#14161a",
    color: "white",
    minHeight: "100vh",
  },
}));

function App() {
  const classes = useStyles();
  return (
    <BrowserRouter>
      <div className={ classes.App }>
        <Header />
        <Route path="/MKM-Crypto-Hunter/" component={HomePage} exact />
        <Route path="/coins/:id" component={CoinPage} exact />
      </div>
      <Alert/>
    </BrowserRouter>
  );
}

export default App;
