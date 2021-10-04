import '../styles/globals.css'
import '../styles/styles.scss'
import {StoreProvider} from '../components/Store';
import NProgress from 'nprogress';
import Router from 'next/router';
import {useEffect} from 'react';

Router.events.on('routerChangeStart', () => NProgress.start());
Router.events.on('routerChangeComplete', () => NProgress.done());
Router.events.on('routerChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if(jssStyles){
      jssStyles.parentElement.removeChild(jssStyles);
    }
  },[])
  return <StoreProvider><Component {...pageProps} /></StoreProvider>
}

export default MyApp

MyApp.getInitialProps = async () => {
  return{
    pageProps:{
      commercePublicKey: process.env.COMMERCE_PUBLIC_KEY,
    }
  }
}
