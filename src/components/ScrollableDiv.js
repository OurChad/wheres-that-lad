import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'

const StyledDiv = styled.div`
    overflow-x: auto;
    overflow-y: auto;
    cursor: pointer;
    max-height: 80vh;
    margin-bottom: 1.5rem;

    &:active {
        cursor: grabbing;
        transform: scale(1);
    }
`;

function ScrollableDiv({ children }) {

    useEffect(() => {
        const slider = document.getElementById('scrollableDiv');
        let isDown = false;
        let startX;
        let scrollLeft;
        let startY;
        let scrollTop;

        const onMouseDown = (e) => {
            isDown = true;
            slider.classList.add('active');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
            startY = e.pageY - slider.offsetTop;
            scrollTop = slider.scrollTop;
        };

        const onMouseLeave = () => {
            isDown = false;
            slider.classList.remove('active');
        };

        const onMouseUp = () => {
            isDown = false;
            slider.classList.remove('active');
        };

        const onMouseMove = (e) => {
            if(!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2; //scroll-fast
            slider.scrollLeft = scrollLeft - walk;
            const y = e.pageY - slider.offsetTop;
            const walkVertical = (y - startY) * 2; //scroll-fast
            slider.scrollTop = scrollTop - walkVertical;
        };

        slider.addEventListener('mousedown', onMouseDown);
        slider.addEventListener('mouseleave', onMouseLeave);
        slider.addEventListener('mouseup', onMouseUp);
        slider.addEventListener('mousemove', onMouseMove);

        return () => {
            slider.removeEventListener('mousedown', onMouseDown);
            slider.removeEventListener('mouseleave', onMouseLeave);
            slider.removeEventListener('mouseup', onMouseUp);
            slider.removeEventListener('mousemove', onMouseMove);
        }
    });

    return (
        <StyledDiv id="scrollableDiv">
            {children}
        </StyledDiv>
    )

}

ScrollableDiv.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ScrollableDiv;