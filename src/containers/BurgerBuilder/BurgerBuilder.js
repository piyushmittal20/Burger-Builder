import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Aux from '../../hoc/Auxillary/Auxillary'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as  actions from '../../store/actions/index';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from 'axios';

const burgerBuilder = props => {
    const [purchasing, setPurchasing] = useState(false)

    const ings = useSelector(state => {
        return state.burgerBuilder.ingredients
    })
    const price = useSelector(state => {
        return state.burgerBuilder.totalPrice
    })
    const error = useSelector(state => {
        return state.burgerBuilder.error
    })
    const isAuthenticated = useSelector(state => {
        return state.auth.token !== null
    })

    const dispatch = useDispatch();

    const onIngredientAdded = (ingName) => dispatch(actions.addIngredient(ingName));
    const onIngredientRemoved = (ingName) => dispatch(actions.removeIngredient(ingName));
    const onInitIngredients = useCallback(
        () => dispatch(actions.initIngredients()),
        [dispatch]);
    const onInitPurchase = () => dispatch(actions.purchaseInit());
    const onSetAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path));

    useEffect(() => {
        onInitIngredients();
    }, [onInitIngredients])

    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((curr, acc) => {
                return curr + acc;
            }, 0)
        return sum > 0;
    }

    const purchaseHandler = () => {
        if (props.isAuthenticated) {
            setPurchasing(true)
        } else {
            onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false)
    }

    const purchaseContinueHandler = () => {
        onInitPurchase();
        props.history.push({
            pathname: '/checkout',
            // search: '?' + queryString
        })
    }


    const disabledInfo = {
        ...ings
    }
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0
    }

    let categoryInfo = null;
    let orderSummary = null;

    let burger = error ? <p style={{ textAlign: 'center', fontSize: '25px', color: 'Red', textTransform: 'capitalize' }}>Ingredients can't be able to load</p> : <Spinner />

    if (ings) {
        burger = (
            <Aux>
                <Burger ingredients={ings} />
                <BuildControls
                    ingredientAdded={onIngredientAdded}
                    ingredientRemoved={onIngredientRemoved}
                    purchasable={updatePurchaseState(ings)}
                    disabled={disabledInfo}
                    price={price}
                    isAuth={isAuthenticated}
                    ordered={purchaseHandler} />
            </Aux>
        )
        if (ings.meat > 0) {
            categoryInfo = 'NON-VEG Burger'
        }
        if (ings.meat === 0) {
            categoryInfo = 'VEG Burger'
        }

        orderSummary = <OrderSummary ingredients={ings}
            purchaseCancelled={purchaseCancelHandler}
            purchaseContinued={purchaseContinueHandler}
            price={price}
            category={categoryInfo} />
    }

    return (
        <Aux>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Aux>
    )
}

export default withErrorHandler(burgerBuilder, axios);