import React from 'react';
import PropTypes from 'prop-types';
import { constants, useAppState } from '../state';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

function ScoreDialog({ onClose, open }) {
    const [state] = useAppState();

    return (
        <Dialog aria-labelledby="simple-dialog-title" onClose={onClose} open={open}>
            <DialogTitle id="simple-dialog-title">Score</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {
                        Object.entries(state.levels).map(([key, level]) => {
                            return (
                                <div key={key}>
                                    <h2>Level {key}</h2>
                                    <h3>{level.targetsFound.length} / 10</h3>
                                </div>
                            )
                        })
                    }
                    <>
                        <h1>Total Score</h1>
                        <h2>{state.totalScore} / {constants.levels.length * 20}</h2>
                    </>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary" autoFocus>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}

ScoreDialog.propTypes = {
    onClose: PropTypes.func.isRequired, 
    open: PropTypes.bool
};

ScoreDialog.defaultProps = {
    open: false,
};

export default ScoreDialog;