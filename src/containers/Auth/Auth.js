import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import { updatedObject, checkValidity } from '../../shared/utility';

const auth = props => {
    const [controls, setControls] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Mail Address'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 7
            },
            valid: false,
            touched: false
        }
    })
    const [isSignUp, setIsSignup] = useState(true)

    const { onSetRedirectPAth, buildingBurger, authRedirectPath } = props;
    useEffect(() => {
        if (!buildingBurger && authRedirectPath !== '/') {
            onSetRedirectPAth();
        }
    }, [onSetRedirectPAth, buildingBurger, authRedirectPath])

    const inputChangeHandler = (event, controlName) => {
        const updatedControls = updatedObject(controls, {
            [controlName]: updatedObject(controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, controls[controlName].validation),
                touched: true
            })
        })
        setControls(updatedControls);
    }

    const submithandler = (event) => {
        event.preventDefault();
        props.onAuth(controls.email.value, controls.password.value, isSignUp);
    }

    const switchAuthModeHandler = () => {
        setIsSignup(!isSignUp)
    }


    const formElementsArray = [];
    for (let key in controls) {
        formElementsArray.push({
            id: key,
            config: controls[key]
        })
    }
    let form = formElementsArray.map(formElement => {
        return (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => inputChangeHandler(event, formElement.id)} />
        )
    });

    if (props.loading) {
        form = <Spinner />
    }

    let errorMessage = null;

    if (props.error) {
        errorMessage = (
            <p style={{ color: 'red', fontSize: '25px', fontWeight: 'bolder' }}>{props.error.message}</p>
        )
    }

    let authRedirect = null;
    if (props.isAuthenticated) {
        authRedirect = <Redirect to={props.authRedirectPath} />
    }

    return (
        <div className={classes.Auth}>
            {authRedirect}
            {errorMessage}
            <form onSubmit={submithandler}>
                <h1 style={{ color: '#d2691e' }}>SignIn/SignUp</h1>
                {form}
                <Button btnType="Success">SUBMIT</Button>
            </form>
            <Button clicked={switchAuthModeHandler} btnType="Submit">SWITCH TO {isSignUp ? 'SIGNIN' : 'SIGNUP'}</Button>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onSetRedirectPAth: () => dispatch(actions.setAuthRedirectPath())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(auth);