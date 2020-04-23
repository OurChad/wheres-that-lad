import { levels, sessionName, targets, targetValues } from './constants'
import { SET_TARGET_FOUND,  SET_USER, GO_TO_NEXT_LEVEL, GO_TO_PREVIOUS_LEVEL } from './actions'

const savedState = sessionStorage.getItem(sessionName);
const initialSavedState = savedState && JSON.parse(savedState);
const initialLevels = levels.reduce((acc, level) => {
    return {
        ...acc,
        [level]: {
            targetsFound: [],
            isCompleted: false,
        }
    }
}, {});

export const INITIAL_STATE = initialSavedState ?? {
    user: '',
    levels: initialLevels,
    currentLevel: '01',
    isNextLevelAvailable: true,
    isPreviousLevelAvailable: false,
    totalScore: 0,
}

export const reducer = (state = INITIAL_STATE, { type, payload }) => {
    let newState = { ...state };
    const currentLevelAsInt = parseInt(state.currentLevel);

    switch (type) {
        case GO_TO_NEXT_LEVEL:
            const nextLevel = (currentLevelAsInt + 1);
            let nextLevelAsString = `${nextLevel}`;

            if (nextLevel < 10) {
                nextLevelAsString = `0${nextLevel}`;
            }
            const isNextLevelAvailable = nextLevel < levels.length;

            newState = {
                ...state,
                currentLevel: nextLevelAsString,
                isNextLevelAvailable,
                isPreviousLevelAvailable: true,
            };

            break;
        case GO_TO_PREVIOUS_LEVEL:
            const previousLevel = (currentLevelAsInt - 1);
            let previousLevelAsString = `${previousLevel}`;

            if (previousLevel < 10) {
                previousLevelAsString = `0${previousLevel}`;
            }
            const isPreviousLevelAvailable = previousLevel > 1;

            newState = {
                ...state,
                currentLevel: previousLevelAsString,
                isNextLevelAvailable: true,
                isPreviousLevelAvailable,
            };

            break;
        case SET_TARGET_FOUND:
            const level = state.levels[state.currentLevel];

            if (level.targetsFound.includes(payload)) {
                break;
            }

            const targetsFound = [...level.targetsFound, payload];
            const isCompleted = targets.every((target) => targetsFound.includes(target));
            const totalScore = state.totalScore + targetValues[payload];

            newState = {
                ...state,
                levels: {
                    ...state.levels,
                    [state.currentLevel]: {
                        ...level,
                        targetsFound,
                        isCompleted,
                    }
                },
                totalScore
            };

            break;
        case SET_USER:
            newState = {
                ...state,
                user: payload,
            };

            break;
        default:
            break;
        }

        sessionStorage.setItem(sessionName, JSON.stringify(newState));

        return newState;
};