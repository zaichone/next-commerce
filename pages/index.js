import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import {Link } from '@material-ui/core';

import getCommerce from '../utils/commerce';

import Layout from '../components/Layout';

export default function Home(props) {
  const {products} = props;
  return (
    
<Layout title="Home" commercePublicKey={props.commercePublicKey}>
      <main className={styles.main}>
        {products.map((product) => 
        <Link href={`/products/${product.permalink}`} key={product.id}>
          <div >
            <img src={product.image.url} alit={product.name}/>
            <p>{product.name}</p>
          <p>{product.price.formatted_with_symbol}</p>
          </div>
          </Link>
        )}
      </main>
      </Layout>
      
  )
}

export async function getStaticProps() {
  const commerce = getCommerce();
  const { data: products } = await commerce.products.list();
  return {
    props: {
      products,
    },
  };
}