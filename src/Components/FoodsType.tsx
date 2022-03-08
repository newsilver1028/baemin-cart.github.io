import { Data, FoodData, Discounts, Items, initialState } from '../Reducers/cartReducer';
import Foods from './Foods';
import { FoodsTypeProps } from './FoodsCategories';

export default function FoodsType(props: FoodsTypeProps[]) {
  const SORTED_FOODS = props.list;

  return(
    <>
    <div>
      {SORTED_FOODS.map(([type,foods]:[string, Items[]]): JSX.Element => {
        return (
          <div key={type}>
            종류 : {type}
            <Foods key={type} foodsList={foods}/>
          </div>
        ); 
      })}
    </div>
    </>
  )
}
