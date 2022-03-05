import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { STORE, ADD, DELETE, INCREASE, DECREASE } from '../Reducers/cartReducer';
import { Data, FoodData, Discounts, Items, initialState } from '../Reducers/cartReducer';
import { cartReducer } from '../Reducers/cartReducer';
import { RootState } from '../Reducers';

export default function FoodList() {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<FoodData>(initialState.foodData);

  const { foodData } = useSelector((store: RootState) => store.cartReducer);
  // console.log(foodData);

  const dispatch = useDispatch();
  const onStore = (data: FoodData) => {
    dispatch(cartReducer.actions.STORE(data));
  }

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://us-central1-react-baemin.cloudfunctions.net/merchantInfo");
      setData(response.data);
    } catch (error) {
      console.log(error)
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  },[]);

  onStore(data);

  return <div>test</div>;
}
