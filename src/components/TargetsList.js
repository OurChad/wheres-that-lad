import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { constants, useAppState } from '../state';

const IconGrid = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
`;

const StyledIcon = styled.img`
    border: solid 2px black;
    filter: ${props => props.isFound ? "none" : "grayscale(100%)"};
`;

function TargetsList() {
    const [state] = useAppState();
    const level = state.levels[state.currentLevel];
    const [isLoading, setIsLoading] = useState(true);
    const [targetIcons, setTargetIcons] = useState({});
    const { targets } = constants;

    const loadIcons = useCallback(async () => {
        const iconPromises = targets.map((target) => import(`../resources/icons/${target}.png`));

        const iconsResponses = await Promise.all(iconPromises);
        const icons = targets.reduce((acc, target, i) => {
            return {
                ...acc,
                [target]: iconsResponses[i].default
            }
        }, {});
        setTargetIcons(icons);
        setIsLoading(false);
    }, [targets]);

    useEffect(() => {
        loadIcons();
    }, [setTargetIcons, loadIcons]);

    return isLoading ? <h2>Loading...</h2> : (
        <IconGrid>
            {
                targets.map((target) => {
                    return (        
                        <StyledIcon 
                            key={target}
                            id={target}
                            alt={target} 
                            src={targetIcons[target]}
                            isFound={level.targetsFound.includes(target)}
                        />
                    );
                })
            }
        </IconGrid>
    )
}

export default TargetsList;