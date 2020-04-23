import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { constants } from '../state';
import ScrollableDiv from './ScrollableDiv';

const StyledArea = styled.area`
    background-color: black;
    fill: black;
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
`;
function LevelImg({ currentLevel, onTargetClick }) {
    const [levelLoaded, setLevelLoaded] = useState(false);
    const [levelImg, setLevelImg] = useState('');
    const [levelData, setLevelData] = useState({});

    const importLevelData = useCallback(async () => {
        const { levelImg, levelData } = await import(`../resources/levels/${currentLevel}`);
        setLevelData(levelData);
        setLevelImg(levelImg)
        setLevelLoaded(true);

    }, [currentLevel])

    useEffect(() => {
        importLevelData();
    });

    const renderImageMap = useCallback(() => {
        const { targets } = constants;
        return (
            <map name="image-map">
                {
                    targets.map((target) => (
                        <StyledArea 
                            key={target}
                            alt={target}
                            title={target}
                            onClick={() => onTargetClick(target)}
                            coords={levelData[target]}
                            shape="rect"
                        />
                    ))
                }
            </map>
        )
    }, [levelData, onTargetClick]);

    return levelLoaded ?
                (
                    <ScrollableDiv>
                        <img src={levelImg} useMap="#image-map" alt="level" />
                        {renderImageMap()}
                    </ScrollableDiv>
                )  : <h2>Loading</h2>
        
    
}

LevelImg.propTypes = {
    currentLevel: PropTypes.string.isRequired,
    onTargetClick: PropTypes.func.isRequired,
};

export default LevelImg;