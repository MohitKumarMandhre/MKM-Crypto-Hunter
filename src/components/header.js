import { AppBar, Container, MenuItem, Select, Toolbar, Typography, createTheme, ThemeProvider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { useHistory } from 'react-router-dom';
import {CryptoState} from '../cryptoContext.js';
import AuthModal from './authentication/authModal';
import UserSideBar from './authentication/userSideBar.js';

const useStyles = makeStyles( () => ({
  title: {
    flex: 1,
    color: "gold",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursor: "pointer"
  }}));

const darkTheme = createTheme(
  {
    palette:{
      primary:{
        main: '#fff',
      },
      type: 'dark',
    },
  });


const Header = () => {

  const classes = useStyles();
  const history = useHistory();
  const { currency, setCurrency, user } = CryptoState();

  // console.log( currency);

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color='transparent' position='static'>
        <Container>
          <Toolbar>
            <Typography 
            onClick={ () => history.push("/") } 
            className={ classes.title}
            variant='h6' > Crypto Hunter </Typography>
            <Select variant='outlined' 
              style={{
                width: 100,
                height: 40,
                marginRight: 15
              }}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              >
              <MenuItem value={"USD"} >USD</MenuItem>
              <MenuItem value={"INR"} >INR</MenuItem>
            </Select>

            { user ? <UserSideBar/> :<AuthModal/>}

          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  )
}

export default Header;