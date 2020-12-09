import React from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxillary/Auxillary';
import useHttpErrorHandler from '../../hooks/http-error-handler';

const withErrorHandler = (WrrapedComponent, axios) => {
    return props => {
        const [error, clearError] = useHttpErrorHandler(axios)

        return (
            <Aux>
                <Modal show={error} modalClosed={clearError}>
                    {error ? error.message : null}
                </Modal>
                <WrrapedComponent {...props} />
            </Aux>
        )
    }
}

export default withErrorHandler;