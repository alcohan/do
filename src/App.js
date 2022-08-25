import { useEffect, lazy, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import './index.scss';

import { Routes, Route } from 'react-router-dom';

// import Home from './routes/home/home.component';
// import Navigation from './routes/navigation/navigation.component';
// import Authentication from './routes/authentication/authentication.component.jsx';
// import Shop from './routes/shop/shop.component';
// import Checkout from './routes/checkout/checkout.component';
import Spinner from './components/spinner/spinner.component';
import { checkUserSession } from './store/user/user.action';

import { GlobalStyle } from './global.styles';
const Navigation = lazy( () => import('./routes/navigation/navigation.component'));
const Home = lazy(() => import('./routes/home/home.component'));
const Authentication = lazy(() => import('./routes/authentication/authentication.component.jsx'));
const Shop = lazy(() => import('./routes/shop/shop.component'));
const Checkout = lazy(() => import('./routes/checkout/checkout.component'));
// const Shop = lazy(() => import());


const App = () => {
  const dispatch = useDispatch();

  useEffect( () => {
    dispatch(checkUserSession());
  }, []) 

  // This code is used to implement firebase auth simply. (Saving while refactoring to Saga)
  // useEffect( () => {
  //   const unsubscribe = onAuthStateChangedListener( (user) => {
  //       if(user) {createUserDocumentFromAuth(user);}
  //       dispatch(setCurrentUser(user));
  //   });
  //   return unsubscribe;
  // }, []) 

  return (
    <Suspense fallback={<Spinner />}>
      <GlobalStyle />
      <Routes>
        <Route path='/' element={<Navigation />} >
          <Route index element={<Home />} /> //use index to be the base level
          <Route path='shop/*' element={<Shop />} />
          <Route path='auth' element={<Authentication />} />
          <Route path='checkout' element={<Checkout />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;