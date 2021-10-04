import React, { useContext, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router';
import { ThemeProvider, CssBaseline, AppBar, Toolbar, Link, Box, Container, CircularProgress } from '@material-ui/core';
import { alpha, makeStyles } from '@material-ui/core/styles';

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import NextLink from 'next/link';

import { theme } from '../utils/styles';
import { CART_RETRIEVE_REQUEST, CART_RETRIEVE_SUCCESS } from '../utils/constant';
import { Store } from './Store';
import getCommerce from '../utils/commerce';



const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}));

function Layout({ children, commercePublicKey, title = 'Next Commerce' }) {
    const classes = useStyles();
    const router = useRouter()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="secondary">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton aria-label="show 11 new notifications" color="inherit">
                    <Badge badgeContent={11} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

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
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="open drawer"
                        >
                            <MenuIcon />
                        </IconButton>
                        <NextLink href="/">
                            <Link href="/" style={{ color: 'white' }}>
                                <Typography className={classes.title} variant="h6" noWrap>
                                    Next Commerce
                                </Typography>
                            </Link>
                        </NextLink>

                        <div className={classes.grow} />
                        <div className={classes.sectionDesktop}>
                            <NextLink href="/cart">
                                <Link
                                    variant="button"
                                    color="textPrimary"
                                    href="/cart"
                                    className={classes.link}
                                    style={{color:'white'}}
                                >
                                    <IconButton aria-label="show 4 new mails" color="inherit">
                                    {cart.loading ? (
                                        <CircularProgress />
                                    ) : cart.data.total_items > 0 ? (
                                        <Badge badgeContent={cart.data.total_items} color="secondary">
                                            <ShoppingCartIcon/>
                                        </Badge>
                                    ) : (
                                        <Badge badgeContent={cart.data.total_items} color="secondary">
                                            <ShoppingCartIcon/>
                                        </Badge>
                                    )}
                                    </IconButton>
                                </Link>
                            </NextLink>
                            <IconButton aria-label="show 17 new notifications" color="inherit">
                                <Badge badgeContent={17} color="secondary">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                            <IconButton
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                        </div>

                    </Toolbar>
                </AppBar>
                <Container>{children}</Container>
            </ThemeProvider>
        </>
    )
}

export default Layout
