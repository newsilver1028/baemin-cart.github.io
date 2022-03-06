import { useSelector, useDispatch } from 'react-redux';

import { cartReducer } from '../Reducers/cartReducer';
import { CartData, StoredFoods, Items, initialState, Discounts } from '../Reducers/cartReducer';
import { RootState } from '../Reducers';
import DiscountsElement from './DiscountsElement';

export default function DiscountsList() {
  const dispatch = useDispatch();
  const { foodData } = useSelector((store: RootState) => store.cartReducer);
  const discountsList = foodData.discounts;
  const $discountsArray = discountsList.map((discount: Discounts): JSX.Element => {
    const {id, name, discount_rate} = discount;
    return <DiscountsElement key={id} name={name} discount_rate={discount_rate}/>
  });

  return (
    <>
    <div>====== Discounts ======</div>
    <div>{$discountsArray}</div>
    </>
  )
}

export interface DiscountsRateProps {
  name: string;
  discount_rate: number;
}
