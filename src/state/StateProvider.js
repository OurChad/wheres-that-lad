import React from 'react';
import { INITIAL_STATE, reducer } from './reducer';

export const StateContext = React.createContext(INITIAL_STATE);
export const DispatchContext = React.createContext(null);

export const StateProvider = ({ children }) => {
    const contextDispatch = (dispatchFn) => (action) => {
        console.log('****** Dispatching Action: ', action.type);
    
        dispatchFn(action);
    }

    const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE);

    return (
        <DispatchContext.Provider value={contextDispatch(dispatch)}>
            <StateContext.Provider value={state}>
                {children}
            </StateContext.Provider>
        </DispatchContext.Provider>
    );
};