import { FunctionComponent, ReactElement } from 'react';
import { Data, FoodData, Discounts, Items, initialState } from '../Reducers/cartReducer';
import Foods from './Foods';

export default function FoodsType(props: object) {
  const SORTED_FOODS = props.list;

  return(
    <>
    <div>
      {SORTED_FOODS.map(([type,foods]:[string, Items]) :ReactElement => {
        return (
          <div key={type}>
            종류 : {type}
            <Foods key={type} foodsList={foods}/>
            {/* {foods.map((food:Items): ReactElement => {
              const name = food.name;
              return <div key={name}>{food.name}</div>
            })} */}
          </div>
        ); 
      })}
    </div>
    </>
  )
}
