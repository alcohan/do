import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import { selectCurrentUser } from '../../store/user/user.selector';
import { selectCartIsOpen } from '../../store/cart/cart.selector';

import { signOutStart } from '../../store/user/user.action';
// import './navigation.styles.scss';
import { NavigationContainer, NavLinksContainer, NavLink, LogoContainer } from './navigation.styles';

const Navigation = () => {
    const currentUser = useSelector(selectCurrentUser);
    const cart = useSelector( selectCartIsOpen );
    const dispatch = useDispatch();

    const signOutHandler = () => {
        dispatch(signOutStart());
    };

    return(
        <Fragment>
            <NavigationContainer>
                <LogoContainer to='/'>
                    <CrwnLogo className='logo' />
                </LogoContainer>
                <NavLinksContainer>
                    <NavLink to='/shop'>
                        Shop
                    </NavLink>
                    {currentUser ? 
                        (<NavLink as='span' className='nav-link' onClick={signOutHandler}>Sign Out</NavLink>) : 
                        (<NavLink to='/auth'>
                            Sign In
                        </NavLink>)
                    }
                    <CartIcon /> 
                </NavLinksContainer>
                {
                    //this is called short circuit operator
                cart && <CartDropdown />
                }
            </NavigationContainer>
            <Outlet />
        </Fragment>
    );
};

export default Navigation;