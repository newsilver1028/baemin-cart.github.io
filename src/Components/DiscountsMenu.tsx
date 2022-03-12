import { useSelector } from 'react-redux';

import { RootState } from '../Reducers';
import { Discounts } from '../Interface/discountInterface';

import DiscountMenu from './DiscountMenu';

export default function DiscountsMenu(props: { id: string; name: string }) {
  const { discounts } = useSelector((store: RootState) => store.discountReducer);
  const { name } = props;
  const discountsArray = discounts.filter((discount: Discounts) => discount.name === name)[0];
  const discountedMenu = discountsArray.discountedMenu;
  
  const $discountedList = discountedMenu.map((menu: any) => {
    const {name, quantity, _, excludedPrices } = menu;
    return (
      <DiscountMenu key={name} name={name} quantity={quantity} excludedPrices={excludedPrices} />
    );
  })

  return (
    <div>{$discountedList}</div>
  )  
}