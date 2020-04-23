import React, { useCallback } from 'react';
import { useAppState, actions } from '../state';
import LevelImg from './LevelImg';

function Level() {
    const [state, dispatch] = useAppState();
    const handleOnTargetClick = useCallback((target) => {
        const { setTargetFound } = actions;
        dispatch(
            setTargetFound(target)
        );
    }, [dispatch]);

    return (
        <LevelImg currentLevel={state.currentLevel} onTargetClick={handleOnTargetClick} />
    )
}

export default Level;