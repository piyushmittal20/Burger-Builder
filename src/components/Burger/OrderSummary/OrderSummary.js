import React, { Component } from 'react'

import Aux from '../../../hoc/Auxillary/Auxillary'
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(igKey => {
                return <li key={igKey}>
                    <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {this.props.ingredients[igKey]}
                </li>
            })
        return (
            <Aux>
                <h2 style={{ fontSize: '35px', marginTop: '10px', marginBottom: '20px' }}>Your order</h2>
                <h4 style={{
                    color: this.props.category === 'NON-VEG Burger' ? 'rgb(189, 4, 5)' : 'green'
                }}>
                    <strong>{this.props.category}</strong></h4>
                <p>A Delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: ${this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout!!</p>
                <Button btnType='Danger' clicked={this.props.purchaseCancelled}>CANCEL</Button>
                <Button btnType='Success' clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Aux>
        )
    }
}

export default OrderSummary 