import React from 'react';
import Cart from './Components/CartList';
import FoodsCategories from './Components/FoodsCategories';
import FoodsList from './Components/FoodsList';

function App() {
  return (
    <div className="App">
      <FoodsList />
      <FoodsCategories />
      <Cart />
    </div>
  );
}

export default App;
