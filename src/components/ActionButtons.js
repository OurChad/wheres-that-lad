import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { actions, useAppState } from '../state'
import ScoreDialog from './ScoreDialog';

const ActionButtonContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 2rem;
    margin: 2rem;
`;

function ActionButtons() {
    const [state, dispatch] = useAppState();
    const [open, setOpen] = useState(false);

    const handleClickOpen = useCallback(() => {
        setOpen(true);
    }, [setOpen]);

    const handleClose = useCallback(() => {
        setOpen(false);
    }, [setOpen]);

    const handleOnPrevious = useCallback(() => {
        const { goToPreviousLevel } = actions;

        dispatch(goToPreviousLevel())
        
    }, [dispatch]);

    const handleOnNext = useCallback(() => {
        const { goToNextLevel } = actions;

        dispatch(goToNextLevel())
        
    }, [dispatch]);

    return (
        <>
            <ActionButtonContainer>
                <Button variant="outlined" color="primary" onClick={handleOnPrevious} disabled={!state.isPreviousLevelAvailable}>
                    Previous Level
                </Button>
                <Button variant="outlined" color="primary" onClick={handleOnNext} disabled={!state.isNextLevelAvailable}>
                    Next Level
                </Button>
                <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                    Show Score
                </Button>
            </ActionButtonContainer>
            <ScoreDialog open={open} onClose={handleClose} />
        </>
    )
}

export default ActionButtons;