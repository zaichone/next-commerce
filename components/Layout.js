import React, { useContext, useEffect } from 'react'
import Head from 'next/head'
import { ThemeProvider, CssBaseline, AppBar, Toolbar, Link, Box, Container } from '@material-ui/core';

import NextLink from 'next/link';

import { theme, useStyles } from '../utils/styles';
import { CART_RETRIEVE_REQUEST, CART_RETRIEVE_SUCCESS } from '../utils/constant';
import { Store } from './Store';
import getCommerce from '../utils/commerce';

function Layout({ children, commercePublicKey, title = 'Next Commerce' }) {
    const classes = useStyles();
    const { state, dispatch } = useContext(Store);
    const { cart } = state;

    useEffect(() => {
        const fetchCart = async () => {
            const commerce = getCommerce(commercePublicKey);
            dispatch({ type: CART_RETRIEVE_REQUEST });
            const cartData = await commerce.cart.retrieve();
            dispatch({ type: CART_RETRIEVE_SUCCESS, payload: cartData });
        }
        fetchCart();
    }, [])
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <title>{`${title} - Next Commerce`}</title>
                <link rel="icon" href="/favicon.ico" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AppBar>
                    <Toolbar>
                        <NextLink href="/"><Link>Next Commerce</Link></NextLink>
                        <NextLink href="/cart"><Link>Cart</Link></NextLink>
                    </Toolbar>
                </AppBar>
                <Container>{children}</Container>
            </ThemeProvider>
        </>
    )
}

export default Layout
