'use client';
import FormProduct from '@components/FormProduct';
import endPoints from '@services/api';
import axios from 'axios';
// import { useRouter } from 'next/navigation';
// import { useParams } from 'next/navigation'
import useAlert from '@hooks/useAlert';
import React, { useEffect, useState } from 'react';
import Alert from '@common/Alert';

export default function Edit({ params }) {
  const [product, setProduct] = useState({});
  const { alert, setAlert,toggleAlert } = useAlert();
  // const router = useRouter();
  // const paramsT = useParams();
  // useEffect(() => {
  //   const { id } = router.query;
  //   console.log(id);
  // }, [router?.isReady]);
  // TODO: No carga el producto a la primera llamada
  useEffect(() => {
    const { id } = params;
    async function getProduct() {
      const response = await axios.get(endPoints.products.getProduct(id));
      setProduct(response.data);
    }
    if (typeof id === 'undefined') return;
    getProduct();

    console.log(product);
  }, [params.id]);

  return (
    <>
      <Alert alert={alert} handleClose={toggleAlert} />
      <FormProduct setAlert={setAlert} product={product} />;
    </>
  );
}
