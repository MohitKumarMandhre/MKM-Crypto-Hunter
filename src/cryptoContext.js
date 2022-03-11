import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from "axios";
import { CoinList } from './config/api';
import { auth } from '../src/firebase.js';
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../src/firebase';

const Crypto = createContext();

const CryptoContext = ({ children }) => {

    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);

    const [currency, setCurrency] = useState("INR");
    const [symbol, setSymbol] = useState("₹");

    const [watchlist, setWatchlist] = useState([]);

    const [user, setUser] = useState(null);

    useEffect(() => {
      onAuthStateChanged(auth, user => {
        if ( user) setUser(user);
        else setUser(null);
        });
    }, [])
    

    const [alert, setAlert] = useState({
      open: false,
      message: "",
      type: "success"
    });

    useEffect(() => {
      if (currency === "INR") setSymbol("₹");
      else if ( currency === "USD") setSymbol("$");
    }, [currency]);

    useEffect(() => {
      if ( user){ 
        const coinRef = doc(db, "watchlist", user.uid);

        var unsubscribe = onSnapshot(coinRef, coin => {
          if ( coin.exists()){
            setWatchlist(coin.data().coins)
          }
          else{
            console.log("No items on the Watchlist.")
          }
        });
        return () => {
          unsubscribe();
        };
      }
    }, [user]);

    const fetchCoins = async () => {
      setLoading(true);
      const { data } = await axios.get(CoinList(currency));
      setCoins( data );
      setLoading(false);
  }
    

  return (
    <Crypto.Provider value={{ 
      currency, 
      setCurrency, 
      symbol, 
      coins, 
      loading, 
      fetchCoins, 
      alert, 
      setAlert,
      user,
      watchlist
       }}>
        { children }
    </Crypto.Provider>
  )};

export default CryptoContext;

export const CryptoState = () => {
    return useContext(Crypto);
}