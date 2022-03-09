import { useSelector } from 'react-redux';

import { Discounts } from '../Reducers/cartReducer';
import { RootState } from '../Reducers';
import DiscountsElement from './DiscountsElement';

export default function DiscountsList() {
  const { foodData } = useSelector((store: RootState) => store.cartReducer);
  const discountsList = foodData.discounts;
  const $discountsArray = discountsList.map((discount: Discounts): JSX.Element => {
    const {id, name, discount_rate} = discount;
    return <DiscountsElement key={id} id={id} name={name} discountRate={discount_rate}/>
  });

  return (
    <>
    <span>할인</span>
    <div>{$discountsArray}</div>
    </>
  )
}

