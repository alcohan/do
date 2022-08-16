import { useEffect, } from 'react';
import { useDispatch } from 'react-redux';

import { Routes, Route } from 'react-router-dom';

import { 
  onAuthStateChangedListener, 
  createUserDocumentFromAuth, 
} from './utils/firebase/firebase.utils';

import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component.jsx';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';
import { setCurrentUser } from './store/user/user.action';
import { setCategoriesMap } from './store/categories/category.action';
// import CategoriesPreview from './routes/categories-preview/categories-preview.component';

const App = () => {
  const dispatch = useDispatch();

  // User component initial run setup
  useEffect( () => {
    const unsubscribe = onAuthStateChangedListener( (user) => {
        if(user) {
            createUserDocumentFromAuth(user);
        }
        dispatch(setCurrentUser(user));
    });

    // This code pattern runs return when it unmounts; thus unsubscribe deletes the listener
    return unsubscribe;
  }, []) 
  // add dispatch to the dependency list to get rid of lint error. 
  // Dispatch never changes so it still only runs once, but react doesn't know that so it throws error.

  return (
    <Routes>
      <Route path='/' element={<Navigation />} >
        <Route index element={<Home />} /> //use index to be the base level
        <Route path='shop/*' element={<Shop />} />
        <Route path='auth' element={<Authentication />} />
        <Route path='checkout' element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;