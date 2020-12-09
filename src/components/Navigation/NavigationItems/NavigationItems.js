import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem'
import classes from './NavigationItems.css'

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link='/'>Burger Builder</NavigationItem>
        {props.isAuthenticated ? <NavigationItem link='/orders'>Orders</NavigationItem> : null}
        {!props.isAuthenticated
            ? <NavigationItem link='/auth'>SignIn/SignUp</NavigationItem>
            : <NavigationItem link='/logout'>Logout</NavigationItem>}
    </ul>
);

export default navigationItems;