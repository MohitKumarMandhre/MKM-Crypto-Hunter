import { Container, createTheme, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { CryptoState } from '../cryptoContext';
import { useHistory } from 'react-router-dom';
import {numberWithCommas} from './banner/carousel';
import {Pagination} from '@material-ui/lab';
import { CoinList } from '../config/api';

const CoinsTable = () => {

    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const { currency, symbol, coins , loading, fetchCoins } = CryptoState();
    const history = useHistory();

    useEffect(() => {
        fetchCoins();
    }, [currency]);

    const darkTheme = createTheme({
        palette: {
          primary: {
            main: "#fff",
          },
          type: "dark",
        },
      });

      const handleSearch = () => {
          return coins.filter(
              (coin) => {
              return coin.name.toLowerCase().includes( search ) || 
              coin.symbol.toLowerCase().includes( search )
          });
      }

      const useStyles = makeStyles( {
        row:{
            backgroundColor: "#16171a",
            cursor: "pointer",
            "&:hover":{
                backgroundColor: "#131111"
            },
            fontFamily: "Montserrat"
        },
        pagination:{
            "& .MuiPaginationItem-root": {
                color: "gold"
            }
        }
      });

      const classes = useStyles();

  return (
      <ThemeProvider theme={darkTheme}>
          <Container style={{ textAlign: "center"}}>
            <Typography 
            variant= "h4"
            style ={{ margin: 18, fontFamily: "Montserrat" }} >
                Cryptocurrency Prices by Market Cap
            </Typography>
            <TextField
            label="Search For a Crypto Currency.."
            variant="outlined"
            onChange={ (e) => setSearch(e.target.value) } 
            style={{ marginBottom: 20, width: "100%"}}>
            </TextField>
            <TableContainer>
                { loading ? (
                    <LinearProgress style={{ backgroundColor: "gold" }} />
                ) : (
                    <Table>
                        <TableHead style={{ backgroundColor: "#EEBC1D" }} >
                            <TableRow>
                            {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                                <TableCell
                                    style={{
                                        color: "black",
                                        fontWeight: "700",
                                        fontFamily: "Montserrat",
                                    }}
                                    key={head}
                                    align={head === "Coin" ? "" : "right"}
                                    >
                                    {head}
                             </TableCell>
                            ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { handleSearch()
                                .slice( (page-1)*10, (page-1)*10+10   )
                                .map((row) => {
                                        const profit = row.price_change_percentage_24h > 0;
                                        return (
                                            <TableRow
                                                onClick={() => history.push(`/coins/${row.id}`)}
                                                className={classes.row}
                                                key={row.name}
                                            >
                                                <TableCell
                                                component="th"
                                                scope="row"
                                                style={{
                                                    display: "flex",
                                                    gap: 15,
                                                }}>
                                                    <img 
                                                        src={row?.image}
                                                        alt={row.name}
                                                        height="50"
                                                        style={{ marginBottom: 10 }}
                                                    />
                                                    <div style={{
                                                        display: "flex",
                                                        flexDirection: "column"
                                                    }}>
                                                        <span style={{
                                                            textTransform: "uppercase",
                                                            fontSize: 22
                                                        }}>
                                                            {row.symbol}
                                                        </span>
                                                        <span style={{
                                                            color: "darkgrey"
                                                        }}>
                                                            {row.name}
                                                        </span>
                                                    </div>
                                                </TableCell>
                                                <TableCell align="right">
                                                    {symbol}{" "}
                                                    {numberWithCommas(row.current_price.toFixed(2))}
                                                </TableCell>
                                                <TableCell
                                                    align="right"
                                                    style={{
                                                        color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                                                        fontWeight: 500,
                                                    }}
                                                    >
                                                    {profit && "+"}
                                                    {row.price_change_percentage_24h.toFixed(2)}%
                                            </TableCell>
                                            <TableCell align="right">
                                                {symbol}{" "}
                                                {numberWithCommas(
                                                    row.market_cap.toString().slice(0, -6)
                                                )}
                                                M
                                            </TableCell>
                                           </TableRow>
                                       )
                                   } )}
                        </TableBody>
                    </Table>
                )}
            </TableContainer>
            <Pagination 
                count={(handleSearch()?.length / 10).toFixed(0)}
                style={{
                    display: "flex",
                    justifyContent: " center",
                    padding: 20,
                    width: "100%"
                }}
                className={classes.pagination}
                onChange={ (_, val) => {
                    setPage(val);
                    window.scroll(0, 450);
                }}
            />
          </Container>
      </ThemeProvider>
  )
}

export default CoinsTable;