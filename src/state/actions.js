export const GO_TO_NEXT_LEVEL = 'GO_TO_NEXT_LEVEL';
export const GO_TO_PREVIOUS_LEVEL = 'GO_TO_PREVIOUS_LEVEL';
export const SET_TARGET_FOUND = 'SET_TARGET_FOUND';
export const SET_USER = 'SET_USER';

export const setUser = (user) => ({
    type: SET_USER,
    payload: user
});

export const goToNextLevel = () => ({
    type: GO_TO_NEXT_LEVEL,
});

export const goToPreviousLevel = () => ({
    type: GO_TO_PREVIOUS_LEVEL,
});

export const setTargetFound = (target) => ({
    type: SET_TARGET_FOUND,
    payload: target
});