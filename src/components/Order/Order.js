import React from 'react';

import classes from './Order.css';

const order = (props) => {
    const ingredients = [];
    for (let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        })
    }

    const Data = [];
    for (let orderData in props.orderData) {
        Data.push({
            name: orderData,
            info: props.orderData[orderData]
        })
    }

    const ingredientOutput = ingredients.map(ig => {
        return <span
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #d2691e',
                padding: '7px',
                color: "#d2691e"
            }}
            key={ig.name}> {ig.name} ({ig.amount}) </span>
    })

    const DataOutput = Data.map(data => {
        return <span
            style={{
                textTransform: 'capitalize',
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap',
                padding: '7px',
                color: '#daa520'
            }}
            key={data.name}>{data.name}:- {data.info}.</span>
    })


    return (
        <div>
            <h2 style={{ marginLeft: '200px', marginBottom: '0px', color: '#cd853f', fontStyle: 'italic' }}>Order Details:-</h2>
            <div className={classes.Order}>
                <p style={{ fontWeight: 'bolder' }}>INGREDIENTS:- {ingredientOutput}</p>
                <p style={{ fontWeight: 'bolder' }}>ORDER INFO:- {DataOutput}</p>
                <p style={{ fontWeight: 'bolder' }}>PRICE:-<span style={{ color: '#800000' }}>${(props.price).toFixed(2)}</span></p>
            </div>
        </div>
    )
}


export default order;