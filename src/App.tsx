import React from 'react';
import FoodsCategories from './Components/FoodsCategories';
import FoodsList from './Components/FoodsList';

function App() {
  return (
    <div className="App">
      <FoodsList />
      <FoodsCategories />
    </div>
  );
}

export default App;
