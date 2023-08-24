'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';

const useFecth = (endPoint) => {
  const [data, setData] = useState([]);
  async function fetcData() {
    const response = await axios.get(endPoint);
    setData(response.data);
  }
  useEffect(() => {
    try {
      fetcData();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return data;
};

export default useFecth;
