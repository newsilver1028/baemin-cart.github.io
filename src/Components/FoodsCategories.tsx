import { useSelector } from 'react-redux';

import { RootState } from '../Reducers';
import FoodsType from './FoodsType';
import { FoodsTypeProps } from '../Reducers/foodDataReducer';

export default function FoodsCategories() {
  const { sortedFoodsData } = useSelector((store: RootState) => store.foodDataReducer);

  const $sortedFoodsArray = sortedFoodsData.map(({type, foodList}: FoodsTypeProps): JSX.Element=> {
    return <FoodsType type={type} foodList={foodList} />
  });

  return (
    <>
    {$sortedFoodsArray}
    </>
  )
}


