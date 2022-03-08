import { useSelector } from 'react-redux'

import { RootState } from '../Reducers';
import { Discounts } from '../Reducers/cartReducer';

export default function DiscountsMenu(props: { id: string; name: string }) {
  const { discounts } = useSelector((store: RootState) => store.discountReducer);
  console.log("discounts",discounts)
  const id = props.id;
  const target = props.name;
  const temp = discounts.filter((discount: Discounts) => discount.name === target)[0];
  const menu = temp.discountedMenu;
  const render = menu.map((el: any) => {
    const {name, _, excludedPrice } = el;
    return (<div>
    <span>{name}</span>
    <span>{excludedPrice}</span>
    </div>);
  })
  console.log(temp, menu);
  const {name, _, excludedPrice } = menu;

  return (
    <>
    {/* <span>{name}</span>
    <span>{excludedPrice}</span> */}
    {render}
    </>
  )  
}