'use client';
import FormProduct from '@components/FormProduct';
import endPoints from '@services/api';
import axios from 'axios';
// import { useRouter } from 'next/navigation';
// import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react';

export default function Edit({ params }) {
  const [product, setProduct] = useState({});
  // const router = useRouter();
  // const paramsT = useParams();
  // useEffect(() => {
  //   const { id } = router.query;
  //   console.log(id);
  // }, [router?.isReady]);
  // TODO: No carga el producto a la primera llamada
  useEffect(() => {
    const { id } = params;
    console.log(id);
    async function getProduct() {
      const response = await axios.get(endPoints.products.getProduct(id));
      setProduct(response.data);
    }
    console.log('se ejecuto');
    if (typeof id === 'undefined') return;
    getProduct();

    console.log(product);
  }, [params.id]);

  return <FormProduct product={product} />;
}
