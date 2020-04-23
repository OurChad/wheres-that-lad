import React from 'react';
import styled from 'styled-components';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { StateProvider } from './state'
import AppBar from './components/AppBar';
import ActionButtons from './components/ActionButtons';
import Level from './components/Level';
import TargetsList from './components/TargetsList';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#FB2022',
    }
  },
});

const AppContainer = styled.div`
    width: 90vw;
    margin: 0 auto;
`;

function App() {
  return (
    <StateProvider>
      <ThemeProvider theme={theme}>
        <AppBar siteTitle="Where the Feck is this Lad?"/>
        <AppContainer>
          <Level />
          <TargetsList />
          <ActionButtons />
        </AppContainer>
      </ThemeProvider>
    </StateProvider>
  );
}

export default App;
