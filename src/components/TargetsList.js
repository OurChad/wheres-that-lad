import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { constants, useAppState } from '../state';

const IconGrid = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
`;

const IconContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border: solid 2px black;
    width: 224px;
    max-width: 224px;
    height: 216px;
    max-height: 216px;
`;

const StyledIcon = styled.img`
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
                        <IconContainer key={target}>
                            <StyledIcon
                                id={target}
                                alt={target} 
                                src={targetIcons[target]}
                                isFound={level.targetsFound.includes(target)}
                            />
                        </IconContainer>
                    );
                })
            }
        </IconGrid>
    )
}

export default TargetsList;