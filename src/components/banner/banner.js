import React from 'react';
import { Container, makeStyles, Typography } from '@material-ui/core';
import Carousel from "../banner/carousel";

const useStyles = makeStyles(() => ({
    banner:{
        backgroundImage: "url(./banner2.jpg)"
    },
    bannerContent: {
        display: 'flex',
        height: 400,
        flexDirection: 'column',
        paddingTop: 25,
        justifyContent: "space-around"
    },
    tagline: {
        display: "flex",
        height: "40%",
        flexDirection: 'column',
        justifyContent: "center",
        textAlign: 'center'
    },
}));

const Banner = () => {

    const classes = useStyles();

  return (
    <div className={ classes.banner }>
        <Container className={ classes.bannerContent} >
            <div className={classes.tagline}>
                <Typography 
                variant="h2" 
                style={{
                    fontWeight: "bold",
                    marginBottom: 15,
                    fontFamily: "Montserrat"
                }}>
                    MKM Crypto Hunter 
                </Typography>
                <Typography 
                variant="subtitle2" 
                style={{
                    color: 'darkgrey',
                    fontFamily: "Montserrat",
                    textTransform: 'capitalize',
                }}>
                    Get all the Info regarding your favorite Crypto Currency.
                </Typography>
            </div>
            <Carousel/>
        </Container>
    </div>
  )
}

export default Banner;