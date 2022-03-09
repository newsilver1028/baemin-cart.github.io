import { useSelector } from 'react-redux';

import { Items } from '../Reducers/cartReducer';
import { RootState } from '../Reducers';
import FoodsType from './FoodsType';

export default function FoodsCategories() {
  const { foodData } = useSelector((store: RootState) => store.cartReducer);
  const foodItems = foodData.items;
  const foodItemsNameArray  = foodItems.map((item: Items) :string=> {
    return item.category_name;
  });
  const FOODS_TYPES = Array.from(new Set([...foodItemsNameArray]));

  const SORTED_FOODS = FOODS_TYPES.map((type:string) : [string,Items[]]=> {
    const FOODS_LIST= foodItems.filter((item: Items) => item.category_name === type) 
    return [type,FOODS_LIST];
  });
  console.log(SORTED_FOODS)

  return (
    <>
    <FoodsType list={SORTED_FOODS} />
    </>
  )
}

export type FoodsTypeProps = [string, Items[]];
