import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout';
import getCommerce from '../../utils/commerce';

export default function Product(props) {
    const { product } = props;
    console.log("🚀 ~ file: [id].js ~ line 7 ~ Product ~ product", product)
    const [quantity, setQuantity] = useState(1);

    const addToCartHandler = async () => {
        console.log('add to cart')
    }
    return (
        <Layout title="Home" commercePublicKey={props.commercePublicKey}>
            <h1 style={{marginTop:150}}>{product.name}</h1>
            <button onClick={addToCartHandler}>Add to Cart</button>
        </Layout>
    )
}

export async function getServerSideProps({ params }) {
    const { id } = params;
    const commerce = getCommerce();
    const product = await commerce.products.retrieve(id, {
        type: 'permalink',
    })
    return {
        props: {
            product,
        }
    }
}