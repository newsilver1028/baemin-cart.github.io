import { Data, FoodData, Discounts, Items, initialState } from '../Reducers/cartReducer';
import Foods from './Foods';
import { FoodsTypeProps } from './FoodsCategories';

export default function FoodsType(props: FoodsTypeProps ) {
  const {type, foodList} = props;

  return(
    <>
    <div>
      <div>종류 : {type}</div>
      <Foods foodsList={foodList}/>
    </div>
    </>
  )
}
