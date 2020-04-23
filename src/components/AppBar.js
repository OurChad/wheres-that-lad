import React from "react";
import PropTypes from "prop-types";
import styled from 'styled-components';

const StyledHeader = styled.header`
    background: #FB2022;
    margin-bottom: 1.5rem;
`;

const AppBarContentContainer = styled.div`
    margin: 0 auto;
    /* max-width: 960px; */
    padding: 1.5rem 1rem;
`;

const AppName = styled.h1`
    margin: 0;
`;

const StyledLink = styled.a`
    color: #FFF;
    text-decoration: none;
`;

const AppBar = ({ siteTitle }) => (
    <StyledHeader>
        <AppBarContentContainer>
        <AppName>
            <StyledLink href="/">
            {siteTitle}
            </StyledLink>
        </AppName>
        </AppBarContentContainer>
    </StyledHeader>
);

AppBar.propTypes = {
    siteTitle: PropTypes.string.isRequired,
};

export default AppBar;