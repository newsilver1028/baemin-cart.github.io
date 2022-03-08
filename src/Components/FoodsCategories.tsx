import { useSelector } from 'react-redux';

import { Data, FoodData, Discounts, Items, initialState } from '../Reducers/cartReducer';
import { RootState } from '../Reducers';
import FoodsType from './FoodsType';

export default function FoodsCategories() {
  const { foodData } = useSelector((store: RootState) => store.cartReducer);
  const foodItems = foodData.items;
  const temp = foodItems.map((item: Items) :string=> {
    return item.category_name;
  });
  const FOODS_TYPES = Array.from(new Set([...temp]));

  const SORTED_FOODS = FOODS_TYPES.map((type:string) : [string,Items[]]=> {
    const FOODS_LIST= foodItems.filter((item: Items) => item.category_name === type) 
    return [type,FOODS_LIST];
  });

  return (
    <>
    <FoodsType list={SORTED_FOODS} />
    </>
  )
}

export interface FoodsTypeProps {
  type: string;
  foodsList: Items[]
}
