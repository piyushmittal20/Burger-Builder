import React from 'react';

import Button from '../../UI/Button/Button';
import Burger from '../../Burger/Burger';
import classes from './Checkoutsummary.css';
const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1 style={{color: 'gray'}}>We hope it Taste well!!</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button btnType="Danger"
            clicked={props.checkoutCancelled}>Cancel</Button>
            <Button btnType="Success"
            clicked={props.checkoutContinued}>Continue</Button>
        </div>
    )
}


export default checkoutSummary;