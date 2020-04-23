import { useContext } from 'react';
import { StateContext, DispatchContext } from './StateProvider'

export const useAppState = () => {
    const state = useContext(StateContext);
    const dispatch = useContext(DispatchContext);
    
    return [state, dispatch];
};