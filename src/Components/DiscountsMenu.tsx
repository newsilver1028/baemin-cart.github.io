import { useSelector } from 'react-redux'

import { RootState } from '../Reducers';
import { Discounts } from '../Reducers/cartReducer';

export default function DiscountsMenu(props: { id: string; name: string }) {
  const { discounts } = useSelector((store: RootState) => store.discountReducer);
  const {id, name} = props;
  const discountsArray = discounts.filter((discount: Discounts) => discount.name === name)[0];
  const discountedMenu = discountsArray.discountedMenu;
  const $discountedList = discountedMenu.map((el: any) => {
    const {name, _, excludedPrice } = el;
    return (
    <div key={id+name}>
      <span>{name}</span>
      <span>{excludedPrice}</span>
    </div>);
  })

  return (
    <div>{$discountedList}</div>
  )  
}