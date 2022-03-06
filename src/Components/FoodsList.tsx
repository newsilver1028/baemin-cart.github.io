import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import { Data, FoodData, Discounts, Items, initialState } from '../Reducers/cartReducer';
import { cartReducer } from '../Reducers/cartReducer';
import { RootState } from '../Reducers';

export default function FoodsList() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const { foodData } = useSelector((store: RootState) => store.cartReducer);
  const { count } = useSelector((store: RootState) => store.cartReducer);
  // console.log(foodData);

  const onStore = (data: FoodData) => {
    dispatch(cartReducer.actions.STORE(data));
  }

  const fetchData = async () => {
    if (!loading) {
      const response = await axios.get("https://us-central1-react-baemin.cloudfunctions.net/merchantInfo")
      return response.data;
    }
    setLoading(true);
  }

  useEffect(() => {
    fetchData()
    .then((res) => {onStore(res)});
  },[]);

  return (
    <>
    <div>{foodData.merchant_name}</div>
    <div>Cart {count}</div>
    </>
  );
}