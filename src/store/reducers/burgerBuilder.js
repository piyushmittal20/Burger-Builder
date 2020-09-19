import * as actionTypes from '../actions/actionTypes';
import { updatedObject } from '../../shared/utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
    paneer: 1.1
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case (actionTypes.ADD_INGREDIENT):
            const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
            const updatedIngredients = updatedObject(state.ingredients, updatedIngredient);
            const updatedState = {
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
                building: true
            }
            return updatedObject(state, updatedState);
        case (actionTypes.REMOVE_INGREDIENT):
            const updatedIng = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 }
            const updatedIngs = updatedObject(state.ingredients, updatedIng);
            const updatedSt = {
                ingredients: updatedIngs,
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
                building: true
            }
            return updatedObject(state, updatedSt);
        case (actionTypes.SET_INGREDIENTS):
            return updatedObject(state, {
                ingredients: {
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    paneer: action.ingredients.paneer,
                    meat: action.ingredients.meat
                },
                totalPrice: 4,
                error: false,
                building: false
            })
        case (actionTypes.FETCH_INGREDIENTS_FAILED):
            return updatedObject(state, { error: true })
        default:
            return state;
    }
}

export default reducer;