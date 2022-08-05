import Home from './components/routes/home/home.component';
import { Routes, Route } from 'react-router-dom';

import Navigation from './routes/navigation/navigation.component';
const Shop = () => {
  return <h1>I am the shop page.</h1>;
};

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />} >
        <Route index element={<Home />} /> //use index to be the base level
        <Route path='shop' element={<Shop />} />
      </Route>
    </Routes>
  );
};

export default App;