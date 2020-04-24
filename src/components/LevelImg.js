import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import { constants } from '../state';
import ScrollableDiv from './ScrollableDiv';

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
    }, [currentLevel, importLevelData]);

    useEffect(() => {
        setLevelLoaded(false);
    }, [currentLevel]);

    const renderImageMap = useCallback(() => {
        const { targets } = constants;
        return (
            <map name="image-map">
                {
                    targets.map((target) => (
                        <area 
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
                )  : <ScrollableDiv>
                    <LinearProgress />
                </ScrollableDiv>
        
    
}

LevelImg.propTypes = {
    currentLevel: PropTypes.string.isRequired,
    onTargetClick: PropTypes.func.isRequired,
};

export default LevelImg;