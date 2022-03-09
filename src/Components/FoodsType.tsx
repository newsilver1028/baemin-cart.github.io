import { Data, FoodData, Discounts, Items, initialState } from '../Reducers/cartReducer';
import Foods from './Foods';
import { FoodsTypeProps } from './FoodsCategories';

export default function FoodsType(props: { list: FoodsTypeProps[] }) {
  const SORTED_FOODS = props.list;

  return(
    <>
    <div>
      {SORTED_FOODS.map((food:FoodsTypeProps): JSX.Element => {
        const [type, foods] = food;
        return (
          <div key={type}>
            <div>
            종류 : {type}
            </div>
            <Foods key={type} foodsList={foods}/>
          </div>
        ); 
      })}
    </div>
    </>
  )
}
